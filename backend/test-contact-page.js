const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const API_BASE = 'http://localhost:5000/api';

// Test data
const testContactData = {
  hero: {
    title: 'Contact Us',
    subtitle: 'We bring you comprehensive, insightful & up-to-date reports to let you take the right steps towards your financial goals.'
  },
  contactCards: [
    {
      id: 'support',
      icon: 'phone',
      title: 'Customer Support',
      description: 'Our team is dedicated in providing you hassle free experience Mon – Fri (09:00 am – 07:00 pm)',
      contact: 'care@proficientgroup.in',
      type: 'email'
    },
    {
      id: 'trading',
      icon: 'trade',
      title: 'Trading Support',
      description: 'Get help with your trading queries and technical issues',
      contact: '+91-123-456-7890',
      type: 'phone'
    }
  ],
  tabs: [
    {
      id: 'callback',
      title: 'Request Callback',
      subtitle: 'Have an enquiry? leave your details with us and we\'ll call you back.',
      content: {}
    },
    {
      id: 'partner',
      title: 'Partner with Us',
      subtitle: 'Interested in becoming our business partner?',
      content: {}
    }
  ]
};

async function testContactPage() {
  try {
    console.log('🚀 Testing Contact Page Functionality...\n');

    // Test 1: Get contact content without auth (should fail)
    console.log('1. Testing GET /contact/content without auth...');
    try {
      await axios.get(`${API_BASE}/contact/content`);
      console.log('❌ Should have failed without auth');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Correctly rejected without auth');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    // Test 2: Login to get token
    console.log('\n2. Logging in to get admin token...');
    let token;
    try {
      const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
        username: 'admin',
        password: 'admin123'
      });
      token = loginResponse.data.token;
      console.log('✅ Login successful, token obtained');
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data?.message || error.message);
      console.log('⚠️  Make sure admin user exists. Run: node backend/scripts/createAdmin.js');
      return;
    }

    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Test 3: Get contact content with auth
    console.log('\n3. Testing GET /contact/content with auth...');
    try {
      const getResponse = await axios.get(`${API_BASE}/contact/content`, { headers: authHeaders });
      console.log('✅ GET request successful');
      console.log('📄 Current data structure:', JSON.stringify(getResponse.data, null, 2));
    } catch (error) {
      console.log('❌ GET failed:', error.response?.data?.message || error.message);
    }

    // Test 4: Save contact content
    console.log('\n4. Testing POST /contact/content with test data...');
    try {
      const saveResponse = await axios.post(`${API_BASE}/contact/content`, testContactData, { headers: authHeaders });
      console.log('✅ POST request successful');
      console.log('💾 Saved data:', JSON.stringify(saveResponse.data, null, 2));
    } catch (error) {
      console.log('❌ POST failed:', error.response?.data?.message || error.message);
      console.log('Error details:', error.response?.data);
    }

    // Test 5: Verify saved data
    console.log('\n5. Verifying saved data...');
    try {
      const verifyResponse = await axios.get(`${API_BASE}/contact/content`, { headers: authHeaders });
      const savedData = verifyResponse.data;
      
      console.log('✅ Data retrieved successfully');
      
      // Check structure
      const hasHero = savedData.hero && savedData.hero.title;
      const hasContactCards = Array.isArray(savedData.contactCards) && savedData.contactCards.length > 0;
      const hasTabs = Array.isArray(savedData.tabs) && savedData.tabs.length > 0;
      
      console.log('📊 Data structure validation:');
      console.log(`   Hero section: ${hasHero ? '✅' : '❌'}`);
      console.log(`   Contact cards: ${hasContactCards ? '✅' : '❌'} (${savedData.contactCards?.length || 0} cards)`);
      console.log(`   Tabs: ${hasTabs ? '✅' : '❌'} (${savedData.tabs?.length || 0} tabs)`);
      
      if (hasHero && hasContactCards && hasTabs) {
        console.log('\n🎉 All tests passed! Contact page is working correctly.');
      } else {
        console.log('\n⚠️  Some data structure issues found.');
      }
      
    } catch (error) {
      console.log('❌ Verification failed:', error.response?.data?.message || error.message);
    }

    // Test 6: Test contact lead submission (public endpoint)
    console.log('\n6. Testing contact lead submission...');
    try {
      const leadData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91-9876543210',
        message: 'This is a test message',
        type: 'callback'
      };
      
      const leadResponse = await axios.post(`${API_BASE}/contact/lead`, leadData);
      console.log('✅ Lead submission successful');
      console.log('📧 Response:', leadResponse.data.message);
    } catch (error) {
      console.log('❌ Lead submission failed:', error.response?.data?.message || error.message);
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

// Connect to database and run tests
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stockbroker';
console.log('Using MongoDB URI:', mongoUri);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('📊 Connected to MongoDB');
  return testContactPage();
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
})
.finally(() => {
  mongoose.connection.close();
});