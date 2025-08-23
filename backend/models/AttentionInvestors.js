const mongoose = require('mongoose');

const attentionInvestorsSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  title: { type: String, default: '' },
  bulletPoints: [{ type: String, default: '' }],
  disclaimer: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('AttentionInvestors', attentionInvestorsSchema);