const express = require('express');
const ContactLead = require('../models/ContactLead');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Submit contact form (public)
router.post('/submit', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const lead = new ContactLead({
      ...req.body,
      source: req.body.source || 'homepage'
    });

    await lead.save();
    res.json({ success: true, message: 'Thank you for contacting us! We\'ll get back to you shortly.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all leads (admin)
router.get('/leads', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.source) filter.source = req.query.source;

    const leads = await ContactLead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ContactLead.countDocuments(filter);

    res.json({ success: true, leads, total });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update lead status (admin)
router.put('/leads/:id', auth, async (req, res) => {
  try {
    const lead = await ContactLead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete lead (admin)
router.delete('/leads/:id', auth, async (req, res) => {
  try {
    await ContactLead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;