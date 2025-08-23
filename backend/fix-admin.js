const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stockbroker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Page = require('./models/Page');

async function fixAdminData() {
  try {
    console.log('🔧 Fixing admin data structure...');

    // Remove any existing homepage with old structure
    await Page.deleteMany({ name: 'homepage' });
    console.log('✅ Cleaned old homepage data');

    console.log('🎉 Admin data structure fixed! You can now save homepage data properly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing admin data:', error);
    process.exit(1);
  }
}

fixAdminData();