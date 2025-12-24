const mongoose = require('mongoose');

// Hero Section Schema
const heroSchema = new mongoose.Schema({
  title: { 
    main: { type: String, default: '' }, 
    highlight: { type: String, default: '' } 
  },
  description: [{ type: String, default: '' }],
  scrollText: { type: String, default: '' },
  primaryButtonText: { type: String, default: '' },
  secondaryButtonText: { type: String, default: '' },
  primaryButtonLink: { type: String, default: '' },
  secondaryButtonLink: { type: String, default: '' }
});

// About Section Schema
const aboutSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  subtitle: [{ type: String, default: '' }],
  story: {
    title: { type: String, default: '' },
    paragraphs: [{ type: String, default: '' }]
  },
  image: { type: String, default: '' },
  milestones: [{
    date: { type: String, default: '' },
    title: { type: String, default: '' },
    description: [{ type: String, default: '' }],
    value: { type: String, default: '' },
    image: { type: String, default: '' }
  }]
});

// Testimonials Schema
const testimonialsSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  testimonials: [{
    id: { type: Number, default: 1 },
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    quote: { type: String, default: '' },
    result: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 }
  }]
});

// Contact Schema - Updated to match frontend structure
const contactSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: 'Contact Us' },
    subtitle: { type: String, default: 'We bring you comprehensive, insightful & up-to-date reports to let you take the right steps towards your financial goals.' }
  },
  contactCards: [{
    id: { type: String, required: true },
    icon: { type: String, default: 'phone' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    contact: { type: String, default: '' },
    type: { type: String, enum: ['email', 'phone'], default: 'email' }
  }],
  tabs: [{
    id: { type: String, required: true },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    content: { type: mongoose.Schema.Types.Mixed, default: {} }
  }],
  // Legacy fields for backward compatibility
  title: { type: String, default: '' },
  subtitle: [{ type: String, default: '' }],
  form: {
    submitText: { type: String, default: '' },
    successMessage: { type: String, default: '' },
    socialProof: { type: String, default: '' }
  },
  contactInfo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    details: [{
      icon: { type: String, default: '' },
      text: { type: String, default: '' }
    }]
  },
  team: {
    title: { type: String, default: '' },
    members: [{
      name: { type: String, default: '' },
      role: { type: String, default: '' },
      initials: { type: String, default: '' },
      photo: { type: String, default: '' }
    }]
  }
});

// Trust Manifesto Schema
const trustManifestoSchema = new mongoose.Schema({
  manifestoStatements: [{ text: { type: String, default: '' } }]
});

// Advanced Slider Schema
const advancedSliderSchema = new mongoose.Schema({
  header: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  },
  slides: [{
    id: { type: Number, default: 1 },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    background: { type: String, default: '' },
    cta: { type: String, default: '' },
    ctaLink: { type: String, default: '' }
  }]
});

// Attention Investors Schema
const attentionInvestorsSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  bulletPoints: [{ type: String, default: '' }],
  disclaimer: { type: String, default: '' }
});

// Why Choose Us Schema
const whyChooseUsSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  advantages: [{
    title: { type: String, default: '' },
    value: { type: String, default: '' },
    description: [{ type: String, default: '' }],
    icon: { type: String, default: '' },
    link: { type: String, default: '' }
  }]
});

// Mobile App Schema
const mobileAppSchema = new mongoose.Schema({
  trading: {
    title: { type: String, default: '' },
    description: [{ type: String, default: '' }],
    features: [{
      title: { type: String, default: '' },
      description: { type: String, default: '' }
    }],
    rating: { type: String, default: '' },
    downloadTitle: { type: String, default: '' }
  },
  mutualFunds: {
    title: { type: String, default: '' },
    description: [{ type: String, default: '' }],
    features: [{
      title: { type: String, default: '' },
      description: { type: String, default: '' }
    }],
    rating: { type: String, default: '' },
    downloadTitle: { type: String, default: '' }
  },
  storeButtons: [{
    type: { type: String, default: '' },
    text: { type: String, default: '' },
    name: { type: String, default: '' },
    link: { type: String, default: '' }
  }]
});

// Product Grid Schema
const productGridSchema = new mongoose.Schema({
  header: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  },
  products: [{
    id: { type: Number, default: 1 },
    title: { type: String, default: '' },
    description: [{ type: String, default: '' }],
    type: { type: String, default: '' },
    link: { type: String, default: '' }
  }]
});

