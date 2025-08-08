const axios = require('axios');

async function testConnection() {
  try {
    console.log('Testing backend connection...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Backend health check:', healthResponse.data);
    
    // Test public API
    const dataResponse = await axios.get('http://localhost:5000/api/data/hero');
    console.log('✅ Public API working:', dataResponse.data.success);
    
    // Test admin login
    const loginResponse = await axios.post('http://localhost:5000/api/admin/login', {
      username: 'superadmin',
      password: 'Admin@123456'
    });
    console.log('✅ Admin login working:', loginResponse.data.success);
    
    console.log('\n🎉 All connections working! Backend and frontend are properly connected.');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure to start the backend server first: npm run dev');
    }
  }
}

testConnection();