const router = require('express').Router();
const Employee = require('../models/Employee');
const Leave = require('../models/Leave');
const Task = require('../models/Task');
const Attendance = require('../models/Attendance');
const Activity = require('../models/Activity');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.get('/', protect, authorize('admin', 'hr'), async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [
      totalEmployees,
      activeEmployees,
      onLeaveCount,
      departmentsAgg,
      pendingTasks,
      recentActivities,
      taskStats,
      todayAttendance,
      employeesWithRatings,
    ] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ status: 'Active' }),
      Leave.countDocuments({ status: 'Approved' }),
      Employee.aggregate([{ $group: { _id: '$department' } }, { $count: 'total' }]),
      Task.countDocuments({ status: 'Pending' }),
      Activity.find().sort({ createdAt: -1 }).limit(10).lean(),
      Task.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Attendance.find({ date: today }).lean(),
      Employee.find({ 'rating.rating': { $exists: true } })
        .select('name employeeCode department role avatarColor rating')
        .sort({ 'rating.rating': -1 })
        .limit(5)
        .lean(),
    ]);

    const presentToday = todayAttendance.filter((a) => a.status === 'Present').length;
    const totalDepts = departmentsAgg[0]?.total || 0;

    const taskStatusMap = {};
    taskStats.forEach((s) => { taskStatusMap[s._id] = s.count; });

    res.json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        onLeaveCount,
        totalDepartments: totalDepts,
        pendingTasks,
        presentToday,
        taskOverview: {
          Pending: taskStatusMap['Pending'] || 0,
          'In Progress': taskStatusMap['In Progress'] || 0,
          Completed: taskStatusMap['Completed'] || 0,
          Cancelled: taskStatusMap['Cancelled'] || 0,
        },
        recentActivities: recentActivities.map((a) => ({
          id: a._id.toString(),
          action: a.action,
          type: a.type,
          timestamp: a.createdAt.toISOString(),
        })),
        topRatedEmployees: employeesWithRatings,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
