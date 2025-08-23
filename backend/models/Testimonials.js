const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  testimonials: [{
    id: { type: Number, default: 1 },
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    quote: { type: String, default: '' },
    result: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Testimonials', testimonialsSchema);