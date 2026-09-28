const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['motorcycle_conflict', 'encroachment', 'delivery_impact', 'general'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'high', 'critical'],
      default: 'info',
    },
    location: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);
