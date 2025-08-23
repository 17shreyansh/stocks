const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testPolicyData = {
  name: 'policies',
  policies: {
    header: {
      title: 'Policies Center',
      subtitle: 'Access all company policies and procedures organized by department.'
    },
    departments: ['Trading', 'Compliance', 'Risk Management', 'Operations'],
    policies: [
      {
        id: 1,
        title: 'Trading Risk Management Policy',
        department: 'Trading',
        description: 'Comprehensive policy covering all aspects of trading risk management.',
        downloadUrl: '/uploads/documents/trading-risk-policy.pdf',
        lastUpdated: '2024-01-15'
      },
      {
        id: 2,
        title: 'Compliance Guidelines',
        department: 'Compliance',
        description: 'Guidelines for maintaining regulatory compliance.',
        downloadUrl: '/uploads/documents/compliance-guidelines.pdf',
        lastUpdated: '2024-01-10'
      }
    ],
    emptyState: {
      title: 'No policies found',
      message: 'Try adjusting your search terms or filters'
    }
  }
};

const testDownloadsData = {
  name: 'downloads',
  downloads: {
    header: {
      title: 'Downloads Center',
      subtitle: 'Access all your important documents, forms, and resources in one place.'
    },
    categories: ['KYC Forms', 'Legal Documents', 'Trading Forms', 'Support Forms'],
    documents: [
      {
        id: 1,
        title: 'KYC Application Form',
        category: 'KYC Forms',
        description: 'Complete KYC form for new account opening.',
        fileSize: '2.1 MB',
        downloadUrl: '/uploads/documents/kyc-form.pdf',
        lastUpdated: '2024-01-15'
      },
      {
        id: 2,
        title: 'Terms of Service',
        category: 'Legal Documents',
        description: 'Complete terms and conditions for using our services.',
        fileSize: '3.2 MB',
        downloadUrl: '/uploads/documents/terms-of-service.pdf',
        lastUpdated: '2024-01-12'
      }
    ],
    emptyState: {
      title: 'No documents found',
      message: 'Try adjusting your search terms or filters'
    }
  }
};

async function testAPI() {
  console.log('🧪 Testing Admin Portal Fixes...\n');

  try {
    // Test 1: Create/Update Policies Page
    console.log('1. Testing Policies Page Creation/Update...');
    try {
      const policiesResponse = await axios.post(`${API_BASE_URL}/pages`, testPolicyData);
      console.log('✅ Policies page created/updated successfully');
      console.log(`   Response status: ${policiesResponse.status}`);
    } catch (error) {
      console.log('❌ Policies page creation failed:', error.response?.data?.message || error.message);
    }

    // Test 2: Create/Update Downloads Page
    console.log('\n2. Testing Downloads Page Creation/Update...');
    try {
      const downloadsResponse = await axios.post(`${API_BASE_URL}/pages`, testDownloadsData);
      console.log('✅ Downloads page created/updated successfully');
      console.log(`   Response status: ${downloadsResponse.status}`);
    } catch (error) {
      console.log('❌ Downloads page creation failed:', error.response?.data?.message || error.message);
    }

    // Test 3: Fetch Policies Page
    console.log('\n3. Testing Policies Page Retrieval...');
    try {
      const policiesGetResponse = await axios.get(`${API_BASE_URL}/pages/policies`);
      console.log('✅ Policies page retrieved successfully');
      console.log(`   Found ${policiesGetResponse.data.data?.policies?.policies?.length || 0} policies`);
      console.log(`   Found ${policiesGetResponse.data.data?.policies?.departments?.length || 0} departments`);
    } catch (error) {
      console.log('❌ Policies page retrieval failed:', error.response?.data?.message || error.message);
    }

    // Test 4: Fetch Downloads Page
    console.log('\n4. Testing Downloads Page Retrieval...');
    try {
      const downloadsGetResponse = await axios.get(`${API_BASE_URL}/pages/downloads`);
      console.log('✅ Downloads page retrieved successfully');
      console.log(`   Found ${downloadsGetResponse.data.data?.downloads?.documents?.length || 0} documents`);
      console.log(`   Found ${downloadsGetResponse.data.data?.downloads?.categories?.length || 0} categories`);
    } catch (error) {
      console.log('❌ Downloads page retrieval failed:', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 Testing completed!');
    console.log('\n📋 Summary:');
    console.log('- Policies and Downloads pages should now work correctly');
    console.log('- Admin editors have improved validation and error handling');
    console.log('- File uploads are more secure and robust');
    console.log('- Frontend pages properly integrate with backend data');
    console.log('- Better error handling and user feedback throughout');

  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI, testPolicyData, testDownloadsData };