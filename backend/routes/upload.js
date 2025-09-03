const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const router = express.Router();

// Middleware to ensure upload directories exist
router.use((req, res, next) => {
  const documentsDir = path.join(__dirname, '../uploads/documents');
  const imagesDir = path.join(__dirname, '../uploads/images');
  if (!fs.existsSync(documentsDir)) {
    fs.mkdirSync(documentsDir, { recursive: true });
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  next();
});

// Simple upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/documents');
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'doc-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  }
});

// Image upload configuration for Editor.js
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/images');
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'), false);
    }
  }
});

// Image upload endpoint for Editor.js
router.post('/image', (req, res) => {
  imageUpload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Image upload error:', err);
      return res.status(400).json({ 
        success: 0,
        message: err.message
      });
    }
    
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: 0,
          message: 'No image uploaded'
        });
      }

      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      const fileUrl = `${baseUrl}/uploads/images/${req.file.filename}`;

      // Editor.js expects this specific response format
      res.json({
        success: 1,
        file: {
          url: fileUrl,
          name: req.file.originalname,
          size: req.file.size
        }
      });
    } catch (error) {
      console.error('Image upload error:', error);
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (cleanupError) {
          console.error('File cleanup error:', cleanupError);
        }
      }
      res.status(500).json({ 
        success: 0,
        message: 'Image upload failed'
      });
    }
  });
});

// Upload endpoint with better error handling
router.post('/pdf', (req, res) => {
  upload.single('document')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ 
        success: false,
        error: err.message,
        message: 'File upload failed'
      });
    }
    
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false,
          error: 'No file uploaded',
          message: 'Please select a PDF file to upload'
        });
      }

    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      fs.unlinkSync(req.file.path); // Clean up uploaded file
      return res.status(400).json({ 
        success: false,
        error: 'Invalid file type',
        message: 'Only PDF files are allowed'
      });
    }

    // Generate secure URL
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/documents/${req.file.filename}`;

    res.json({
      success: true,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      url: fileUrl,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    // Clean up file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('File cleanup error:', cleanupError);
      }
    }
    res.status(500).json({ 
      success: false,
      error: 'Upload failed',
      message: 'An error occurred while uploading the file'
    });
    }
  });
});

// Serve uploaded files securely
router.get('/documents/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads/documents', filename);
    
    // Security check - prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    // Send file
    res.sendFile(filePath);
  } catch (error) {
    console.error('File serve error:', error);
    res.status(500).json({ error: 'Error serving file' });
  }
});

// Serve uploaded images
router.get('/images/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads/images', filename);
    
    // Security check - prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Set appropriate headers for images
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    // Send file
    res.sendFile(filePath);
  } catch (error) {
    console.error('Image serve error:', error);
    res.status(500).json({ error: 'Error serving image' });
  }
});

// URL fetching endpoint for LinkTool
router.post('/fetch-url', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({
        success: 0,
        message: 'URL is required'
      });
    }

    // Simple URL validation
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        success: 0,
        message: 'Invalid URL format'
      });
    }

    // For now, return basic meta info
    res.json({
      success: 1,
      meta: {
        title: 'Link',
        description: 'External link',
        image: {
          url: ''
        }
      }
    });
  } catch (error) {
    console.error('URL fetch error:', error);
    res.status(500).json({
      success: 0,
      message: 'Failed to fetch URL data'
    });
  }
});

module.exports = router;