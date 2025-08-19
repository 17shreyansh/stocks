const mongoose = require('mongoose');
const Footer = require('../models/Footer');
require('dotenv').config();

const seedFooterData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if footer data already exists
    const existingFooter = await Footer.findOne();
    if (existingFooter) {
      console.log('Footer data already exists');
      return;
    }

    const footerData = {
      company: {
        name: 'Focus Stock Broker Ltd',
        description: 'Focus Stock Broker Ltd is a SEBI registered stock broker providing innovative trading solutions with a commitment to transparency and customer satisfaction.'
      },
      
      quickLinks: {
        heading: 'Quick Links',
        links: [
          { text: 'Services', href: '#services', type: 'link', isActive: true },
          { text: 'About Us', href: '#about', type: 'link', isActive: true },
          { text: 'Mobile App', href: '#app', type: 'link', isActive: true },
          { text: 'Testimonials', href: '#testimonials', type: 'link', isActive: true },
          { text: 'Contact', href: '#contact', type: 'link', isActive: true }
        ]
      },
      
      services: {
        heading: 'Services',
        links: [
          { text: 'Stock Trading', href: '#', type: 'link', isActive: true },
          { text: 'Mutual Funds', href: '#', type: 'link', isActive: true },
          { text: 'Advisory Services', href: '#', type: 'link', isActive: true },
          { text: 'IPO Investments', href: '#', type: 'link', isActive: true },
          { text: 'Research Reports', href: '#', type: 'link', isActive: true }
        ]
      },
      
      regulatoryInfo: {
        heading: 'Regulatory Information',
        items: [
          { text: 'Proficient Equities Pvt Ltd – SEBI Regn. No : NSE/BSE – INZ000218531', type: 'text', isActive: true },
          { text: 'NSE(13475) – Equity/Equity Derivative', type: 'text', isActive: true },
          { text: 'BSE(4025) – Equity/Equity Derivative', type: 'text', isActive: true },
          { text: 'CDSL SEBI Registration Number Depository Participant : IN-DP-157-2015', type: 'text', isActive: true },
          { text: 'Mutual Funds Registration Number : AMFI ARN No – 108196 Corporate Identity Number : U65990WB2007PTC259260', type: 'text', isActive: true },
          { text: 'Compliance Officer : Mr. Om Prakash Dalmia (email id: opdalmia@proficientgroup.in)', type: 'text', isActive: true },
          { text: 'E-Voting API integration', href: 'https://evoting.cdslindia.com/Evoting/EvotingLogin', type: 'link', isActive: true },
          { text: 'Filing complaints on SCORES-Easy & quick', href: 'https://scores.gov.in/scores/Welcome.html', type: 'link', isActive: true },
          { text: 'Corporate Office : Focus Stock Broker Ltd, 23, R.N Mukherjee Road, BNCCI House, 4th Floor, Kolkata-700001', type: 'text', isActive: true },
          { text: 'Filing of complaints on SCORES-Easy & Quick. Mandatory Details for filing complaints on scores', type: 'text', isActive: true },
          { text: 'Register on the scores portal : Name, PAN, Address, Mobile Number, Email ID', type: 'text', isActive: true },
          { text: 'Benefits : Effective Communication & Speedy redressal of the grievances', type: 'text', isActive: true },
          { text: 'For NSE ( click Here)', type: 'text', isActive: true },
          { text: 'For BSE ( click Here)', type: 'text', isActive: true }
        ]
      },
      
      moreLinks: {
        heading: 'More Links',
        investorCharter: {
          heading: 'Investor Charter',
          links: [
            { text: 'Stock Broker', href: '#', type: 'link', isActive: true },
            { text: 'Depository Participant', href: '#', type: 'link', isActive: true },
            { text: 'Details-of-Proficient-Equities Pvt. Ltd', href: '#', type: 'link', isActive: true },
            { text: 'Details-of-Client-Bank-Accounts', href: '#', type: 'link', isActive: true }
          ]
        },
        otherLinks: [
          { text: 'Risk Disclosure & Disclaimer', href: '#', type: 'link', isActive: true },
          { text: 'Downloads', href: '/downloads', type: 'link', isActive: true },
          { text: 'Policies', href: '/policies', type: 'link', isActive: true }
        ]
      },
      
      socialLinks: [
        { platform: 'facebook', url: '#', isActive: true },
        { platform: 'twitter', url: '#', isActive: true },
        { platform: 'instagram', url: '#', isActive: true },
        { platform: 'linkedin', url: '#', isActive: true }
      ],
      
      contactInfo: {
        phone: '+91-XXXXXXXXXX',
        email: 'info@focusstockbrokers.com',
        address: 'Focus Stock Broker Ltd, 23, R.N Mukherjee Road, BNCCI House, 4th Floor, Kolkata-700001'
      },
      
      legalLinks: [
        { text: 'Privacy Policy', href: '/privacy-policy', isActive: true },
        { text: 'Disclaimer', href: '/disclaimer', isActive: true }
      ],
      
      copyright: {
        text: 'Focus Stock Broker Ltd. All rights reserved.',
        year: new Date().getFullYear()
      },
      
      isActive: true,
      modifiedBy: 'system'
    };

    const footer = new Footer(footerData);
    await footer.save();
    
    console.log('Footer data seeded successfully');
  } catch (error) {
    console.error('Error seeding footer data:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedFooterData();