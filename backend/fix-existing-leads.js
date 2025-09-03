const mongoose = require('mongoose');
const ContactLead = require('./models/ContactLead');
require('dotenv').config();

async function fixExistingLeads() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all leads without formType
    const leadsWithoutFormType = await ContactLead.find({ 
      $or: [
        { formType: { $exists: false } },
        { formType: null }
      ]
    });

    console.log(`Found ${leadsWithoutFormType.length} leads without formType`);

    for (const lead of leadsWithoutFormType) {
      let formType = 'homepage'; // default

      // Try to determine formType from source
      if (lead.source) {
        if (lead.source.includes('callback')) {
          formType = 'callback';
        } else if (lead.source.includes('associate')) {
          formType = 'associate';
        } else if (lead.source.includes('partner')) {
          formType = 'partner';
        } else if (lead.source === 'homepage') {
          formType = 'homepage';
        }
      }

      // Update the lead
      await ContactLead.findByIdAndUpdate(lead._id, { formType });
      console.log(`Updated lead ${lead._id} with formType: ${formType}`);
    }

    console.log('✅ All existing leads updated with formType');

    // Show statistics
    const stats = await ContactLead.aggregate([
      {
        $group: {
          _id: '$formType',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\n📊 Updated statistics:');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} leads`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

fixExistingLeads();