// Downloads Schema
const downloadsSchema = new mongoose.Schema({
  header: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  },
  categories: [{ type: String, default: '' }],
  documents: [{
    id: { type: Number, default: 1 },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: String, default: '' },
    downloadUrl: { type: String, default: '' },
    fileSize: { type: String, default: '' },
    lastUpdated: { type: String, default: '' }
  }],
  emptyState: {
    title: { type: String, default: '' },
    message: { type: String, default: '' }
  }
});

// Policies Schema
const policiesSchema = new mongoose.Schema({
  header: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  },
  departments: [{ type: String, default: '' }],
  policies: [{
    id: { type: Number, default: 1 },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    department: { type: String, default: '' },
    downloadUrl: { type: String, default: '' },
    lastUpdated: { type: String, default: '' }
  }],
  emptyState: {
    title: { type: String, default: '' },
    message: { type: String, default: '' }
  }
});

// Pricing Schema
const pricingSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: 'Our Prices' },
    subtitle: { type: String, default: 'With our scalable packages, you can pay for what you need and leave out what you don\'t. We will grow with you.' }
  },
  accountOpening: {
    title: { type: String, default: 'Account Opening Charges' },
    plans: [{
      id: { type: Number, default: 1 },
      title: { type: String, default: '' },
      price: { type: String, default: '' },
      description: { type: String, default: '' }
    }]
  },
  costBreakdown: {
    title: { type: String, default: 'Cost Breakdown' },
    tabs: [{
      id: { type: String, default: 'equity' },
      label: { type: String, default: 'Equity' },
      columnHeaders: [{ type: String, default: '' }],
      charges: [{ type: mongoose.Schema.Types.Mixed, default: {} }]
    }]
  }
});

// Privacy Policy Schema
const privacyPolicySchema = new mongoose.Schema({
  header: {
    title: { type: String, default: '' },
    lastUpdated: { type: String, default: '' }
  },
  introduction: { type: String, default: '' },
  sections: [{
    id: { type: Number, default: 1 },
    title: { type: String, default: '' },
    content: [{
      type: { type: String, enum: ['paragraph', 'list'], default: 'paragraph' },
      text: { type: String, default: '' },
      items: [{ type: String, default: '' }]
    }]
  }]
});

// Disclaimer Schema
const disclaimerSchema = new mongoose.Schema({
  header: {
    title: { type: String, default: '' },
    lastUpdated: { type: String, default: '' }
  },
  introduction: { type: String, default: '' },
  sections: [{
    id: { type: Number, default: 1 },
    title: { type: String, default: '' },
    content: [{
      type: { type: String, enum: ['paragraph', 'list'], default: 'paragraph' },
      text: { type: String, default: '' },
      items: [{ type: String, default: '' }]
    }]
  }]
});

// Service Schema
const serviceSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: 'Our Services' },
    subtitle: { type: String, default: 'Comprehensive financial services tailored to your needs' }
  },
  services: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    features: [{ type: String, default: '' }]
  }]
});

// Product Schema
const productSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: 'Our Services' },
    subtitle: { type: String, default: 'At Focus Stock Brokers Ltd., we believe in providing more than just a trading platform — we offer end-to-end financial solutions under one roof.' }
  },
  servicesSection: {
    title: { type: String, default: 'Complete Financial Solutions' },
    subtitle: { type: String, default: 'Everything you need for your investment journey, backed by expert guidance and personalized service.' }
  },
  services: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    features: [{ type: String, default: '' }]
  }],
  productsSection: {
    title: { type: String, default: 'Products We Deal In' },
    subtitle: { type: String, default: 'We provide a curated list of financial products, focusing on quality, reliability, and long-term value creation.' }
  },
  products: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    features: [{ type: String, default: '' }]
  }]
});

// Main Page Schema
const pageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hero: heroSchema,
  about: aboutSchema,
  testimonials: testimonialsSchema,
  contact: contactSchema,
  whyChooseUs: whyChooseUsSchema,
  mobileApp: mobileAppSchema,
  productGrid: productGridSchema,
  trustManifesto: trustManifestoSchema,
  advancedSlider: advancedSliderSchema,
  attentionInvestors: attentionInvestorsSchema,
  downloads: downloadsSchema,
  policies: policiesSchema,
  pricing: pricingSchema,
  privacyPolicy: privacyPolicySchema,
  disclaimer: disclaimerSchema,
  service: serviceSchema,
  product: productSchema,
  isActive: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  modifiedBy: { type: String, default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);