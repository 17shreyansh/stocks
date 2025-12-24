const mongoose = require('mongoose');

const contactLeadSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  investment: { type: String, default: '' },
  message: { type: String, default: '' },
  source: { type: String, default: 'homepage' },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  notes: { type: String, default: '' },
  cvUrl: { type: String, default: '' },
  formType: { type: String, enum: ['homepage', 'callback', 'associate', 'partner'], default: 'homepage' },
  preferredTime: { type: String, default: '' },
  position: { type: String, default: '' },
  experience: { type: String, default: '' },
  companyName: { type: String, default: '' },
  businessType: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('ContactLead', contactLeadSchema);