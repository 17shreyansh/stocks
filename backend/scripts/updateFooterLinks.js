const mongoose = require('mongoose');
const Footer = require('../models/Footer');
require('dotenv').config();

const addAboutUsToFooter = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stockbroker');
    const footer = await Footer.findOne();
    if (footer) {
      if (!footer.quickLinks1) {
        footer.quickLinks1 = { heading: 'Quick Links', links: [] };
      }
      
      const exists = footer.quickLinks1.links.find(l => l.text === 'About Us');
      if (!exists) {
        footer.quickLinks1.links.push({
          text: 'About Us',
          href: '/about-us',
          type: 'link',
          isActive: true
        });
        await footer.save();
        console.log('Added About Us to Footer quickLinks1');
      } else {
        console.log('About Us already exists in Footer quickLinks1');
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};
addAboutUsToFooter();
