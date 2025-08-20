const express = require('express');
const router = express.Router();
const Navbar = require('../models/Navbar');
const auth = require('../middleware/auth');

// Get navbar data (public route)
router.get('/', async (req, res) => {
  try {
    let navbar = await Navbar.findOne({ isActive: true });
    
    if (!navbar) {
      // Create default navbar if none exists
      navbar = new Navbar({
        mainNavigation: [
          { text: 'Home', href: '/', order: 1 },
          { text: 'Products', href: '/products', order: 2 },
          { text: 'Service', href: '/#services', order: 3 },
          { text: 'Pricing', href: '/pricing', order: 4 },
          { text: 'About Us', href: '/#about', order: 5 },
          { text: 'Contact Us', href: '/contact-us', order: 6 }
        ],
        loginDropdown: [
          { text: 'Backoffice Login', href: '#backoffice', order: 1 },
          { text: 'Online Trading', href: '#trading', order: 2 },
          { text: 'Mutual Funds', href: '#mutual-funds', order: 3 },
          { text: 'DP Login', href: '#dp-login', order: 4 },
          { text: 'Branch Login', href: '#branch', order: 5 }
        ]
      });
      
      await navbar.save();
    }
    
    res.json(navbar);
  } catch (error) {
    console.error('Navbar fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch navbar data' });
  }
});

// Admin routes (protected)
router.get('/admin', auth, async (req, res) => {
  try {
    const navbar = await Navbar.findOne({ isActive: true });
    res.json(navbar || {});
  } catch (error) {
    console.error('Admin navbar fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch navbar data' });
  }
});

router.put('/admin', auth, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      lastModified: new Date(),
      modifiedBy: req.user?.username || 'admin'
    };
    
    let navbar = await Navbar.findOneAndUpdate(
      { isActive: true },
      updateData,
      { new: true, upsert: true }
    );
    
    res.json({ message: 'Navbar updated successfully', data: navbar });
  } catch (error) {
    console.error('Navbar update error:', error);
    res.status(500).json({ error: 'Failed to update navbar' });
  }
});

module.exports = router;