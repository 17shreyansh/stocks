const mongoose = require('mongoose');

const mobileAppSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  trading: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    features: [{
      title: { type: String, default: '' },
      description: { type: String, default: '' }
    }],
    rating: { type: String, default: '' },
    downloadTitle: { type: String, default: '' },
    appleLink: { type: String, default: '' },
    googleLink: { type: String, default: '' }
  },
  mutualFunds: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    features: [{
      title: { type: String, default: '' },
      description: { type: String, default: '' }
    }],
    rating: { type: String, default: '' },
    downloadTitle: { type: String, default: '' },
    appleLink: { type: String, default: '' },
    googleLink: { type: String, default: '' }
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MobileApp', mobileAppSchema);