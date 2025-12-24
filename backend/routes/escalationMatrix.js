const express = require('express');
const router = express.Router();
const EscalationMatrix = require('../models/EscalationMatrix');
const auth = require('../middleware/auth');

// Get all escalation matrix entries (public)
router.get('/', async (req, res) => {
  try {
    const entries = await EscalationMatrix.find({ isActive: true }).sort({ order: 1 });
    res.json({
      success: true,
      data: entries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch escalation matrix',
      error: error.message
    });
  }
});

// Get all entries for admin (including inactive)
router.get('/admin', auth, async (req, res) => {
  try {
    const entries = await EscalationMatrix.find().sort({ order: 1 });
    res.json({
      success: true,
      data: entries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch escalation matrix',
      error: error.message
    });
  }
});

// Create new entry
router.post('/', auth, async (req, res) => {
  try {
    const entry = new EscalationMatrix(req.body);
    await entry.save();
    res.status(201).json({
      success: true,
      data: entry,
      message: 'Escalation matrix entry created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create escalation matrix entry',
      error: error.message
    });
  }
});

// Update entry
router.put('/:id', auth, async (req, res) => {
  try {
    console.log('Update request for ID:', req.params.id);
    console.log('Update data:', req.body);
    
    // Remove MongoDB specific fields
    const { _id, __v, createdAt, updatedAt, ...updateData } = req.body;
    
    const entry = await EscalationMatrix.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Escalation matrix entry not found'
      });
    }
    
    res.json({
      success: true,
      data: entry,
      message: 'Escalation matrix entry updated successfully'
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update escalation matrix entry',
      error: error.message
    });
  }
});

// Delete entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await EscalationMatrix.findByIdAndDelete(req.params.id);
    
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Escalation matrix entry not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Escalation matrix entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete escalation matrix entry',
      error: error.message
    });
  }
});

module.exports = router;