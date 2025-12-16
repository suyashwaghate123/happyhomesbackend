const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['facility', 'rooms', 'activities', 'medical', 'events', 'other'],
    default: 'facility'
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  description: {
    type: String,
    trim: true
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

// Index for filtering and ordering
gallerySchema.index({ category: 1, order: 1, isActive: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);


















