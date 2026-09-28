const Activity = require('../models/Activity');

const getActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 30;
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getActivities };