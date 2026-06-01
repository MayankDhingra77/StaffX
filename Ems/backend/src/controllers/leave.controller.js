const Leave = require('../models/Leave');
const Activity = require('../models/Activity');
const Employee = require('../models/Employee');

// GET /api/leaves
const getAllLeaves = async (req, res, next) => {
  try {
    const { status, employeeId } = req.query;
    const query = {};
    if (status && status !== 'All') query.status = status;
    if (employeeId) query.employeeId = employeeId;

    const leaves = await Leave.find(query)
      .populate('employeeId', 'name email department avatarColor employeeCode')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

// GET /api/leaves/my  — employee's own leaves
const getMyLeaves = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.user.employeeId);
    if (!employee) return res.status(404).json({ success: false, message: 'Employee profile not found.' });

    const leaves = await Leave.find({ employeeId: employee._id }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

// POST /api/leaves
const applyLeave = async (req, res, next) => {
  try {
    const { type, startDate, endDate, reason, employeeId } = req.body;

    // Admin can apply on behalf; employee applies for themselves
    let targetEmployeeId = employeeId;
    if (req.user.role === 'employee') {
      const emp = await Employee.findById(req.user.employeeId);
      if (!emp) return res.status(404).json({ success: false, message: 'Employee profile not found.' });
      targetEmployeeId = emp._id;
    }

    const leave = await Leave.create({ employeeId: targetEmployeeId, type, startDate, endDate, reason });

    const emp = await Employee.findById(targetEmployeeId);
    await Activity.create({
      action: `Leave request submitted by ${emp?.name || 'employee'}`,
      type: 'Create',
      performedBy: req.user._id,
      relatedEmployee: targetEmployeeId,
    });

    res.status(201).json({ success: true, message: 'Leave request submitted', data: leave });
  } catch (error) {
    next(error);
  }
};

// PUT /api/leaves/:id/status
const updateLeaveStatus = async (req, res, next) => {
  try {
    const { status, reviewNote } = req.body;
    const validStatuses = ['Approved', 'Rejected', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status, reviewedBy: req.user._id, reviewedAt: new Date(), reviewNote: reviewNote || '' },
      { new: true }
    ).populate('employeeId', 'name');

    if (!leave) return res.status(404).json({ success: false, message: 'Leave request not found.' });

    await Activity.create({
      action: `Leave ${status.toLowerCase()} for ${leave.employeeId?.name || 'employee'}`,
      type: 'Update',
      performedBy: req.user._id,
      relatedEmployee: leave.employeeId?._id,
    });

    res.json({ success: true, message: `Leave ${status.toLowerCase()}`, data: leave });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/leaves/:id  (cancel)
const cancelLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found.' });
    if (leave.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Only pending leaves can be cancelled.' });
    }

    leave.status = 'Cancelled';
    await leave.save();

    res.json({ success: true, message: 'Leave cancelled', data: leave });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllLeaves, getMyLeaves, applyLeave, updateLeaveStatus, cancelLeave };
