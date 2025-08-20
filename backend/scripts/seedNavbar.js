const mongoose = require('mongoose');
const Navbar = require('../models/Navbar');
require('dotenv').config();

const seedNavbarData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stockbroker');
    console.log('Connected to MongoDB');

    // Delete existing navbar data
    await Navbar.deleteMany({});
    console.log('Cleared existing navbar data...');

    const navbarData = new Navbar({
      mainNavigation: [
        { text: 'Home', href: '/', order: 1, isActive: true },
        { text: 'Products', href: '/products', order: 2, isActive: true },
        { text: 'Service', href: '/#services', order: 3, isActive: true },
        { text: 'Pricing', href: '/pricing', order: 4, isActive: true },
        { text: 'About Us', href: '/#about', order: 5, isActive: true },
        { text: 'Contact Us', href: '/contact-us', order: 6, isActive: true }
      ],
      
      loginDropdown: [
        { text: 'Backoffice Login', href: '#backoffice', order: 1, isActive: true },
        { text: 'Online Trading', href: '#trading', order: 2, isActive: true },
        { text: 'Mutual Funds', href: '#mutual-funds', order: 3, isActive: true },
        { text: 'DP Login', href: '#dp-login', order: 4, isActive: true },
        { text: 'Branch Login', href: '#branch', order: 5, isActive: true }
      ],
      
      buttons: {
        openAccount: {
          text: 'Open an Account',
          href: '/open-account',
          isActive: true
        },
        login: {
          text: 'Login',
          isActive: true
        }
      },
      
      isActive: true
    });

    await navbarData.save();
    console.log('Navbar data seeded successfully!');
    console.log('Created navbar with:', {
      mainNavigation: navbarData.mainNavigation.length + ' items',
      loginDropdown: navbarData.loginDropdown.length + ' items',
      buttons: 'Open Account & Login'
    });
    
  } catch (error) {
    console.error('Error seeding navbar data:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedNavbarData();