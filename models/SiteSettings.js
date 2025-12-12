const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: [true, 'Site name is required'],
    trim: true,
    default: 'Happy Homes'
  },
  tagline: {
    type: String,
    trim: true,
    default: 'Love & Care For Senior Citizens'
  },
  logo: {
    type: String,
    default: '/images/logo.png'
  },
  logoLight: {
    type: String,
    default: '/images/logo-light.png'
  },
  favicon: {
    type: String,
    default: '/images/favicon.png'
  },
  openHours: {
    type: String,
    default: 'Mon-Sat 8:00 am - 8:00 pm'
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  alternatePhone: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  whatsapp: {
    type: String
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  mapEmbedUrl: {
    type: String
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  copyright: {
    type: String
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists
siteSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      siteName: 'Happy Homes',
      phone: '+91-9876543210',
      email: 'info@happyhomes.com',
      address: '123, Green Valley Road, Pune, Maharashtra, India'
    });
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
















