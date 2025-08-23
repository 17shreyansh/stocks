const express = require('express');
const AdvancedSlider = require('../models/AdvancedSlider');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:pageName', async (req, res) => {
  try {
    const data = await AdvancedSlider.findOne({ pageName: req.params.pageName, isActive: true });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/:pageName', auth, async (req, res) => {
  try {
    const data = await AdvancedSlider.findOneAndUpdate(
      { pageName: req.params.pageName },
      { ...req.body, pageName: req.params.pageName },
      { upsert: true, new: true }
    );
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;