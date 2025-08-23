const mongoose = require('mongoose');

const contactLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  investment: { type: String, default: '' },
  message: { type: String, default: '' },
  source: { type: String, default: 'homepage' },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  notes: { type: String, default: '' },
  cvUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('ContactLead', contactLeadSchema);