const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
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
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  tags: [{
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
  views: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate slug from title before saving
blogPostSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index for filtering and ordering
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ category: 1, isActive: 1 });
blogPostSchema.index({ createdAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
















