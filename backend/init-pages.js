const mongoose = require('mongoose');
const Page = require('./models/Page');
require('dotenv').config();

const initPages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create policies page
    const policiesPage = {
      name: 'policies',
      policies: {
        header: {
          title: 'Policies Center',
          subtitle: 'Access all company policies and procedures organized by department.'
        },
        departments: ['Trading', 'Compliance', 'Risk Management'],
        policies: [],
        emptyState: {
          title: 'No policies found',
          message: 'Try adjusting your search terms or filters'
        }
      }
    };

    // Create downloads page
    const downloadsPage = {
      name: 'downloads',
      downloads: {
        header: {
          title: 'Downloads Center',
          subtitle: 'Access all your important documents, forms, and resources in one place.'
        },
        categories: ['KYC Forms', 'Legal Documents', 'Trading Forms'],
        documents: [],
        emptyState: {
          title: 'No documents found',
          message: 'Try adjusting your search terms or filters'
        }
      }
    };

    // Create privacy policy page
    const privacyPolicyPage = {
      name: 'privacy-policy',
      privacyPolicy: {
        header: {
          title: 'Privacy Policy',
          lastUpdated: 'Last updated: January 15, 2024'
        },
        introduction: 'Focus Stock Brokers is committed to protecting your privacy.',
        sections: [
          {
            id: Date.now(),
            title: 'Information We Collect',
            content: [
              { type: 'paragraph', text: 'We collect information necessary to provide our services.' }
            ]
          }
        ]
      }
    };

    // Create disclaimer page
    const disclaimerPage = {
      name: 'disclaimer',
      disclaimer: {
        header: {
          title: 'Disclaimer',
          lastUpdated: 'Last updated: January 15, 2024'
        },
        introduction: 'Please read the following disclaimers carefully.',
        sections: [
          {
            id: Date.now() + 1,
            title: 'General Disclaimer',
            content: [
              { type: 'paragraph', text: 'Information provided is for general purposes only.' }
            ]
          }
        ]
      }
    };

    // Upsert pages
    await Page.findOneAndUpdate(
      { name: 'policies' },
      policiesPage,
      { upsert: true, new: true }
    );
    console.log('✅ Policies page created/updated');

    await Page.findOneAndUpdate(
      { name: 'downloads' },
      downloadsPage,
      { upsert: true, new: true }
    );
    console.log('✅ Downloads page created/updated');

    await Page.findOneAndUpdate(
      { name: 'privacy-policy' },
      privacyPolicyPage,
      { upsert: true, new: true }
    );
    console.log('✅ Privacy Policy page created/updated');

    await Page.findOneAndUpdate(
      { name: 'disclaimer' },
      disclaimerPage,
      { upsert: true, new: true }
    );
    console.log('✅ Disclaimer page created/updated');

    console.log('🎉 Pages initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

initPages();