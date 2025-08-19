const express = require('express');
const router = express.Router();
const Footer = require('../models/Footer');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pdfs/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Get footer data (public route)
router.get('/', async (req, res) => {
  try {
    let footer = await Footer.findOne({ isActive: true });
    
    if (!footer) {
      // Create default footer if none exists
      footer = new Footer({
        quickLinks: {
          heading: 'Quick Links',
          links: [
            { text: 'Services', href: '#services', type: 'link' },
            { text: 'About Us', href: '#about', type: 'link' },
            { text: 'Mobile App', href: '#app', type: 'link' },
            { text: 'Contact', href: '#contact', type: 'link' }
          ]
        },
        services: {
          heading: 'Services',
          links: [
            { text: 'Stock Trading', href: '#', type: 'link' },
            { text: 'Mutual Funds', href: '#', type: 'link' },
            { text: 'Advisory Services', href: '#', type: 'link' },
            { text: 'IPO Investments', href: '#', type: 'link' }
          ]
        },
        regulatoryInfo: {
          heading: 'Regulatory Information',
          items: [
            { text: 'Proficient Equities Pvt Ltd – SEBI Regn. No : NSE/BSE – INZ000218531', type: 'text' },
            { text: 'NSE(13475) – Equity/Equity Derivative', type: 'text' },
            { text: 'BSE(4025) – Equity/Equity Derivative', type: 'text' },
            { text: 'CDSL SEBI Registration Number Depository Participant : IN-DP-157-2015', type: 'text' }
          ]
        },
        moreLinks: {
          heading: 'More Links',
          investorCharter: {
            heading: 'Investor Charter',
            links: [
              { text: 'Stock Broker', href: '#', type: 'link' },
              { text: 'Depository Participant', href: '#', type: 'link' }
            ]
          },
          otherLinks: [
            { text: 'Risk Disclosure & Disclaimer', href: '#', type: 'link' },
            { text: 'Downloads', href: '/downloads', type: 'link' },
            { text: 'Policies', href: '/policies', type: 'link' }
          ]
        },
        socialLinks: [
          { platform: 'facebook', url: '#' },
          { platform: 'twitter', url: '#' },
          { platform: 'instagram', url: '#' },
          { platform: 'linkedin', url: '#' }
        ],
        legalLinks: [
          { text: 'Privacy Policy', href: '/privacy-policy' },
          { text: 'Disclaimer', href: '/disclaimer' }
        ]
      });
      
      await footer.save();
    }
    
    res.json(footer);
  } catch (error) {
    console.error('Footer fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch footer data' });
  }
});

// Admin routes (protected)
router.get('/admin', async (req, res) => {
  try {
    const footer = await Footer.findOne({ isActive: true });
    res.json(footer || {});
  } catch (error) {
    console.error('Admin footer fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch footer data' });
  }
});

router.put('/admin', async (req, res) => {
  try {
    let footer = await Footer.findOne({ isActive: true });
    
    if (!footer) {
      footer = new Footer(req.body);
    } else {
      Object.assign(footer, req.body);
    }
    
    footer.lastModified = new Date();
    footer.modifiedBy = req.user?.username || 'admin';
    
    await footer.save();
    
    res.json({ message: 'Footer updated successfully', data: footer });
  } catch (error) {
    console.error('Footer update error:', error);
    res.status(500).json({ error: 'Failed to update footer' });
  }
});

// Upload PDF for footer links
router.post('/admin/upload-pdf', auth, upload.single('pdf'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    
    const fileUrl = `/uploads/pdfs/${req.file.filename}`;
    res.json({ 
      message: 'PDF uploaded successfully', 
      fileUrl,
      originalName: req.file.originalname
    });
  } catch (error) {
    console.error('PDF upload error:', error);
    res.status(500).json({ error: 'Failed to upload PDF' });
  }
});

// Add quick link
router.post('/admin/quick-links', auth, async (req, res) => {
  try {
    const footer = await Footer.findOne({ isActive: true });
    if (!footer) {
      return res.status(404).json({ error: 'Footer not found' });
    }
    
    footer.quickLinks.links.push(req.body);
    footer.lastModified = new Date();
    footer.modifiedBy = req.user?.username || 'admin';
    
    await footer.save();
    res.json({ message: 'Quick link added successfully', data: footer.quickLinks });
  } catch (error) {
    console.error('Add quick link error:', error);
    res.status(500).json({ error: 'Failed to add quick link' });
  }
});

