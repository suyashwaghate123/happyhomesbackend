const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: '/images/resource/testimonial-1.jpg'
  },
  review: {
    type: String,
    required: [true, 'Review text is required']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
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
testimonialSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);


















