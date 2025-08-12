const mongoose = require('mongoose');
const User = require('../models/User');
const Page = require('../models/Page');
const Document = require('../models/Document');
require('dotenv').config();

const initDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create indexes for better performance
    await User.createIndexes();
    await Page.createIndexes();
    await Document.createIndexes();
    console.log('✅ Database indexes created');

    // Check if admin user exists
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const adminUser = new User({
        username: 'admin',
        email: 'admin@stockbroker.com',
        password: 'admin123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Check if homepage exists
    const homepageExists = await Page.findOne({ name: 'homepage' });
    if (!homepageExists) {
      const homepage = new Page({
        name: 'homepage',
        hero: {
          title: { main: '', highlight: '' },
          description: '',
          scrollText: '',
          buttons: [],
          orbitConfigs: []
        },
        about: {
          title: '',
          subtitle: '',
          story: { title: '', paragraphs: [''] },
          milestones: []
        },
        testimonials: {
          title: '',
          subtitle: '',
          testimonials: []
        },
        contact: {
          title: '',
          subtitle: '',
          form: { submitText: '', successMessage: '', socialProof: '' },
          contactInfo: { title: '', description: '', details: [] },
          team: { title: '', members: [] }
        },
        whyChooseUs: {
          title: '',
          subtitle: '',
          advantages: []
        },
        mobileApp: {
          trading: { title: '', description: '', features: [], rating: '', downloadTitle: '' },
          mutualFunds: { title: '', description: '', features: [], rating: '', downloadTitle: '' },
          storeButtons: []
        },
        productGrid: {
          header: { title: '', subtitle: '' },
          products: []
        },
        trustManifesto: {
          manifestoStatements: []
        },
        advancedSlider: {
          header: { title: '', subtitle: '' },
          slides: []
        },
        attentionInvestors: {
          title: '',
          bulletPoints: [],
          disclaimer: ''
        }
      });
      await homepage.save();
      console.log('✅ Homepage template created');
    } else {
      console.log('✅ Homepage already exists');
    }

    console.log('\n🎉 Database initialization completed successfully!');
    console.log('\nAdmin credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    mongoose.connection.close();
  }
};

initDatabase();