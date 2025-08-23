const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  title: { 
    main: { type: String, default: '' }, 
    highlight: { type: String, default: '' } 
  },
  description: { type: String, default: '' },
  scrollText: { type: String, default: '' },
  buttons: [{
    text: { type: String, default: '' },
    type: { type: String, default: 'primary' },
    link: { type: String, default: '' }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);