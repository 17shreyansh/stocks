const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testFrontendContact() {
  try {
    console.log('🌐 Testing Frontend Contact Page Integration...\n');

    // Test 1: Public contact data
    console.log('1. Testing public contact data endpoint...');
    const publicResponse = await axios.get(`${API_BASE}/contact/public`);
    
    console.log('✅ Public data retrieved successfully');
    console.log('📄 Hero title:', publicResponse.data.hero?.title);
    console.log('📞 Contact cards:', publicResponse.data.contactCards?.length || 0);
    console.log('📋 Tabs:', publicResponse.data.tabs?.length || 0);

    // Test 2: Contact lead submission
    console.log('\n2. Testing contact lead submission...');
    const leadData = {
      name: 'Frontend Test User',
      email: 'frontend@test.com',
      phone: '+91-9876543210',
      message: 'This is a test from frontend integration',
      source: 'contact-callback'
    };

    const leadResponse = await axios.post(`${API_BASE}/contact/lead`, leadData);
    console.log('✅ Lead submission successful');
    console.log('📧 Response:', leadResponse.data.message);

    // Test 3: Verify data structure for frontend
    console.log('\n3. Verifying data structure for frontend...');
    const data = publicResponse.data;
    
    const checks = {
      'Hero section': !!(data.hero && data.hero.title),
      'Contact cards array': Array.isArray(data.contactCards),
      'Tabs array': Array.isArray(data.tabs),
      'Contact cards have required fields': data.contactCards?.every(card => 
        card.id && card.title && card.contact && card.type
      ),
      'Tabs have required fields': data.tabs?.every(tab => 
        tab.id && tab.title
      )
    };

    console.log('📊 Data structure validation:');
    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`   ${check}: ${passed ? '✅' : '❌'}`);
    });

    const allPassed = Object.values(checks).every(Boolean);
    
    if (allPassed) {
      console.log('\n🎉 All frontend integration tests passed!');
      console.log('\n📋 Frontend should now display:');
      console.log(`   - Hero: "${data.hero.title}"`);
      console.log(`   - ${data.contactCards.length} contact cards`);
      console.log(`   - ${data.tabs.length} form tabs`);
      console.log('\n🌐 Visit: http://localhost:5173/contact-us');
    } else {
      console.log('\n⚠️  Some data structure issues found.');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Troubleshooting:');
      console.log('- Make sure backend is running: cd backend && npm start');
      console.log('- Check if MongoDB is connected');
    }
  }
}

testFrontendContact();