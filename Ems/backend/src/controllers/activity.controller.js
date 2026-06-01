const Activity = require('../models/Activity');
const getAllActivities = async (req, res, next) => {
  try {
    const { limit = 50, type } = req.query;
    const query = {};
    if (type && type !== 'All') query.type = type;

    const activities = await Activity.find(query)
      .populate('performedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .lean();
    const mapped = activities.map((a) => ({
      id: a._id.toString(),
      action: a.action,
      type: a.type,
      timestamp: a.createdAt.toISOString(),
      performedBy: a.performedBy,
    }));

    res.json({ success: true, data: mapped, total: mapped.length });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllActivities };
