const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stockbroker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Page = require('./backend/models/Page');

async function fixAdminData() {
  try {
    console.log('🔧 Fixing admin data structure...');

    // Remove any existing homepage with old structure
    await Page.deleteMany({ name: 'homepage' });
    console.log('✅ Cleaned old homepage data');

    // Create new homepage with correct structure
    const homepageData = {
      name: 'homepage',
      hero: {
        title: { 
          main: 'An intelligent way to', 
          highlight: 'Invest & Trade' 
        },
        description: ['Experience the future of investing with AI-powered insights and real-time market analysis across multiple platforms.'],
        scrollText: 'Scroll Down',
        primaryButtonText: 'Get Started',
        secondaryButtonText: 'Learn More',
        primaryButtonLink: '/signup',
        secondaryButtonLink: '/about'
      },
      about: {
        title: 'Focus Stock Broker Ltd',
        subtitle: ['From startup to success story - transforming how India invests since 2018'],
        story: {
          title: 'Our Story',
          paragraphs: [
            'Since 2018, we\'ve been on a mission to democratize stock market investing in India.',
            'Our journey reflects the growth of India\'s retail investment landscape.'
          ]
        },
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        milestones: [
          {
            date: '2018',
            title: 'The Beginning',
            description: ['Started with a dream to make trading accessible.'],
            value: '125.50 Cr',
            image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
          }
        ]
      },
      whyChooseUs: {
        title: 'Why Choose Focus Stock Broker Ltd',
        subtitle: 'Our competitive advantages that set us apart in the industry',
        advantages: [
          {
            title: 'Lightning Fast',
            value: '<0.1s',
            description: ['Order execution speed, faster than industry average for seamless trading experience.'],
            icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
            link: '/trading'
          }
        ]
      },
      isActive: true
    };

    const newPage = new Page(homepageData);
    await newPage.save();
    console.log('✅ Created new homepage with correct structure');

    console.log('🎉 Admin data fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing admin data:', error);
    process.exit(1);
  }
}

fixAdminData();