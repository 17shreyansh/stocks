const mongoose = require('mongoose');
const Footer = require('../models/Footer');
require('dotenv').config();

const findAboutUs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stockbroker');
    const footer = await Footer.findOne();
    if (footer) {
      const doc = footer.toObject();
      let updated = false;
      const scanAndUpdate = (obj) => {
        if (!obj) return;
        if (Array.isArray(obj)) {
          obj.forEach(item => {
            if (item && item.text === 'About Us') {
              console.log('Found it in an array! Old href:', item.href);
              item.href = '/about-us';
              updated = true;
            } else if (typeof item === 'object') {
              scanAndUpdate(item);
            }
          });
        } else if (typeof obj === 'object') {
          for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
              scanAndUpdate(obj[key]);
            }
          }
        }
      };
      
      scanAndUpdate(doc);
      if (updated) {
        await Footer.updateOne({ _id: doc._id }, { $set: doc });
        console.log('Footer updated dynamically!');
      } else {
        console.log('Not found anywhere in Footer doc.');
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};
findAboutUs();
