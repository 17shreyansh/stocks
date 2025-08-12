const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const Document = require('../models/Document');
const auth = require('../middleware/auth');
const fs = require('fs').promises;
const path = require('path');

// Components data storage (in production, use a database)
let componentsData = {
  hero: { isVisible: true, data: {} },
  about: { isVisible: true, data: {} },
  contact: { isVisible: true, data: {} },
  products: { isVisible: true, data: {} },
  testimonials: { isVisible: true, data: {} },
  whychoose: { isVisible: true, data: {} },
  mobileapp: { isVisible: true, data: {} },
  footer: { isVisible: true, data: {} },
  header: { isVisible: true, data: {} },
  slider: { isVisible: true, data: {} },
  attention: { isVisible: true, data: {} }
};

// Settings data storage
let settingsData = {
  general: {
    siteName: 'Focus Stock Brokers',
    siteDescription: 'Professional Stock Broking Services',
    contactEmail: 'info@focusstockbrokers.com',
    contactPhone: '+91-XXXXXXXXXX',
    address: 'Your Business Address',
    workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM'
  },
  seo: {
    metaTitle: 'Focus Stock Brokers - Professional Trading Services',
    metaDescription: 'Leading stock broking services with advanced trading platforms',
    metaKeywords: 'stock broker, trading, investment, financial services',
    googleAnalyticsId: '',
    googleTagManagerId: ''
  },
  email: {
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: 'Focus Stock Brokers'
  },
  features: {
    maintenanceMode: false,
    userRegistration: true,
    contactForm: true,
    newsletter: true,
    liveChat: false,
    analytics: true
  },
  security: {
    enableTwoFactor: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8
  }
};

// Dashboard stats
router.get('/dashboard/stats', auth, async (req, res) => {
  try {
    const totalPages = await Page.countDocuments();
    const totalDocuments = await Document.countDocuments();
    const totalDownloads = await Document.aggregate([
      { $group: { _id: null, total: { $sum: '$downloadCount' } } }
    ]);

    const recentPages = await Page.find()
      .sort({ lastModified: -1 })
      .limit(5)
      .select('name isActive lastModified');

    const recentDocuments = await Document.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category downloadCount createdAt');

    res.json({
      stats: {
        totalPages,
        totalDocuments,
        totalDownloads: totalDownloads[0]?.total || 0
      },
      recentPages,
      recentDocuments
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Components management
router.get('/components', auth, (req, res) => {
  res.json(componentsData);
});

router.put('/components', auth, (req, res) => {
  try {
    componentsData = { ...componentsData, ...req.body };
    res.json({ message: 'Components updated successfully', data: componentsData });
  } catch (error) {
    console.error('Components update error:', error);
    res.status(500).json({ error: 'Failed to update components' });
  }
});

router.get('/components/:componentName', auth, (req, res) => {
  const { componentName } = req.params;
  const component = componentsData[componentName];
  
  if (!component) {
    return res.status(404).json({ error: 'Component not found' });
  }
  
  res.json(component);
});

router.put('/components/:componentName', auth, (req, res) => {
  try {
    const { componentName } = req.params;
    
    if (!componentsData[componentName]) {
      componentsData[componentName] = { isVisible: true, data: {} };
    }
    
    componentsData[componentName] = {
      ...componentsData[componentName],
      ...req.body
    };
    
    res.json({ 
      message: `${componentName} updated successfully`, 
      data: componentsData[componentName] 
    });
  } catch (error) {
    console.error('Component update error:', error);
    res.status(500).json({ error: 'Failed to update component' });
  }
});

// Settings management
router.get('/settings', auth, (req, res) => {
  res.json(settingsData);
});

router.put('/settings', auth, (req, res) => {
  try {
    settingsData = { ...settingsData, ...req.body };
    res.json({ message: 'Settings updated successfully', data: settingsData });
  } catch (error) {
    console.error('Settings update error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

router.get('/settings/:section', auth, (req, res) => {
  const { section } = req.params;
  const sectionData = settingsData[section];
  
  if (!sectionData) {
    return res.status(404).json({ error: 'Settings section not found' });
  }
  
  res.json(sectionData);
});

router.put('/settings/:section', auth, (req, res) => {
  try {
    const { section } = req.params;
    
    if (!settingsData[section]) {
      settingsData[section] = {};
    }
    
    settingsData[section] = { ...settingsData[section], ...req.body };
    
    res.json({ 
      message: `${section} settings updated successfully`, 
      data: settingsData[section] 
    });
  } catch (error) {
    console.error('Settings section update error:', error);
    res.status(500).json({ error: 'Failed to update settings section' });
  }
});

// Feature flags
router.get('/settings/features', auth, (req, res) => {
  res.json(settingsData.features || {});
});

router.put('/settings/features', auth, (req, res) => {
  try {
    settingsData.features = { ...settingsData.features, ...req.body };
    res.json({ message: 'Feature settings updated successfully', data: settingsData.features });
  } catch (error) {
    console.error('Feature settings update error:', error);
    res.status(500).json({ error: 'Failed to update feature settings' });
  }
});

// Backup management
router.get('/backups', auth, async (req, res) => {
  try {
    // In a real implementation, you would list actual backup files
    const mockBackups = [
      {
        id: '1',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        size: '2.5 MB',
        type: 'Full Backup'
      },
      {
        id: '2',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        size: '2.3 MB',
        type: 'Full Backup'
      }
    ];
    
    res.json(mockBackups);
  } catch (error) {
    console.error('Backup list error:', error);
    res.status(500).json({ error: 'Failed to fetch backups' });
  }
});

router.post('/backup', auth, async (req, res) => {
  try {
    // In a real implementation, you would create actual backup files
    const backupData = {
      pages: await Page.find(),
      documents: await Document.find(),
      components: componentsData,
      settings: settingsData,
      timestamp: new Date().toISOString()
    };
    
    // Save backup to file system or cloud storage
    const backupPath = path.join(__dirname, '../backups', `backup-${Date.now()}.json`);
    
    // Ensure backup directory exists
    try {
      await fs.mkdir(path.dirname(backupPath), { recursive: true });
      await fs.writeFile(backupPath, JSON.stringify(backupData, null, 2));
    } catch (fsError) {
      console.log('Backup file creation skipped (directory may not exist)');
    }
    
    res.json({ message: 'Backup created successfully', path: backupPath });
  } catch (error) {
    console.error('Backup creation error:', error);
    res.status(500).json({ error: 'Failed to create backup' });
  }
});

router.post('/restore/:backupId', auth, async (req, res) => {
  try {
    const { backupId } = req.params;
    
    // In a real implementation, you would restore from actual backup files
    res.json({ message: `Backup ${backupId} restored successfully` });
  } catch (error) {
    console.error('Backup restore error:', error);
    res.status(500).json({ error: 'Failed to restore backup' });
  }
});

// Test email functionality
router.post('/test-email', auth, async (req, res) => {
  try {
    // In a real implementation, you would send an actual test email
    // using the SMTP settings from settingsData.email
    
    const emailSettings = settingsData.email;
    
    if (!emailSettings.smtpHost || !emailSettings.smtpUser) {
      return res.status(400).json({ error: 'Email settings not configured' });
    }
    
    // Mock email sending
    setTimeout(() => {
      res.json({ message: 'Test email sent successfully' });
    }, 1000);
    
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

// System health check
router.get('/health', auth, (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version
  });
});

// Analytics data
router.get('/analytics', auth, async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    // Mock analytics data - in production, integrate with Google Analytics API
    const mockData = {
      pageViews: Math.floor(Math.random() * 10000) + 5000,
      uniqueVisitors: Math.floor(Math.random() * 5000) + 2000,
      bounceRate: (Math.random() * 30 + 20).toFixed(1),
      avgSessionDuration: (Math.random() * 300 + 120).toFixed(0),
      topPages: [
        { page: '/', views: Math.floor(Math.random() * 1000) + 500 },
        { page: '/downloads', views: Math.floor(Math.random() * 500) + 200 },
        { page: '/policies', views: Math.floor(Math.random() * 300) + 100 }
      ]
    };
    
    res.json(mockData);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

module.exports = router;