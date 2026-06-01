const Employee = require('../models/Employee');
const User = require('../models/User');
const Activity = require('../models/Activity');
const bcrypt = require('bcryptjs');

// GET /api/employees
const getAllEmployees = async (req, res, next) => {
  try {
    const { search, department, status, page = 1, limit = 100 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { employeeCode: { $regex: search, $options: 'i' } },
      ];
    }
    if (department && department !== 'All') query.department = department;
    if (status && status !== 'All') query.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [employees, total] = await Promise.all([
      Employee.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Employee.countDocuments(query),
    ]);

    res.json({ success: true, data: employees, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

// GET /api/employees/:id
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).lean();
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found.' });
    res.json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

// POST /api/employees
const createEmployee = async (req, res, next) => {
  try {
    const { name, email, password, phone, department, role, salary, status, joiningDate, avatarColor } = req.body;

    // Create employee record
    const employee = await Employee.create({ name, email, phone, department, role, salary, status, joiningDate, avatarColor });

    // Create linked user account
    const user = await User.create({
      name,
      email,
      password: password || '123',
      role: 'employee',
      employeeId: employee._id,
    });

    // Link back
    employee.userId = user._id;
    await employee.save();

    await Activity.create({
      action: `Employee ${name} was added`,
      type: 'Create',
      performedBy: req.user._id,
      relatedEmployee: employee._id,
    });

    res.status(201).json({ success: true, message: 'Employee created successfully', data: employee });
  } catch (error) {
    next(error);
  }
};

// PUT /api/employees/:id
const updateEmployee = async (req, res, next) => {
  try {
    const { password, ...updateData } = req.body;

    const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found.' });

    // Update linked user email/name if changed
    if (updateData.name || updateData.email) {
      const userUpdate = {};
      if (updateData.name) userUpdate.name = updateData.name;
      if (updateData.email) userUpdate.email = updateData.email;
      await User.findOneAndUpdate({ employeeId: employee._id }, userUpdate);
    }

    // Update password if provided
    if (password && employee.userId) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(employee.userId, { password: hashedPassword });
    }

    await Activity.create({
      action: `Employee ${employee.name} updated`,
      type: 'Update',
      performedBy: req.user._id,
      relatedEmployee: employee._id,
    });

    res.json({ success: true, message: 'Employee updated successfully', data: employee });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/employees/:id
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found.' });

    const name = employee.name;

    // Deactivate linked user instead of hard delete
    if (employee.userId) {
      await User.findByIdAndUpdate(employee.userId, { isActive: false });
    }

    await employee.deleteOne();

    await Activity.create({
      action: `Employee ${name} removed`,
      type: 'Delete',
      performedBy: req.user._id,
    });

    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// PUT /api/employees/:id/rate
const rateEmployee = async (req, res, next) => {
  try {
    const { rating, note } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { rating: { rating, note, ratedBy: req.user._id } },
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found.' });

    await Activity.create({
      action: `Performance rating updated for ${employee.name}`,
      type: 'Update',
      performedBy: req.user._id,
      relatedEmployee: employee._id,
    });

    res.json({ success: true, message: 'Rating saved', data: employee });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, rateEmployee };
