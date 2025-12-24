const mongoose = require('mongoose');
const WhyChooseUs = require('../models/WhyChooseUs');
require('dotenv').config();

const seedWhyChooseUsData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if data already exists
    const existingData = await WhyChooseUs.findOne({ pageName: 'homepage' });
    
    if (existingData) {
      console.log('WhyChooseUs data already exists for homepage');
      return;
    }

    // Create default WhyChooseUs data
    const whyChooseUsData = new WhyChooseUs({
      pageName: 'homepage',
      title: 'Why Choose Focus Stock Broker Ltd',
      subtitle: 'Our competitive advantages that set us apart in the industry',
      advantages: [
        {
          id: 1,
          title: 'Lightning Fast',
          value: '<0.1s',
          description: 'Order execution speed, faster than industry average for seamless trading experience.',
          icon: 'FaRocket'
        },
        {
          id: 2,
          title: 'Reliable Platform',
          value: '99.9%',
          description: 'Uptime guarantee with robust infrastructure to ensure uninterrupted trading.',
          icon: 'FaServer'
        },
        {
          id: 3,
          title: 'Expert Support',
          value: '24/7',
          description: 'Customer support availability with dedicated relationship managers for premium clients.',
          icon: 'FaHeadset'
        },
        {
          id: 4,
          title: 'Full Transparency',
          value: '0',
          description: 'Zero hidden charges with clear fee structure and transparent pricing policy.',
          icon: 'FaEye'
        }
      ],
      isActive: true
    });

    await whyChooseUsData.save();
    console.log('WhyChooseUs data seeded successfully');

  } catch (error) {
    console.error('Error seeding WhyChooseUs data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed function
if (require.main === module) {
  seedWhyChooseUsData();
}

module.exports = seedWhyChooseUsData;