// Update quick link
router.put('/admin/quick-links/:index', auth, async (req, res) => {
  try {
    const footer = await Footer.findOne({ isActive: true });
    if (!footer) {
      return res.status(404).json({ error: 'Footer not found' });
    }
    
    const index = parseInt(req.params.index);
    if (index >= 0 && index < footer.quickLinks.links.length) {
      footer.quickLinks.links[index] = { ...footer.quickLinks.links[index], ...req.body };
      footer.lastModified = new Date();
      footer.modifiedBy = req.user?.username || 'admin';
      
      await footer.save();
      res.json({ message: 'Quick link updated successfully', data: footer.quickLinks });
    } else {
      res.status(400).json({ error: 'Invalid link index' });
    }
  } catch (error) {
    console.error('Update quick link error:', error);
    res.status(500).json({ error: 'Failed to update quick link' });
  }
});

// Delete quick link
router.delete('/admin/quick-links/:index', auth, async (req, res) => {
  try {
    const footer = await Footer.findOne({ isActive: true });
    if (!footer) {
      return res.status(404).json({ error: 'Footer not found' });
    }
    
    const index = parseInt(req.params.index);
    if (index >= 0 && index < footer.quickLinks.links.length) {
      footer.quickLinks.links.splice(index, 1);
      footer.lastModified = new Date();
      footer.modifiedBy = req.user?.username || 'admin';
      
      await footer.save();
      res.json({ message: 'Quick link deleted successfully', data: footer.quickLinks });
    } else {
      res.status(400).json({ error: 'Invalid link index' });
    }
  } catch (error) {
    console.error('Delete quick link error:', error);
    res.status(500).json({ error: 'Failed to delete quick link' });
  }
});

// Similar routes for regulatory info
router.post('/admin/regulatory-info', auth, async (req, res) => {
  try {
    const footer = await Footer.findOne({ isActive: true });
    if (!footer) {
      return res.status(404).json({ error: 'Footer not found' });
    }
    
    footer.regulatoryInfo.items.push(req.body);
    footer.lastModified = new Date();
    footer.modifiedBy = req.user?.username || 'admin';
    
    await footer.save();
    res.json({ message: 'Regulatory info added successfully', data: footer.regulatoryInfo });
  } catch (error) {
    console.error('Add regulatory info error:', error);
    res.status(500).json({ error: 'Failed to add regulatory info' });
  }
});

router.put('/admin/regulatory-info/:index', auth, async (req, res) => {
  try {
    const footer = await Footer.findOne({ isActive: true });
    if (!footer) {
      return res.status(404).json({ error: 'Footer not found' });
    }
    
    const index = parseInt(req.params.index);
    if (index >= 0 && index < footer.regulatoryInfo.items.length) {
      footer.regulatoryInfo.items[index] = { ...footer.regulatoryInfo.items[index], ...req.body };
      footer.lastModified = new Date();
      footer.modifiedBy = req.user?.username || 'admin';
      
      await footer.save();
      res.json({ message: 'Regulatory info updated successfully', data: footer.regulatoryInfo });
    } else {
      res.status(400).json({ error: 'Invalid item index' });
    }
  } catch (error) {
    console.error('Update regulatory info error:', error);
    res.status(500).json({ error: 'Failed to update regulatory info' });
  }
});

router.delete('/admin/regulatory-info/:index', auth, async (req, res) => {
  try {
    const footer = await Footer.findOne({ isActive: true });
    if (!footer) {
      return res.status(404).json({ error: 'Footer not found' });
    }
    
    const index = parseInt(req.params.index);
    if (index >= 0 && index < footer.regulatoryInfo.items.length) {
      footer.regulatoryInfo.items.splice(index, 1);
      footer.lastModified = new Date();
      footer.modifiedBy = req.user?.username || 'admin';
      
      await footer.save();
      res.json({ message: 'Regulatory info deleted successfully', data: footer.regulatoryInfo });
    } else {
      res.status(400).json({ error: 'Invalid item index' });
    }
  } catch (error) {
    console.error('Delete regulatory info error:', error);
    res.status(500).json({ error: 'Failed to delete regulatory info' });
  }
});

module.exports = router;