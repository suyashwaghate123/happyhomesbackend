const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Slider title is required'],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Slider image is required']
  },
  buttonText: {
    type: String,
    default: 'Discover More'
  },
  buttonLink: {
    type: String,
    default: '/about'
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
sliderSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('Slider', sliderSchema);












