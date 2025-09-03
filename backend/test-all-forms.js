const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAllForms() {
  console.log('🧪 Testing All 4 Contact Forms...\n');

  const forms = [
    {
      name: 'Homepage Form',
      type: 'homepage',
      data: {
        formType: 'homepage',
        name: 'Homepage Test User',
        email: 'homepage@test.com',
        phone: '+91-9876543210',
        message: 'Test message from homepage',
        investment: '50000'
      }
    },
    {
      name: 'Callback Form',
      type: 'callback',
      data: {
        formType: 'callback',
        name: 'Callback Test User',
        email: 'callback@test.com',
        phone: '+91-9876543211',
        message: 'Test callback request',
        preferredTime: 'morning'
      }
    },
    {
      name: 'Associate Form',
      type: 'associate',
      data: {
        formType: 'associate',
        name: 'Associate Test User',
        email: 'associate@test.com',
        phone: '+91-9876543212',
        message: 'Test job application',
        position: 'trader',
        cvUrl: 'test-cv.pdf'
      }
    },
    {
      name: 'Partner Form',
      type: 'partner',
      data: {
        formType: 'partner',
        name: 'Partner Test User',
        email: 'partner@test.com',
        phone: '+91-9876543213',
        message: 'Test partnership inquiry',
        companyName: 'Test Company',
        businessType: 'firm'
      }
    }
  ];

  for (const form of forms) {
    try {
      console.log(`Testing ${form.name}...`);
      
      const response = await axios.post(`${API_BASE}/contact/lead`, form.data);
      
      if (response.data.success) {
        console.log(`✅ ${form.name} submitted successfully`);
        console.log(`   Message: ${response.data.message}`);
        console.log(`   Lead ID: ${response.data.leadId}`);
      } else {
        console.log(`❌ ${form.name} failed: ${response.data.message}`);
      }
    } catch (error) {
      console.log(`❌ ${form.name} error: ${error.response?.data?.message || error.message}`);
    }
    console.log('');
  }

  // Test leads retrieval with filtering
  console.log('📋 Testing leads retrieval...\n');
  
  try {
    // Get admin token first
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    const authHeaders = { 'Authorization': `Bearer ${token}` };

    // Test getting all leads
    const allLeadsResponse = await axios.get(`${API_BASE}/contact/leads`, { headers: authHeaders });
    console.log(`✅ Total leads: ${allLeadsResponse.data.total}`);
    
    // Test filtering by form type
    for (const formType of ['homepage', 'callback', 'associate', 'partner']) {
      const filteredResponse = await axios.get(`${API_BASE}/contact/leads?formType=${formType}`, { headers: authHeaders });
      console.log(`✅ ${formType} leads: ${filteredResponse.data.total}`);
    }
    
    console.log('\n📊 Form statistics:');
    if (allLeadsResponse.data.stats) {
      Object.entries(allLeadsResponse.data.stats).forEach(([type, stats]) => {
        console.log(`   ${type}: ${stats.total} total, ${stats.new} new`);
      });
    }
    
  } catch (error) {
    console.log(`❌ Leads retrieval error: ${error.response?.data?.message || error.message}`);
  }

  console.log('\n🎉 All form tests completed!');
}

testAllForms();