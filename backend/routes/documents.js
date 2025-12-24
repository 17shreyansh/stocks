const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const Document = require('../models/Document');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/documents');
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow all file types - no restrictions
  cb(null, true);
};

const upload = multer({
  storage: storage,
  // No limits - allow unlimited file size
  fileFilter: fileFilter
});

// @route   GET /api/documents
// @desc    Get all documents
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, sort = 'newest' } = req.query;
    let query = { isActive: true };

    // Filter by category
    if (category && category !== 'All Categories') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    let sortOption = {};
    switch (sort) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'name':
        sortOption = { title: 1 };
        break;
      case 'size':
        sortOption = { fileSize: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const documents = await Document.find(query)
      .sort(sortOption)
      .select('-filePath'); // Don't expose file path for security

    res.json(documents);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/documents/categories
// @desc    Get all document categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Document.distinct('category', { isActive: true });
    res.json(['All Categories', ...categories]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/documents/:id
// @desc    Get document by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document || !document.isActive) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/documents/:id/download
// @desc    Download document
// @access  Public
router.get('/:id/download', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document || !document.isActive) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = path.join(__dirname, '../uploads/documents', document.fileName);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Increment download count
    document.downloadCount += 1;
    await document.save();

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}"`);
    res.setHeader('Content-Type', document.mimeType);

    // Send file
    res.sendFile(filePath);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/documents
// @desc    Upload new document
// @access  Private (Admin only)
router.post('/', [
  auth,
  upload.single('document'),
  body('title').optional(),
  body('description').optional(),
  body('category').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, description, category } = req.body;

    const document = new Document({
      title: title || req.file.originalname.replace('.pdf', ''),
      description: description || '',
      category: category || 'General',
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: req.user.id
    });

    await document.save();
    
    // Return document without file path
    const { filePath, ...documentData } = document.toObject();
    res.status(201).json(documentData);
  } catch (error) {
    // Delete uploaded file if database save fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/documents/:id
// @desc    Update document metadata
// @access  Private (Admin only)
router.put('/:id', [
  auth,
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category } = req.body;

    let document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Update fields
    if (title) document.title = title;
    if (description) document.description = description;
    if (category) document.category = category;

    await document.save();
    
    // Return document without file path
    const { filePath, ...documentData } = document.toObject();
    res.json(documentData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/documents/:id
// @desc    Delete document
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Soft delete
    document.isActive = false;
    await document.save();

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;