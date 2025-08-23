const mongoose = require('mongoose');

const trustManifestoSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  manifestoStatements: [{
    text: { type: String, default: '' }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('TrustManifesto', trustManifestoSchema);