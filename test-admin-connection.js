const axios = require('axios');

const testConnection = async () => {
  const API_URL = 'http://localhost:5000/api';
  
  try {
    console.log('Testing admin portal connection...\n');

    // Test 1: Login
    console.log('1. Testing login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });
    console.log('✅ Login successful');
    
    const token = loginResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };

    // Test 2: Get pages
    console.log('2. Testing pages API...');
    const pagesResponse = await axios.get(`${API_URL}/pages`, { headers });
    console.log(`✅ Pages API working - Found ${pagesResponse.data.length} pages`);

    // Test 3: Get documents
    console.log('3. Testing documents API...');
    const documentsResponse = await axios.get(`${API_URL}/documents`, { headers });
    console.log(`✅ Documents API working - Found ${documentsResponse.data.length} documents`);

    // Test 4: Create/Update homepage
    console.log('4. Testing page creation/update...');
    const pageData = {
      name: 'homepage',
      hero: {
        title: { main: 'Test Title', highlight: 'Test Highlight' },
        description: 'Test Description'
      }
    };
    
    try {
      await axios.post(`${API_URL}/pages`, pageData, { headers });
      console.log('✅ Page created successfully');
    } catch (error) {
      if (error.response?.status === 400) {
        await axios.put(`${API_URL}/pages/homepage`, pageData, { headers });
        console.log('✅ Page updated successfully');
      } else {
        throw error;
      }
    }

    console.log('\n🎉 All tests passed! Admin portal is connected to server.');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.response?.data || error.message);
  }
};

testConnection();