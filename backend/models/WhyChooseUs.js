const mongoose = require('mongoose');

const whyChooseUsSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  advantages: [{
    id: { type: Number, default: 1 },
    title: { type: String, default: '' },
    value: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: 'FaRocket' }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('WhyChooseUs', whyChooseUsSchema);