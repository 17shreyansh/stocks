const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

// Import models
const User = require('./backend/models/User');
const Page = require('./backend/models/Page');
const Document = require('./backend/models/Document');

const addSampleData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Add sample users
    const users = [
      {
        username: 'john_trader',
        email: 'john@example.com',
        password: 'password123',
        role: 'editor'
      },
      {
        username: 'sarah_investor',
        email: 'sarah@example.com',
        password: 'password123',
        role: 'editor'
      }
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created user: ${userData.username}`);
      }
    }

    // Add sample documents
    const documents = [
      {
        title: 'Trading Guide for Beginners',
        description: 'Complete guide to start trading in stock market',
        category: 'Education',
        fileName: 'trading-guide.pdf',
        originalName: 'Trading Guide for Beginners.pdf',
        filePath: '/uploads/trading-guide.pdf',
        fileSize: 2048000,
        mimeType: 'application/pdf'
      },
      {
        title: 'Risk Management Strategies',
        description: 'Learn how to manage risks in stock trading',
        category: 'Risk Management',
        fileName: 'risk-management.pdf',
        originalName: 'Risk Management Strategies.pdf',
        filePath: '/uploads/risk-management.pdf',
        fileSize: 1536000,
        mimeType: 'application/pdf'
      }
    ];

    for (const docData of documents) {
      const existingDoc = await Document.findOne({ title: docData.title });
      if (!existingDoc) {
        const document = new Document(docData);
        await document.save();
        console.log(`✅ Created document: ${docData.title}`);
      }
    }

    // Update homepage with additional data
    const homepage = await Page.findOne({ name: 'homepage' });
    if (homepage) {
      // Add more testimonials
      homepage.testimonials.testimonials.push(
        {
          id: 2,
          name: 'Priya Patel',
          role: 'Business Owner',
          quote: 'The platform is user-friendly and the customer support is excellent. Highly recommended!',
          result: '18% returns in 6 months',
          rating: 5
        },
        {
          id: 3,
          name: 'Amit Singh',
          role: 'Software Engineer',
          quote: 'Great interface and real-time data. Perfect for both beginners and experienced traders.',
          result: '31% returns in 1 year',
          rating: 4
        }
      );

      // Add more products
      homepage.productGrid.products.push(
        {
          id: 2,
          title: 'Mutual Funds',
          description: 'Invest in diversified mutual fund portfolios',
          type: 'investment',
          link: '/mutual-funds'
        },
        {
          id: 3,
          title: 'Options Trading',
          description: 'Advanced options trading strategies',
          type: 'trading',
          link: '/options-trading'
        }
      );

      // Add more advantages
      homepage.whyChooseUs.advantages.push(
        {
          id: 2,
          title: 'Real-time Data',
          value: 'Live Updates',
          description: 'Get real-time market data and instant notifications.'
        },
        {
          id: 3,
          title: 'Expert Support',
          value: '24/7 Support',
          description: 'Our expert team is available round the clock.'
        }
      );

      await homepage.save();
      console.log('✅ Updated homepage with additional data');
    }

    console.log('\n🎉 Sample data added successfully!');
    console.log('\n📊 Database Summary:');
    console.log(`Users: ${await User.countDocuments()}`);
    console.log(`Pages: ${await Page.countDocuments()}`);
    console.log(`Documents: ${await Document.countDocuments()}`);

  } catch (error) {
    console.error('❌ Error adding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

addSampleData();