const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  company: {
    name: { type: String, default: 'Focus Stock Broker Ltd' },
    description: { type: String, default: 'Focus Stock Broker Ltd is a SEBI registered stock broker providing innovative trading solutions with a commitment to transparency and customer satisfaction.' }
  },
  
  quickLinks: {
    heading: { type: String, default: 'Quick Links' },
    links: [{
      text: { type: String, required: true },
      href: { type: String, required: true },
      type: { type: String, enum: ['link', 'pdf'], default: 'link' },
      pdfFile: { type: String, default: '' }, // For PDF downloads
      isActive: { type: Boolean, default: true }
    }]
  },
  
  services: {
    heading: { type: String, default: 'Services' },
    links: [{
      text: { type: String, required: true },
      href: { type: String, required: true },
      type: { type: String, enum: ['link', 'pdf'], default: 'link' },
      pdfFile: { type: String, default: '' },
      isActive: { type: Boolean, default: true }
    }]
  },
  
  regulatoryInfo: {
    heading: { type: String, default: 'Regulatory Information' },
    items: [{
      text: { type: String, required: true },
      href: { type: String, default: '' },
      type: { type: String, enum: ['text', 'link', 'pdf'], default: 'text' },
      pdfFile: { type: String, default: '' },
      isActive: { type: Boolean, default: true }
    }]
  },
  
  moreLinks: {
    heading: { type: String, default: 'More Links' },
    investorCharter: {
      heading: { type: String, default: 'Investor Charter' },
      links: [{
        text: { type: String, required: true },
        href: { type: String, required: true },
        type: { type: String, enum: ['link', 'pdf'], default: 'link' },
        pdfFile: { type: String, default: '' },
        isActive: { type: Boolean, default: true }
      }]
    },
    otherLinks: [{
      text: { type: String, required: true },
      href: { type: String, required: true },
      type: { type: String, enum: ['link', 'pdf'], default: 'link' },
      pdfFile: { type: String, default: '' },
      isActive: { type: Boolean, default: true }
    }]
  },
  
  socialLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  }],
  
  contactInfo: {
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' }
  },
  
  legalLinks: [{
    text: { type: String, required: true },
    href: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  }],
  
  copyright: {
    text: { type: String, default: 'Focus Stock Broker Ltd. All rights reserved.' },
    year: { type: Number, default: new Date().getFullYear() }
  },
  
  isActive: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  modifiedBy: { type: String, default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('Footer', footerSchema);