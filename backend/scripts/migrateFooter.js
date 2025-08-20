const mongoose = require('mongoose');
const Footer = require('../models/Footer');
require('dotenv').config();

const migrateFooterData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stockbroker');
    console.log('Connected to MongoDB');

    // Find existing footer data
    const existingFooter = await Footer.findOne({ isActive: true });
    
    if (existingFooter) {
      console.log('Migrating existing footer data...');
      
      // Migrate quickLinks to quickLinks1
      if (existingFooter.quickLinks && !existingFooter.quickLinks1) {
        existingFooter.quickLinks1 = existingFooter.quickLinks;
      }
      
      // Migrate services to quickLinks2
      if (existingFooter.services && !existingFooter.quickLinks2) {
        existingFooter.quickLinks2 = {
          heading: existingFooter.services.heading || 'Resources',
          links: existingFooter.services.links || []
        };
      }
      
      // Create default quickLinks3 and quickLinks4 if they don't exist
      if (!existingFooter.quickLinks3) {
        existingFooter.quickLinks3 = {
          heading: 'Support',
          links: [
            { text: 'Help Center', href: '#help', type: 'link', isActive: true },
            { text: 'Customer Care', href: '#support', type: 'link', isActive: true },
            { text: 'FAQ', href: '#faq', type: 'link', isActive: true }
          ]
        };
      }
      
      if (!existingFooter.quickLinks4) {
        existingFooter.quickLinks4 = {
          heading: 'Legal',
          links: [
            { text: 'Privacy Policy', href: '/privacy-policy', type: 'link', isActive: true },
            { text: 'Terms of Service', href: '/terms', type: 'link', isActive: true },
            { text: 'Disclaimer', href: '/disclaimer', type: 'link', isActive: true }
          ]
        };
      }
      
      // Remove old services field
      existingFooter.services = undefined;
      
      await existingFooter.save();
      console.log('Footer data migrated successfully!');
    } else {
      console.log('No existing footer found, creating new one...');
      
      const newFooter = new Footer({
        quickLinks1: {
          heading: 'Quick Links',
          links: [
            { text: 'About Us', href: '#about', type: 'link', isActive: true },
            { text: 'Mobile App', href: '#app', type: 'link', isActive: true },
            { text: 'Contact', href: '#contact', type: 'link', isActive: true }
          ]
        },
        quickLinks2: {
          heading: 'Resources',
          links: [
            { text: 'Stock Trading', href: '#trading', type: 'link', isActive: true },
            { text: 'Mutual Funds', href: '#mutualfunds', type: 'link', isActive: true },
            { text: 'IPO Investments', href: '#ipo', type: 'link', isActive: true }
          ]
        },
        quickLinks3: {
          heading: 'Support',
          links: [
            { text: 'Help Center', href: '#help', type: 'link', isActive: true },
            { text: 'Customer Care', href: '#support', type: 'link', isActive: true },
            { text: 'FAQ', href: '#faq', type: 'link', isActive: true }
          ]
        },
        quickLinks4: {
          heading: 'Legal',
          links: [
            { text: 'Privacy Policy', href: '/privacy-policy', type: 'link', isActive: true },
            { text: 'Terms of Service', href: '/terms', type: 'link', isActive: true },
            { text: 'Disclaimer', href: '/disclaimer', type: 'link', isActive: true }
          ]
        },
        regulatoryInfo: {
          heading: 'Regulatory Information',
          items: [
            { text: 'Focus Stock Broker Ltd – SEBI Regn. No : NSE/BSE – INZ000218531', type: 'text', isActive: true },
            { text: 'NSE(13475) – Equity/Equity Derivative', type: 'text', isActive: true },
            { text: 'BSE(4025) – Equity/Equity Derivative', type: 'text', isActive: true },
            { text: 'CDSL SEBI Registration Number Depository Participant : IN-DP-157-2015', type: 'text', isActive: true }
          ]
        },
        moreLinks: {
          heading: 'More Links',
          investorCharter: {
            heading: 'Investor Charter',
            links: [
              { text: 'Stock Broker', href: '#', type: 'link', isActive: true },
              { text: 'Depository Participant', href: '#', type: 'link', isActive: true }
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
        legalLinks: [
          { text: 'Privacy Policy', href: '/privacy-policy', isActive: true },
          { text: 'Disclaimer', href: '/disclaimer', isActive: true }
        ]
      });
      
      await newFooter.save();
      console.log('New footer created successfully!');
    }
    
    console.log('Migration completed!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
};

migrateFooterData();