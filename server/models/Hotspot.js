const mongoose = require('mongoose');

const hotspotSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    type: {
      type: String,
      enum: ['motorcycle_conflict', 'encroachment', 'delivery_impact'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },

    status: {
  type: String,
  enum: ['open', 'investigating', 'resolved'],
  default: 'open',
},
    city: {
  type: String,
  default: 'karachi',
  index: true,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotspot', hotspotSchema);
