const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true
  },
  answer: {
    type: String,
    required: [true, 'Answer is required']
  },
  category: {
    type: String,
    enum: ['general', 'pricing', 'medical', 'admission', 'services', 'other'],
    default: 'general'
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
faqSchema.index({ category: 1, order: 1, isActive: 1 });

module.exports = mongoose.model('FAQ', faqSchema);


















