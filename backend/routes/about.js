const express = require('express');
const About = require('../models/About');
const auth = require('../middleware/auth');

const router = express.Router();

// GET about section
router.get('/:pageName', async (req, res) => {
  try {
    const about = await About.findOne({ pageName: req.params.pageName, isActive: true });
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST/PUT about section
router.post('/:pageName', auth, async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { pageName: req.params.pageName },
      { ...req.body, pageName: req.params.pageName },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;