const express = require('express');
const Page = require('../models/Page');
const auth = require('../middleware/auth');
const ContactLead = require('../models/ContactLead');

const router = express.Router();

// GET contact content for public (no auth)
router.get('/public', async (req, res) => {
  try {
    console.log('GET /public - Request received');
    const page = await Page.findOne({ name: 'contact' });
    
    if (!page || !page.contact) {
      console.log('No page or contact data found, returning default');
      const defaultData = {
        hero: {
          title: 'Contact Us',
          subtitle: 'We bring you comprehensive, insightful & up-to-date reports to let you take the right steps towards your financial goals.'
        },
        contactCards: [
          {
            id: 'support',
            icon: 'phone',
            title: 'Customer Support',
            description: 'Our team is dedicated in providing you hassle free experience Mon – Fri (09:00 am – 07:00 pm)',
            contact: 'care@proficientgroup.in',
            type: 'email'
          }
        ],
        tabs: [
          {
            id: 'callback',
            title: 'Request Callback',
            subtitle: 'Have an enquiry? leave your details with us and we\'ll call you back.',
            content: {}
          }
        ]
      };
      return res.json(defaultData);
    }
    
    console.log('Returning public contact data');
    res.json(page.contact);
  } catch (error) {
    console.error('GET public error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET contact content (with auth)
router.get('/content', auth, async (req, res) => {
  try {
    console.log('GET /content - Request received');
    const page = await Page.findOne({ name: 'contact' });
    console.log('Found page:', !!page);
    
    if (!page || !page.contact) {
      console.log('No page or contact data found, returning default');
      const defaultData = {
        hero: {
          title: 'Contact Us',
          subtitle: 'We bring you comprehensive, insightful & up-to-date reports to let you take the right steps towards your financial goals.'
        },
        contactCards: [
          {
            id: 'support',
            icon: 'phone',
            title: 'Customer Support',
            description: 'Our team is dedicated in providing you hassle free experience Mon – Fri (09:00 am – 07:00 pm)',
            contact: 'care@proficientgroup.in',
            type: 'email'
          }
        ],
        tabs: [
          {
            id: 'callback',
            title: 'Request Callback',
            subtitle: 'Have an enquiry? leave your details with us and we\'ll call you back.',
            content: {}
          }
        ]
      };
      return res.json(defaultData);
    }
    
    console.log('Returning contact data');
    res.json(page.contact);
  } catch (error) {
    console.error('GET error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST contact content (with auth)
router.post('/content', auth, async (req, res) => {
  try {
    console.log('POST /content - Request received');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    // Find existing page or create new one
    let page = await Page.findOne({ name: 'contact' });
    
    if (page) {
      // Update existing page
      page.contact = req.body;
      page.lastModified = new Date();
      page.modifiedBy = req.user?.username || 'admin';
    } else {
      // Create new page
      page = new Page({
        name: 'contact',
        contact: req.body,
        lastModified: new Date(),
        modifiedBy: req.user?.username || 'admin',
        isActive: true
      });
    }
    
    await page.save();
    
    console.log('Page saved successfully');
    res.json({ success: true, data: page.contact });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST contact lead (public) - handles all 3 form types
router.post('/lead', async (req, res) => {
  try {
    console.log('Lead submission received:', req.body);
    
    const { formType, name, email, phone, message } = req.body;
    
    // Set default form type if not provided
    const validFormType = ['homepage', 'callback', 'associate', 'partner'].includes(formType) ? formType : 'homepage';
    
    // Create lead data based on form type
    const leadData = {
      name: name || '',
      email: email || '',
      phone: phone || '',
      message: message || '',
      formType: validFormType,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || ''
    };
    
    // Add form-specific fields
    if (validFormType === 'homepage') {
      leadData.investment = req.body.investment || '';
    } else if (validFormType === 'callback') {
      leadData.preferredTime = req.body.preferredTime || 'anytime';
    } else if (validFormType === 'associate') {
      leadData.position = req.body.position || '';
      leadData.experience = req.body.experience || '';
      leadData.cvUrl = req.body.cvUrl || '';
    } else if (validFormType === 'partner') {
      leadData.companyName = req.body.companyName || '';
      leadData.businessType = req.body.businessType || '';
    }
    
    const lead = new ContactLead(leadData);
    await lead.save();
    
    console.log('Lead saved successfully:', lead._id);
    
    // Return success message based on form type
    const messages = {
      homepage: 'Thank you for contacting us! We will get back to you soon.',
      callback: 'Thank you for your callback request! We will contact you within 24 hours.',
      associate: 'Thank you for your application! We will review your profile and get back to you soon.',
      partner: 'Thank you for your partnership inquiry! Our business development team will contact you shortly.'
    };
    
    res.json({ 
      success: true, 
      message: messages[validFormType],
      leadId: lead._id
    });
    
  } catch (error) {
    console.error('Lead save error:', error);
    
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: errorMessages.join(', ') 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit. Please try again.' 
    });
  }
});

// GET all leads (admin only) with enhanced filtering
router.get('/leads', auth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      formType, 
      status, 
      priority,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    const filter = {};
    
    // Apply filters
    if (formType && ['homepage', 'callback', 'associate', 'partner'].includes(formType)) {
      filter.formType = formType;
    }
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    // Search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Sort configuration
    const sortConfig = {};
    sortConfig[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const leads = await ContactLead.find(filter)
      .sort(sortConfig)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-userAgent -ipAddress'); // Exclude sensitive fields

    const total = await ContactLead.countDocuments(filter);
    
    // Get statistics
    const stats = await ContactLead.aggregate([
      {
        $group: {
          _id: '$formType',
          count: { $sum: 1 },
          newCount: {
            $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      leads,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
      stats: stats.reduce((acc, stat) => {
        acc[stat._id] = { total: stat.count, new: stat.newCount };
        return acc;
      }, {})
    });
  } catch (error) {
    console.error('Get leads error:', error);
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