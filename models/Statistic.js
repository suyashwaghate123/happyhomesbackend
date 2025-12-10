const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, 'Number is required']
  },
  suffix: {
    type: String,
    default: '+'
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  icon: {
    type: String
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
statisticSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('Statistic', statisticSchema);












