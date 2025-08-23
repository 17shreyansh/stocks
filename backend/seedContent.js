const mongoose = require('mongoose');
require('dotenv').config();

const Hero = require('./models/Hero');
const About = require('./models/About');
const WhyChooseUs = require('./models/WhyChooseUs');
const Testimonials = require('./models/Testimonials');
const MobileApp = require('./models/MobileApp');
const ProductGrid = require('./models/ProductGrid');
const Contact = require('./models/Contact');
const AdvancedSlider = require('./models/AdvancedSlider');

const seedData = {
  hero: {
    pageName: 'homepage',
    title: { main: 'An intelligent way to', highlight: 'Invest & Trade' },
    description: 'Experience the future of investing with AI-powered insights and real-time market analysis across multiple platforms.',
    scrollText: 'Scroll Down',
    buttons: [
      { text: 'Get Started', type: 'primary' },
      { text: 'Learn More', type: 'secondary' }
    ]
  },
  about: {
    pageName: 'homepage',
    title: 'Focus Stock Broker Ltd',
    subtitle: 'From startup to success story - transforming how India invests since 2018',
    story: {
      title: 'Our Story',
      paragraphs: [
        'Since 2018, we\'ve been on a mission to democratize stock market investing in India.',
        'Our journey reflects the growth of India\'s retail investment landscape.'
      ]
    },
    milestones: [
      { date: '2018', title: 'The Beginning', description: 'Started with a dream to make trading accessible.', year: 2018, value: 125.50, growth: 0 },
      { date: '2019', title: 'Official Launch', description: 'SEBI registered and launched zero brokerage platform.', year: 2019, value: 189.75, growth: 51.2 }
    ]
  },
  whyChooseUs: {
    pageName: 'homepage',
    title: 'Why Choose Focus Stock Broker Ltd',
    subtitle: 'Our competitive advantages that set us apart in the industry',
    advantages: [
      { title: 'Lightning Fast', value: '<0.1s', description: 'Order execution speed, faster than industry average for seamless trading experience.' },
      { title: 'Reliable Platform', value: '99.9%', description: 'Uptime guarantee with robust infrastructure to ensure uninterrupted trading.' }
    ]
  },
  testimonials: {
    pageName: 'homepage',
    title: 'What Our Clients Say',
    subtitle: 'Real stories from real investors who trust Focus Stock Broker Ltd',
    testimonials: [
      { id: 1, name: 'Rajesh Sharma', role: 'IT Professional', quote: 'Focus Stock Broker Ltd has transformed my investment journey.', result: '23% returns in 8 months', rating: 5 },
      { id: 2, name: 'Priya Patel', role: 'Business Owner', quote: 'As a busy entrepreneur, I needed speed and clarity.', result: '18% portfolio growth', rating: 5 }
    ]
  },
  mobileApp: {
    pageName: 'homepage',
    trading: {
      title: 'Trading App',
      description: 'Professional trading platform with real-time market data, advanced charting, and instant execution.',
      features: [
        { title: 'Real-time Charts', description: 'Advanced technical analysis with live market data' },
        { title: 'Quick Trading', description: 'One-tap buy/sell with instant order execution' }
      ],
      rating: '4.8 • 50K+ downloads',
      downloadTitle: 'Download Now',
      appleLink: 'https://apps.apple.com/app/focus-trading',
      googleLink: 'https://play.google.com/store/apps/details?id=com.focus.trading'
    },
    mutualFunds: {
      title: 'Mutual Funds App',
      description: 'Simplified investing with curated mutual funds, SIP automation, and educational resources.',
      features: [
        { title: 'SIP Automation', description: 'Set up systematic investment plans effortlessly' },
        { title: 'Portfolio Overview', description: 'Clean dashboard with performance insights' }
      ],
      rating: '4.9 • 75K+ downloads',
      downloadTitle: 'Download Now',
      appleLink: 'https://apps.apple.com/app/focus-mf',
      googleLink: 'https://play.google.com/store/apps/details?id=com.focus.mf'
    }
  },
  productGrid: {
    pageName: 'homepage',
    header: {
      title: 'Our Product Suite',
      subtitle: 'Comprehensive financial solutions designed to empower your investment journey'
    },
    products: [
      { title: 'Equity Trading', description: 'Buy and sell stocks with advanced charting tools and real-time market data', link: '#equity' },
      { title: 'Derivatives Trading', description: 'Trade futures and options with professional risk management tools', link: '#derivatives' }
    ]
  },
  contact: {
    pageName: 'homepage',
    title: 'Get in Touch',
    subtitle: 'Ready to start your investment journey? Our team of experts is here to help you make informed decisions.',
    form: {
      submitText: 'Submit Inquiry',
      successMessage: 'Thank you for contacting us! We\'ll get back to you shortly.',
      socialProof: 'Join 500+ investors who contacted us this month'
    },
    contactInfo: {
      title: 'Contact Information',
      description: 'Our team of experts is ready to assist you with any questions about our services.',
      details: [
        { icon: 'location', text: 'Focus Tower, 123 Financial District, Mumbai 400001, India' },
        { icon: 'phone', text: '+91 22 1234 5678' },
        { icon: 'email', text: 'support@focusstockbroker.com' }
      ]
    },
    team: {
      title: 'Meet Our Team',
      members: [
        { name: 'Rahul Kumar', role: 'Senior Investment Advisor' },
        { name: 'Sanjay Mehta', role: 'Client Relationship Manager' }
      ]
    }
  },
  advancedSlider: {
    pageName: 'homepage',
    header: {
      title: 'Our Financial Services',
      subtitle: 'Comprehensive solutions tailored for your investment success'
    },
    slides: [
      { background: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44', title: 'Portfolio Management', subtitle: 'Professional portfolio analysis and optimization', cta: 'Learn More', ctaLink: '#portfolio' },
      { background: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3', title: 'Trading Platform', subtitle: 'Advanced tools for professional trading', cta: 'Start Trading', ctaLink: '#trading' }
    ]
  }
};

async function seedContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stockbroker');
    console.log('🔗 Connected to MongoDB');

    await Hero.deleteMany({ pageName: 'homepage' });
    await About.deleteMany({ pageName: 'homepage' });
    await WhyChooseUs.deleteMany({ pageName: 'homepage' });
    await Testimonials.deleteMany({ pageName: 'homepage' });
    await MobileApp.deleteMany({ pageName: 'homepage' });
    await ProductGrid.deleteMany({ pageName: 'homepage' });
    await Contact.deleteMany({ pageName: 'homepage' });
    await AdvancedSlider.deleteMany({ pageName: 'homepage' });

    await Hero.create(seedData.hero);
    await About.create(seedData.about);
    await WhyChooseUs.create(seedData.whyChooseUs);
    await Testimonials.create(seedData.testimonials);
    await MobileApp.create(seedData.mobileApp);
    await ProductGrid.create(seedData.productGrid);
    await Contact.create(seedData.contact);
    await AdvancedSlider.create(seedData.advancedSlider);

    console.log('✅ Homepage content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedContent();