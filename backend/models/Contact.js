const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  form: {
    submitText: { type: String, default: '' },
    successMessage: { type: String, default: '' },
    socialProof: { type: String, default: '' }
  },
  contactInfo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    details: [{
      icon: { type: String, default: '' },
      text: { type: String, default: '' }
    }]
  },
  team: {
    title: { type: String, default: '' },
    members: [{
      name: { type: String, default: '' },
      role: { type: String, default: '' }
    }]
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);