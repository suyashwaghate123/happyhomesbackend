const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    default: 'About Happy Homes'
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  longDescription: {
    type: String
  },
  image: {
    type: String,
    default: '/images/resource/about-1.jpg'
  },
  videoUrl: {
    type: String
  },
  features: [{
    type: String
  }],
  mission: {
    type: String
  },
  vision: {
    type: String
  }
}, {
  timestamps: true
});

// Ensure only one about document exists
aboutSchema.statics.getAbout = async function() {
  let about = await this.findOne();
  if (!about) {
    about = await this.create({
      title: 'About Happy Homes',
      description: 'Welcome to Happy Homes'
    });
  }
  return about;
};

module.exports = mongoose.model('About', aboutSchema);

















