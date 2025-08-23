const axios = require('axios');

const testSave = async () => {
  try {
    const payload = {
      name: 'privacy-policy',
      privacyPolicy: {
        header: {
          title: 'Test Privacy Policy',
          lastUpdated: 'Last updated: ' + new Date().toLocaleDateString()
        },
        introduction: 'Test introduction',
        sections: [{
          id: Date.now(),
          title: 'Test Section',
          content: [{ type: 'paragraph', text: 'Test content' }]
        }]
      }
    };

    console.log('Sending payload:', JSON.stringify(payload, null, 2));
    
    const response = await axios.post('http://localhost:5000/api/pages', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

testSave();