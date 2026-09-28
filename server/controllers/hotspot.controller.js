const Hotspot = require('../models/Hotspot');
const Activity = require('../models/Activity');

const logActivity = async ({ req, action, hotspot, detail }) => {
  try {
    await Activity.create({
      user: req.user?._id,
      userName: req.user?.name || 'System',
      action,
      hotspotTitle: hotspot?.title,
      hotspotId: hotspot?._id,
      detail,
      city: hotspot?.city || 'karachi',
    });
  } catch (e) {
    console.error('Activity log failed', e.message);
  }
};

const emitChange = (req) => {
  const io = req.app.get('io');
  if (io) io.emit('hotspot:changed');
};

// Get all active hotspots
const getHotspots = async (req, res) => {
  try {
    const hotspots = await Hotspot.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(hotspots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new hotspot
const createHotspot = async (req, res) => {
  try {
    const hotspot = await Hotspot.create(req.body);

    await logActivity({
      req,
      action: 'created',
      hotspot,
      detail: `Created hotspot (${hotspot.severity})`,
    });

    emitChange(req);
    res.status(201).json(hotspot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update hotspot (status, fields, etc.)
const updateHotspot = async (req, res) => {
  try {
    const hotspot = await Hotspot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!hotspot) {
      return res.status(404).json({ message: 'Hotspot not found' });
    }

    const action = req.body.status ? 'status_changed' : 'updated';
    const detail = req.body.status
      ? `Status → ${hotspot.status}`
      : 'Hotspot updated';

    await logActivity({
      req,
      action,
      hotspot,
      detail,
    });

    emitChange(req);
    res.json(hotspot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Soft delete / deactivate
const deleteHotspot = async (req, res) => {
  try {
    const hotspot = await Hotspot.findByIdAndUpdate(
      req.params.id,
      { isActive: false, status: 'resolved' },
      { new: true }
    );

    if (!hotspot) {
      return res.status(404).json({ message: 'Hotspot not found' });
    }

    await logActivity({
      req,
      action: 'deactivated',
      hotspot,
      detail: 'Hotspot deactivated',
    });

    emitChange(req);
    res.json({ message: 'Hotspot deactivated', hotspot });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getHotspots,
  createHotspot,
  updateHotspot,
  deleteHotspot,
};