const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Page = require('./models/Page');
const Document = require('./models/Document');

const viewData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Display Users
    console.log('👥 USERS:');
    const users = await User.find({}, 'username email role isActive').lean();
    users.forEach(user => {
      console.log(`  • ${user.username} (${user.email}) - Role: ${user.role}`);
    });

    // Display Documents
    console.log('\n📄 DOCUMENTS:');
    const documents = await Document.find({}, 'title category description fileSize').lean();
    documents.forEach(doc => {
      console.log(`  • ${doc.title} - Category: ${doc.category}`);
      console.log(`    Description: ${doc.description}`);
      console.log(`    Size: ${(doc.fileSize / 1024).toFixed(1)} KB\n`);
    });

    // Display Pages
    console.log('📄 PAGES:');
    const pages = await Page.find({}, 'name').lean();
    pages.forEach(page => {
      console.log(`  • ${page.name}`);
    });

    // Display Homepage details
    const homepage = await Page.findOne({ name: 'homepage' }).lean();
    if (homepage) {
      console.log('\n🏠 HOMEPAGE CONTENT:');
      console.log(`  Hero Title: ${homepage.hero?.title?.main} ${homepage.hero?.title?.highlight}`);
      console.log(`  Testimonials: ${homepage.testimonials?.testimonials?.length || 0}`);
      console.log(`  Products: ${homepage.productGrid?.products?.length || 0}`);
      console.log(`  Advantages: ${homepage.whyChooseUs?.advantages?.length || 0}`);
    }

    console.log('\n📊 DATABASE STATS:');
    console.log(`Total Users: ${await User.countDocuments()}`);
    console.log(`Total Pages: ${await Page.countDocuments()}`);
    console.log(`Total Documents: ${await Document.countDocuments()}`);

  } catch (error) {
    console.error('❌ Error viewing data:', error);
  } finally {
    mongoose.connection.close();
  }
};

viewData();