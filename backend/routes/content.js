const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const router = express.Router();

// Content Schema
const contentSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'privacy-policy', 'disclaimer', 'investor-charter'
  title: { type: String, required: true },
  lastUpdated: { type: String },
  breadcrumb: { type: String },
  introduction: { type: String },
  sections: [{
    id: { type: mongoose.Schema.Types.Mixed, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['text', 'list'] },
    content: { type: mongoose.Schema.Types.Mixed }
  }],
  tables: [{
    id: { type: mongoose.Schema.Types.Mixed, required: true },
    title: { type: String, required: true },
    headers: [{ type: String }],
    rows: [{ type: mongoose.Schema.Types.Mixed }],
    downloadLinks: [{ type: mongoose.Schema.Types.Mixed }]
  }]
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

// GET content by type
router.get('/:type', async (req, res) => {
  try {
    const content = await Content.findOne({ type: req.params.type });
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST/PUT content (create or update)
router.post('/:type', auth, async (req, res) => {
  try {
    const contentData = {
      type: req.params.type,
      ...req.body
    };

    const content = await Content.findOneAndUpdate(
      { type: req.params.type },
      contentData,
      { upsert: true, new: true }
    );

    res.json({ success: true, data: content });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;