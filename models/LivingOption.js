const mongoose = require('mongoose');

const livingOptionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: String,
    required: [true, 'Price is required']
  },
  priceValue: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  amenities: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate slug from title before saving
livingOptionSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index for ordering
livingOptionSchema.index({ order: 1, isActive: 1 });
livingOptionSchema.index({ slug: 1 });

module.exports = mongoose.model('LivingOption', livingOptionSchema);












