const mongoose = require('mongoose');

const advancedSliderSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  header: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  },
  slides: [{
    background: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    cta: { type: String, default: '' },
    ctaLink: { type: String, default: '' }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('AdvancedSlider', advancedSliderSchema);