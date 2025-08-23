const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  story: {
    title: { type: String, default: '' },
    paragraphs: [{ type: String, default: '' }]
  },
  milestones: [{
    date: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    year: { type: Number, default: 2024 },
    value: { type: Number, default: 0 },
    growth: { type: Number, default: 0 }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);