const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    trim: true
  },
  visitDate: {
    type: Date,
    required: [true, 'Visit date is required']
  },
  visitTime: {
    type: String,
    required: [true, 'Visit time is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
  confirmedAt: {
    type: Date
  },
  confirmedBy: {
    type: String
  }
}, {
  timestamps: true
});

visitorSchema.index({ status: 1, visitDate: 1 });
visitorSchema.index({ phone: 1 });
visitorSchema.index({ visitDate: 1 });

module.exports = mongoose.model('Visitor', visitorSchema);
