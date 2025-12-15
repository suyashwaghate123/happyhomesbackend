const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  // Contact Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  
  // Lead Details
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  
  // Source Information
  source: {
    type: String,
    enum: ['contact_form', 'appointment', 'callback', 'newsletter', 'other'],
    default: 'contact_form'
  },
  
  // For Appointment Leads
  appointmentDate: {
    type: Date
  },
  appointmentTime: {
    type: String
  },
  serviceInterested: {
    type: String
  },
  
  // Lead Status
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'closed', 'spam'],
    default: 'new'
  },
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Follow-up
  notes: [{
    text: String,
    addedBy: String,
    addedAt: { type: Date, default: Date.now }
  }],
  
  // Tracking
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  
  // Response
  isResponded: {
    type: Boolean,
    default: false
  },
  respondedAt: {
    type: Date
  },
  respondedBy: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ source: 1 });
leadSchema.index({ email: 1 });
leadSchema.index({ phone: 1 });

module.exports = mongoose.model('Lead', leadSchema);

















