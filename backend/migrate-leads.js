const mongoose = require('mongoose');
require('dotenv').config();

async function migrateLeads() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all leads to have formType based on their current data
    const result1 = await mongoose.connection.db.collection('contactleads').updateMany(
      { formType: { $exists: false } },
      { $set: { formType: 'homepage' } }
    );

    console.log(`Updated ${result1.modifiedCount} leads without formType to 'homepage'`);

    // Update leads based on source patterns
    const result2 = await mongoose.connection.db.collection('contactleads').updateMany(
      { source: /callback/ },
      { $set: { formType: 'callback' } }
    );

    const result3 = await mongoose.connection.db.collection('contactleads').updateMany(
      { source: /associate/ },
      { $set: { formType: 'associate' } }
    );

    const result4 = await mongoose.connection.db.collection('contactleads').updateMany(
      { source: /partner/ },
      { $set: { formType: 'partner' } }
    );

    console.log(`Updated ${result2.modifiedCount} callback leads`);
    console.log(`Updated ${result3.modifiedCount} associate leads`);
    console.log(`Updated ${result4.modifiedCount} partner leads`);

    // Get final statistics
    const stats = await mongoose.connection.db.collection('contactleads').aggregate([
      {
        $group: {
          _id: '$formType',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    console.log('\n📊 Final statistics:');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} leads`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateLeads();