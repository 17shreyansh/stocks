const axios = require('axios');

const API_BASE = import.meta.env.VITE_API_URL ;

async function testHomepage() {
  try {
    console.log('🚀 Testing Homepage API...\n');

    // Test 1: Get homepage data
    console.log('1. Testing GET /pages/homepage');
    try {
      const response = await axios.get(`${API_BASE}/pages/homepage`);
      console.log('✅ Success:', response.data.success);
      console.log('📄 Page sections:', Object.keys(response.data.data || {}));
    } catch (error) {
      console.log('❌ Error:', error.response?.data?.message || error.message);
    }

    // Test 2: Get all pages
    console.log('\n2. Testing GET /pages');
    try {
      const response = await axios.get(`${API_BASE}/pages`);
      console.log('✅ Success: Found', response.data.length, 'pages');
      console.log('📋 Pages:', response.data.map(p => p.name));
    } catch (error) {
      console.log('❌ Error:', error.response?.data?.message || error.message);
    }

    console.log('\n✨ Homepage API test completed!');
  } catch (error) {
    console.error('💥 Test failed:', error.message);
  }
}

testHomepage();