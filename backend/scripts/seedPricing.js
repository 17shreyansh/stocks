const mongoose = require('mongoose');
const Page = require('../models/Page');
require('dotenv').config();

const pricingData = {
  name: 'pricing',
  pricing: {
    hero: {
      title: 'Our Prices',
      subtitle: 'With our scalable packages, you can pay for what you need and leave out what you don\'t. We will grow with you.'
    },
    accountOpening: {
      title: 'Account Opening Charges',
      plans: [
        {
          id: 1,
          title: 'Non Resident Indian',
          price: '₹500',
          description: 'Unlocking Limitless Trading Potential'
        },
        {
          id: 2,
          title: 'Corporate & Business Entities',
          price: '₹1000',
          description: 'For LLP, Partnership Firms, Public Companies & HUF'
        }
      ]
    },
    costBreakdown: {
      title: 'Cost Breakdown',
      tabs: [
        {
          id: 'equity',
          label: 'Equity',
          columnHeaders: ['Charge Type', 'Delivery', 'Intraday', 'Futures', 'Options'],
          charges: [
            {
              col_0: 'STT/CTT',
              col_1: '0.1% on buy & sell',
              col_2: '0.025% on the sell side',
              col_3: '0.0125% on the sell side',
              col_4: '0.125% of intrinsic value on exercised options'
            },
            {
              col_0: 'Transaction charges',
              col_1: 'NSE: 0.00325% / BSE: 0.00375%',
              col_2: 'NSE: 0.00325% / BSE: 0.00375%',
              col_3: 'NSE: 0.0019% / BSE: 0',
              col_4: 'NSE: 0.05% (on premium) / BSE: 0.005% (on premium)'
            },
            {
              col_0: 'GST',
              col_1: '18% on (brokerage + SEBI charges + transaction charges)',
              col_2: '18% on (brokerage + SEBI charges + transaction charges)',
              col_3: '18% on (brokerage + SEBI charges + transaction charges)',
              col_4: '18% on (brokerage + SEBI charges + transaction charges)'
            },
            {
              col_0: 'SEBI charges',
              col_1: '₹10 / crore',
              col_2: '₹10 / crore',
              col_3: '₹10 / crore',
              col_4: '₹10 / crore'
            },
            {
              col_0: 'Stamp charges',
              col_1: '0.015% or ₹1500 / crore on buy side',
              col_2: '0.003% or ₹300 / crore on buy side',
              col_3: '0.002% or ₹200 / crore on buy side',
              col_4: '0.003% or ₹300 / crore on buy side'
            }
          ]
        },
        {
          id: 'currency',
          label: 'Currency',
          columnHeaders: ['Charge Type', 'Futures', 'Options'],
          charges: [
            {
              col_0: 'STT/CTT',
              col_1: 'No STT',
              col_2: 'No STT'
            },
            {
              col_0: 'Transaction charges',
              col_1: 'NSE: 0.0009% / BSE: 0.00025%',
              col_2: 'NSE: 0.035% / BSE: 0.001%'
            },
            {
              col_0: 'GST',
              col_1: '18% on (brokerage + SEBI charges + transaction charges)',
              col_2: '18% on (brokerage + SEBI charges + transaction charges)'
            },
            {
              col_0: 'SEBI charges',
              col_1: '₹10 / crore',
              col_2: '₹10 / crore'
            },
            {
              col_0: 'Stamp charges',
              col_1: '0.0001% or ₹10 / crore on buy side',
              col_2: '0.0001% or ₹10 / crore on buy side'
            }
          ]
        }
      ]
    }
  }
};

async function seedPricing() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Page.findOneAndUpdate(
      { name: 'pricing' },
      pricingData,
      { upsert: true, new: true }
    );

    console.log('Pricing data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding pricing data:', error);
    process.exit(1);
  }
}

seedPricing();