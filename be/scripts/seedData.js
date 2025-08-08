import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Content from '../models/Content.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Content.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@stockbroker.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Seed homepage content
    const homeContent = [
      {
        page: 'home',
        section: 'hero',
        type: 'hero',
        title: 'Your Trusted Stock Broker Partner',
        subtitle: 'Professional Trading Solutions for Modern Investors',
        content: {
          text: 'Experience seamless trading with our cutting-edge platform and expert guidance.',
          paragraphs: [
            'Start your investment journey with confidence',
            'Access real-time market data and analytics',
            'Get personalized investment advice from our experts'
          ]
        },
        metadata: { order: 1, isActive: true }
      },
      {
        page: 'home',
        section: 'services',
        type: 'service',
        title: 'Our Services',
        subtitle: 'Comprehensive Trading Solutions',
        content: {
          features: [
            {
              title: 'Online Trading',
              description: 'Trade stocks, commodities, and derivatives with our advanced platform',
              icon: 'trading'
            },
            {
              title: 'Investment Advisory',
              description: 'Get expert advice tailored to your financial goals',
              icon: 'advisory'
            },
            {
              title: 'Portfolio Management',
              description: 'Professional portfolio management services for optimal returns',
              icon: 'portfolio'
            },
            {
              title: 'Research & Analysis',
              description: 'In-depth market research and technical analysis',
              icon: 'research'
            }
          ]
        },
        metadata: { order: 2, isActive: true }
      },
      {
        page: 'home',
        section: 'about',
        type: 'text',
        title: 'About Our Company',
        subtitle: 'Leading the Future of Trading',
        content: {
          paragraphs: [
            'We are a SEBI registered stock broker committed to providing exceptional trading services to our clients.',
            'With years of experience in the financial markets, we offer cutting-edge technology and personalized service.',
            'Our mission is to democratize investing and make financial markets accessible to everyone.'
          ]
        },
        metadata: { order: 3, isActive: true }
      },
      {
        page: 'home',
        section: 'testimonials',
        type: 'testimonial',
        title: 'What Our Clients Say',
        subtitle: 'Trusted by Thousands of Investors',
        content: {
          features: [
            {
              title: 'Excellent Service',
              description: 'The platform is user-friendly and the support team is always helpful. Highly recommended!',
              icon: 'John Doe, Mumbai'
            },
            {
              title: 'Great Returns',
              description: 'Thanks to their advisory services, my portfolio has grown significantly over the past year.',
              icon: 'Sarah Smith, Delhi'
            },
            {
              title: 'Professional Team',
              description: 'The research team provides excellent market insights that help in making informed decisions.',
              icon: 'Raj Patel, Bangalore'
            }
          ]
        },
        metadata: { order: 4, isActive: true }
      }
    ];

    await Content.insertMany(homeContent);
    console.log('Homepage content seeded');

    // Seed contact page content
    const contactContent = [
      {
        page: 'contact',
        section: 'header',
        type: 'text',
        title: 'Get in Touch',
        subtitle: 'We\'re Here to Help You Succeed',
        content: {
          paragraphs: [
            'Have questions about our services? Need help with your account?',
            'Our team of experts is ready to assist you with all your trading needs.',
            'Contact us today and take the first step towards financial success.'
          ]
        },
        metadata: { order: 1, isActive: true }
      },
      {
        page: 'contact',
        section: 'info',
        type: 'list',
        title: 'Contact Information',
        subtitle: 'Multiple Ways to Reach Us',
        content: {
          items: [
            'Phone: +91 12345 67890',
            'Email: info@stockbroker.com',
            'Address: 123 Financial District, Mumbai, India',
            'Business Hours: Mon-Fri 9:00 AM - 6:00 PM'
          ]
        },
        metadata: { order: 2, isActive: true }
      }
    ];

    await Content.insertMany(contactContent);
    console.log('Contact page content seeded');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();