const axios = require('axios');

async function testHeroSection() {
  try {
    console.log('Testing Hero Section API...\n');
    
    // Test GET request
    console.log('1. Testing GET /api/hero/homepage');
    const getResponse = await axios.get('http://localhost:5000/api/hero/homepage');
    console.log('✅ GET Success:', JSON.stringify(getResponse.data, null, 2));
    
    // Test if frontend can access the data
    console.log('\n2. Current Hero Data Structure:');
    const heroData = getResponse.data.data;
    console.log('Title Main:', heroData?.title?.main);
    console.log('Title Highlight:', heroData?.title?.highlight);
    console.log('Description:', heroData?.description);
    console.log('Buttons:', heroData?.buttons);
    console.log('Scroll Text:', heroData?.scrollText);
    
    console.log('\n✅ Hero section API is working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing Hero section:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testHeroSection();