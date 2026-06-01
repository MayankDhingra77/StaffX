const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const Activity = require('../models/Activity');

const bulkMarkAttendance = async (req, res, next) => {
  try {
    const { date, records } = req.body;

    const ops = records.map((r) => ({
      updateOne: {
        filter: { employeeId: r.employeeId, date },
        update: { $set: { employeeId: r.employeeId, date, status: r.status, markedBy: req.user._id } },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(ops);

    await Activity.create({
      action: `Attendance marked for ${date}`,
      type: 'Attendance',
      performedBy: req.user._id,
    });

    res.json({ success: true, message: `Attendance saved for ${date}` });
  } catch (error) {
    next(error);
  }
};

const getDailyAttendance = async (req, res, next) => {
  try {
    const date = req.query.date || new Date().toISOString().split('T')[0];
    const records = await Attendance.find({ date }).populate('employeeId', 'name email department avatarColor employeeCode').lean();
    res.json({ success: true, data: records, date });
  } catch (error) {
    next(error);
  }
};

const getMonthlyAttendance = async (req, res, next) => {
  try {
    const month = req.query.month || new Date().toISOString().slice(0, 7);
    const records = await Attendance.find({ date: { $regex: `^${month}` } })
      .populate('employeeId', 'name email department avatarColor employeeCode')
      .lean();
    res.json({ success: true, data: records, month });
  } catch (error) {
    next(error);
  }
};

const getEmployeeAttendance = async (req, res, next) => {
  try {
    const { month } = req.query;
    const query = { employeeId: req.params.id };
    if (month) query.date = { $regex: `^${month}` };

    const records = await Attendance.find(query).sort({ date: -1 }).lean();
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

const getAllAttendance = async (req, res, next) => {
  try {
    const records = await Attendance.find({}).lean();
    const mapped = records.map((r) => ({
      _id: r._id,
      employeeId: r.employeeId.toString(),
      date: r.date,
      status: r.status,
    }));
    res.json({ success: true, data: mapped });
  } catch (error) {
    next(error);
  }
};

module.exports = { bulkMarkAttendance, getDailyAttendance, getMonthlyAttendance, getEmployeeAttendance, getAllAttendance };
