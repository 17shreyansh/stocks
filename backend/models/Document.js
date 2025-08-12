const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number, required: true },
  mimeType: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  downloadCount: { type: Number, default: 0 },
  uploadedBy: { type: String, default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);