const express = require('express');
const Page = require('../models/Page');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET /api/pages
// @desc    Get all pages
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find({ isActive: true }).select('-__v');
    res.json(pages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/pages/:name
// @desc    Get page by name
// @access  Public
router.get('/:name', async (req, res) => {
  try {
    const page = await Page.findOne({ name: req.params.name, isActive: true });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/pages
// @desc    Create new page
// @access  Private (Admin only)
router.post('/', [
  auth,
  body('name').notEmpty().withMessage('Page name is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, ...pageData } = req.body;

    // Check if page already exists
    let page = await Page.findOne({ name });
    if (page) {
      return res.status(400).json({ message: 'Page already exists' });
    }

    page = new Page({
      name,
      ...pageData,
      modifiedBy: req.user.id
    });

    await page.save();
    res.status(201).json(page);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/pages/:name
// @desc    Update page
// @access  Private (Admin only)
router.put('/:name', auth, async (req, res) => {
  try {
    const { name, ...updateData } = req.body;

    let page = await Page.findOne({ name: req.params.name });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    // Update page
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        page[key] = updateData[key];
      }
    });

    page.lastModified = new Date();
    page.modifiedBy = req.user.id;

    await page.save();
    res.json(page);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/pages/:name
// @desc    Delete page (soft delete)
// @access  Private (Admin only)
router.delete('/:name', auth, async (req, res) => {
  try {
    let page = await Page.findOne({ name: req.params.name });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    page.isActive = false;
    page.lastModified = new Date();
    page.modifiedBy = req.user.id;

    await page.save();
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;