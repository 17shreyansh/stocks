const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAdminAccess() {
  try {
    console.log('🔐 Testing Admin Access...\n');

    // Test 1: Login
    console.log('1. Testing admin login...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });

    if (loginResponse.data.token) {
      console.log('✅ Login successful');
      console.log('📝 Token received:', loginResponse.data.token.substring(0, 20) + '...');
      
      const token = loginResponse.data.token;
      const authHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Test 2: Access contact content
      console.log('\n2. Testing contact content access...');
      const contactResponse = await axios.get(`${API_BASE}/contact/content`, { headers: authHeaders });
      
      console.log('✅ Contact content accessible');
      console.log('📄 Data structure valid:', !!(contactResponse.data.hero && contactResponse.data.contactCards && contactResponse.data.tabs));

      // Test 3: Test auth/me endpoint
      console.log('\n3. Testing auth verification...');
      const meResponse = await axios.get(`${API_BASE}/auth/me`, { headers: authHeaders });
      
      console.log('✅ Auth verification successful');
      console.log('👤 User:', meResponse.data.username);

      console.log('\n🎉 All admin access tests passed!');
      console.log('\n📋 Next steps:');
      console.log('1. Open browser: http://localhost:5173/admin');
      console.log('2. Login with: admin / admin123');
      console.log('3. Navigate to: Pages > Contact');
      
    } else {
      console.log('❌ Login failed - no token received');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n🔧 Troubleshooting:');
      console.log('- Make sure admin user exists: cd backend && node scripts/createAdmin.js');
      console.log('- Check if backend is running on port 5000');
    }
  }
}

testAdminAccess();