const mongoose = require('mongoose');
const User = require('../models/User');
const Page = require('../models/Page');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Page.deleteMany({});

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@stockbroker.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create homepage data
    const homepage = new Page({
      name: 'homepage',
      hero: {
        title: { main: 'An intelligent way to', highlight: 'Invest & Trade' },
        description: 'Experience the future of investing with our cutting-edge platform designed for modern traders and investors.',
        scrollText: 'Scroll Down',
        buttons: [
          { text: 'Get Started', type: 'primary' },
          { text: 'Learn More', type: 'secondary' }
        ],
        orbitConfigs: [
          { icon: 'FaApple', size: 55, tilt: 15, color: '#007AFF', bgColor: '#ffffff' },
          { icon: 'FaGoogle', size: 50, tilt: -10, color: '#4285F4', bgColor: '#ffffff' }
        ]
      },
      about: {
        title: 'Focus Stock Broker Ltd',
        subtitle: 'From startup to success story, we\'ve been revolutionizing the investment landscape.',
        story: {
          title: 'Our Story',
          paragraphs: [
            'Since 2018, we\'ve been on a mission to democratize stock market investing and make it accessible to everyone.',
            'Our platform combines cutting-edge technology with expert insights to provide you with the best trading experience.'
          ]
        },
        milestones: [
          {
            date: '2018',
            year: 2018,
            value: 125.50,
            growth: 0,
            title: 'The Beginning',
            description: 'Started with a dream to make trading accessible.'
          }
        ]
      },
      testimonials: {
        title: 'What Our Clients Say',
        subtitle: 'Real stories from real investors who trust our platform.',
        testimonials: [
          {
            id: 1,
            name: 'Rajesh Sharma',
            role: 'IT Professional',
            quote: 'This platform has transformed my investment journey. The interface is intuitive and the returns are impressive.',
            result: '23% returns in 8 months',
            rating: 5
          }
        ]
      },
      whyChooseUs: {
        title: 'Why Choose Us',
        subtitle: 'Our advantages that set us apart',
        advantages: [
          {
            id: 1,
            title: 'Zero Brokerage',
            value: '0% Brokerage',
            description: 'Trade without worrying about high brokerage fees.'
          }
        ]
      },
      mobileApp: {
        trading: {
          title: 'Trading App',
          description: 'Trade on the go with our mobile app',
          features: [
            { title: 'Real-time Data', description: 'Live market updates' },
            { title: 'Quick Orders', description: 'Execute trades instantly' }
          ],
          rating: '4.8 • 50K+ downloads',
          downloadTitle: 'Download Now'
        },
        mutualFunds: {
          title: 'Mutual Funds App',
          description: 'Invest in mutual funds easily',
          features: [
            { title: 'SIP Investment', description: 'Start SIP with just ₹500' },
            { title: 'Fund Analysis', description: 'Detailed fund performance' }
          ],
          rating: '4.9 • 75K+ downloads',
          downloadTitle: 'Download Now'
        },
        storeButtons: [
          { type: 'apple', text: 'Download on the', name: 'App Store' },
          { type: 'google', text: 'Get it on', name: 'Google Play' }
        ]
      },
      productGrid: {
        header: {
          title: 'Our Products',
          subtitle: 'Choose your investment path'
        },
        products: [
          {
            id: 1,
            title: 'Equity Trading',
            description: 'Trade in stocks with zero brokerage',
            type: 'trading',
            link: '/equity-trading'
          }
        ]
      },
      trustManifesto: {
        manifestoStatements: [
          { text: 'Traditional brokers complicate.' },
          { text: 'We simplify.' },
          { text: 'Your success is our mission.' }
        ]
      },
      advancedSlider: {
        header: {
          title: 'Our Financial Services',
          subtitle: 'Comprehensive solutions tailored for your investment success'
        },
        slides: [
          {
            id: 1,
            title: 'Portfolio Management',
            subtitle: 'Professional portfolio analysis and optimization',
            background: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
            cta: 'Learn More',
            ctaLink: '#portfolio'
          }
        ]
      },
      attentionInvestors: {
        title: 'Attention Investors',
        bulletPoints: [
          'Stock market investments are subject to market risks, read all scheme related documents carefully.',
          'Past performance is not indicative of future results.',
          'Please consider your risk tolerance before investing.'
        ],
        disclaimer: 'Focus Stock Broker Ltd is a SEBI registered stock broker. Registration details and compliance information available on our website.'
      },
      contact: {
        title: 'Get in Touch',
        subtitle: 'Ready to start your investment journey? Contact our expert team today.',
        form: {
          submitText: 'Submit Inquiry',
          successMessage: 'Thank you for contacting us. Our team will get back to you within 24 hours.',
          socialProof: 'Join 500+ investors who contacted us this month'
        },
        contactInfo: {
          title: 'Contact Information',
          description: 'Our team of experts is here to help you with all your investment needs.',
          details: [
            { icon: 'location', text: '123 Business District, Mumbai, India' },
            { icon: 'phone', text: '+91 98765 43210' },
            { icon: 'email', text: 'contact@focusstockbroker.com' },
            { icon: 'clock', text: 'Mon-Fri: 9:00 AM - 6:00 PM' }
          ]
        },
        team: {
          title: 'Meet Our Team',
          members: [
            { name: 'Rajesh Kumar', role: 'Senior Advisor', initials: 'RK' },
            { name: 'Priya Sharma', role: 'Investment Specialist', initials: 'PS' }
          ]
        }
      }
    });

    await homepage.save();
    console.log('Homepage data created');

    console.log('Seed data created successfully!');
    console.log('Admin credentials: username: admin, password: admin123');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();