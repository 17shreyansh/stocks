const express = require('express');
const Hero = require('../models/Hero');
const auth = require('../middleware/auth');

const router = express.Router();

// GET hero section
router.get('/:pageName', async (req, res) => {
  try {
    const hero = await Hero.findOne({ pageName: req.params.pageName, isActive: true });
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST/PUT hero section
router.post('/:pageName', auth, async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate(
      { pageName: req.params.pageName },
      { ...req.body, pageName: req.params.pageName },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;