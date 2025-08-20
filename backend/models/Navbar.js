const mongoose = require('mongoose');

const navbarSchema = new mongoose.Schema({
  mainNavigation: [
    {
      text: { type: String, required: true },
      href: { type: String, default: '' },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }
  ],
  
  loginDropdown: [
    {
      text: { type: String, required: true },
      href: { type: String, default: '' },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }
  ],
  
  buttons: {
    openAccount: {
      text: { type: String, default: 'Open an Account' },
      href: { type: String, default: '/open-account' },
      isActive: { type: Boolean, default: true }
    },
    login: {
      text: { type: String, default: 'Login' },
      isActive: { type: Boolean, default: true }
    }
  },
  
  isActive: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  modifiedBy: { type: String, default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('Navbar', navbarSchema);