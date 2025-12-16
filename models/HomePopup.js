const mongoose = require('mongoose');

const homePopupSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String
  },
  buttonText: {
    type: String,
    default: 'Learn More'
  },
  buttonLink: {
    type: String,
    default: '/contact'
  },
  showOnce: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure only one popup document exists
homePopupSchema.statics.getPopup = async function() {
  let popup = await this.findOne();
  if (!popup) {
    popup = await this.create({
      title: 'Welcome to Happy Homes',
      content: 'Schedule a free visit today!',
      isActive: false
    });
  }
  return popup;
};

module.exports = mongoose.model('HomePopup', homePopupSchema);


















