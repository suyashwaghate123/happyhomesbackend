const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  description: {
    type: String,
    trim: true
  },
  social: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for ordering
teamMemberSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
















