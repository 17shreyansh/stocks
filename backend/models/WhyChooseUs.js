const mongoose = require('mongoose');

const whyChooseUsSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  title: { type: String, default: 'Why Choose Focus Stock Broker Ltd' },
  subtitle: { type: String, default: 'Our competitive advantages that set us apart in the industry' },
  advantages: [{
    id: { type: Number, default: 1 },
    title: { type: String, default: '' },
    value: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: 'FaRocket' }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Add index for better performance
whyChooseUsSchema.index({ pageName: 1, isActive: 1 });

module.exports = mongoose.model('WhyChooseUs', whyChooseUsSchema);