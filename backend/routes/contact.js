const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const router = express.Router();

// Contact Content Schema
const contactContentSchema = new mongoose.Schema({
  hero: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true }
  },
  contactCards: [{
    id: { type: String, required: true },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    type: { type: String, enum: ['email', 'phone'], required: true }
  }],
  tabs: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed }
  }]
}, { timestamps: true });

const ContactContent = mongoose.model('ContactContent', contactContentSchema);
const ContactLead = require('../models/ContactLead');

// GET contact content
router.get('/content', async (req, res) => {
  try {
    const content = await ContactContent.findOne();
    if (!content) {
      return res.status(404).json({ message: 'Contact content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST/PUT contact content (admin only)
router.post('/content', auth, async (req, res) => {
  try {
    const content = await ContactContent.findOneAndUpdate(
      {},
      req.body,
      { upsert: true, new: true }
    );
    res.json({ success: true, data: content });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST contact lead (public)
router.post('/lead', async (req, res) => {
  try {
    const lead = new ContactLead(req.body);
    await lead.save();
    res.json({ success: true, message: 'Thank you for contacting us! We will get back to you soon.' });
  } catch (error) {
    console.error('Lead save error:', error);
    res.status(500).json({ message: 'Failed to submit. Please try again.' });
  }
});

// GET all leads (admin only)
router.get('/leads', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status } = req.query;
    const filter = {};
    
    if (type) filter.type = type;
    if (status) filter.status = status;

    const leads = await ContactLead.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ContactLead.countDocuments(filter);

    res.json({
      leads,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update lead status (admin only)
router.put('/leads/:id', auth, async (req, res) => {
  try {
    const lead = await ContactLead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE lead (admin only)
router.delete('/leads/:id', auth, async (req, res) => {
  try {
    const lead = await ContactLead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;