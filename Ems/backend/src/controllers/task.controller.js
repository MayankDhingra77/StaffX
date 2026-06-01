const Task = require('../models/Task');
const Activity = require('../models/Activity');
const Employee = require('../models/Employee');

// GET /api/tasks
const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, assignedTo } = req.query;
    const query = {};
    if (status && status !== 'All') query.status = status;
    if (priority && priority !== 'All') query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email avatarColor employeeCode department')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/my  — employee's tasks
const getMyTasks = async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.user.employeeId);
    if (!emp) return res.status(404).json({ success: false, message: 'Employee profile not found.' });

    const tasks = await Task.find({ assignedTo: emp._id }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email avatarColor').lean();
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, assignedTo, priority, status, dueDate } = req.body;
    const task = await Task.create({ title, description, assignedTo, priority, status, dueDate, assignedBy: req.user._id });

    const emp = await Employee.findById(assignedTo);
    await Activity.create({
      action: `Task "${title}" assigned to ${emp?.name || 'employee'}`,
      type: 'Create',
      performedBy: req.user._id,
      relatedEmployee: assignedTo,
    });

    const populated = await task.populate('assignedTo', 'name email avatarColor employeeCode department');
    res.status(201).json({ success: true, message: 'Task created', data: populated });
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('assignedTo', 'name email avatarColor employeeCode department');
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });

    await Activity.create({
      action: `Task "${task.title}" updated`,
      type: 'Update',
      performedBy: req.user._id,
    });

    res.json({ success: true, message: 'Task updated', data: task });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/tasks/:id/status
const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true })
      .populate('assignedTo', 'name email avatarColor employeeCode department');
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });

    await Activity.create({
      action: `Task status updated to ${status}`,
      type: 'Update',
      performedBy: req.user._id,
    });

    res.json({ success: true, message: 'Task status updated', data: task });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });

    await Activity.create({
      action: `Task "${task.title}" deleted`,
      type: 'Delete',
      performedBy: req.user._id,
    });

    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks, getMyTasks, getTaskById, createTask, updateTask, updateTaskStatus, deleteTask };
