const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    action: {
      type: String,
      enum: ['created', 'updated', 'status_changed', 'deactivated'],
      required: true,
    },
    hotspotTitle: String,
    hotspotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotspot' },
    detail: String,
    city: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);