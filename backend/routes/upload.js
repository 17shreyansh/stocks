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
  // No limits - allow unlimited file size and all file types
  fileFilter: (req, file, cb) => {
    // Allow all file types - no restrictions
    cb(null, true);
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
  // No limits - allow unlimited file size
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

// Upload endpoint for documents (multiple file types)
router.post('/document', (req, res) => {
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
          message: 'Please select a file to upload'
        });
      }

      // File type validation is handled by multer fileFilter
      console.log('File uploaded successfully:', req.file.filename);

      // Generate consistent URL using API endpoint
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      const fileUrl = `${baseUrl}/api/upload/documents/${req.file.filename}`;

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
    
    console.log('PDF Download Request:', {
      filename,
      filePath,
      exists: fs.existsSync(filePath),
      userAgent: req.get('User-Agent'),
      referer: req.get('Referer')
    });
    
    // Security check - prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      console.log('Invalid filename detected:', filename);
      return res.status(400).json({ error: 'Invalid filename' });
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      return res.status(404).json({ error: 'File not found', path: filePath });
    }
    
    // Get file stats
    const stats = fs.statSync(filePath);
    console.log('File stats:', { size: stats.size, modified: stats.mtime });
    
    // Set appropriate headers based on file extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';
    
    // Common document types
    if (ext === '.pdf') {
      contentType = 'application/pdf';
      // For PDFs, allow inline viewing in browser
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    }
    else if (ext === '.doc') contentType = 'application/msword';
    else if (ext === '.docx') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    else if (ext === '.xls') contentType = 'application/vnd.ms-excel';
    else if (ext === '.xlsx') contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    else if (ext === '.ppt') contentType = 'application/vnd.ms-powerpoint';
    else if (ext === '.pptx') contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    
    // Archive types
    else if (ext === '.zip') contentType = 'application/zip';
    else if (ext === '.rar') contentType = 'application/vnd.rar';
    else if (ext === '.7z') contentType = 'application/x-7z-compressed';
    else if (ext === '.tar') contentType = 'application/x-tar';
    else if (ext === '.gz') contentType = 'application/gzip';
    
    // Text types
    else if (ext === '.txt') contentType = 'text/plain';
    else if (ext === '.csv') contentType = 'text/csv';
    else if (ext === '.json') contentType = 'application/json';
    else if (ext === '.xml') contentType = 'application/xml';
    
    // Image types
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    
    // Video types
    else if (ext === '.mp4') contentType = 'video/mp4';
    else if (ext === '.avi') contentType = 'video/x-msvideo';
    else if (ext === '.mov') contentType = 'video/quicktime';
    else if (ext === '.wmv') contentType = 'video/x-ms-wmv';
    
    // Audio types
    else if (ext === '.mp3') contentType = 'audio/mpeg';
    else if (ext === '.wav') contentType = 'audio/wav';
    else if (ext === '.ogg') contentType = 'audio/ogg';
    
    // Other common types
    else if (ext === '.exe') contentType = 'application/x-msdownload';
    else if (ext === '.dmg') contentType = 'application/x-apple-diskimage';
    else if (ext === '.iso') contentType = 'application/x-iso9660-image';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    
    // For non-PDF files, force download
    if (ext !== '.pdf') {
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    }
    
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    console.log('Serving file with headers:', {
      contentType,
      contentLength: stats.size,
      disposition: res.getHeader('Content-Disposition')
    });
    
    // Send file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Error serving file' });
        }
      } else {
        console.log('File sent successfully:', filename);
      }
    });
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

// Legacy PDF endpoint for backward compatibility
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
          message: 'Please select a file to upload'
        });
      }

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

// Debug endpoint to check upload configuration
router.get('/debug/config', (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads/documents');
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    
    const config = {
      uploadsDirectory: uploadsDir,
      uploadsExists: fs.existsSync(uploadsDir),
      baseUrl: baseUrl,
      samplePdfUrl: `${baseUrl}/api/upload/documents/sample.pdf`,
      staticServing: {
        enabled: 'Check server.js for /uploads static middleware',
        path: '/uploads'
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        BASE_URL: process.env.BASE_URL
      }
    };
    
    // List some PDF files
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir)
        .filter(file => file.endsWith('.pdf'))
        .slice(0, 5)
        .map(file => ({
          filename: file,
          size: fs.statSync(path.join(uploadsDir, file)).size,
          downloadUrl: `${baseUrl}/api/upload/documents/${file}`,
          staticUrl: `${baseUrl}/uploads/documents/${file}`
        }));
      config.sampleFiles = files;
    }
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;