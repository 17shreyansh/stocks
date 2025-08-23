const mongoose = require('mongoose');

const productGridSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  header: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  },
  products: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    link: { type: String, default: '' }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('ProductGrid', productGridSchema);