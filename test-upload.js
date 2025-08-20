const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function testUpload() {
  try {
    // Create a simple test PDF file
    const testPdfContent = Buffer.from('%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n>>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000074 00000 n \n0000000120 00000 n \ntrailer\n<<\n/Size 4\n/Root 1 0 R\n>>\nstartxref\n179\n%%EOF');
    
    fs.writeFileSync('test.pdf', testPdfContent);
    
    const form = new FormData();
    form.append('document', fs.createReadStream('test.pdf'));
    form.append('title', 'Test Document');
    form.append('description', 'Test Description');
    form.append('category', 'Test Category');
    
    const response = await fetch('http://localhost:5000/api/documents', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-token'
      },
      body: form
    });
    
    console.log('Status:', response.status);
    console.log('Response:', await response.text());
    
    // Clean up
    fs.unlinkSync('test.pdf');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testUpload();