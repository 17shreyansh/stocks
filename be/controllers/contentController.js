import Content from '../models/Content.js';

export const getPageContent = async (req, res) => {
  try {
    const { page } = req.params;
    const content = await Content.find({ 
      page, 
      'metadata.isActive': true 
    }).sort({ 'metadata.order': 1 });
    
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllContent = async (req, res) => {
  try {
    const { page, section, type } = req.query;
    const filter = {};
    
    if (page) filter.page = page;
    if (section) filter.section = section;
    if (type) filter.type = type;
    
    const content = await Content.find(filter).sort({ 
      page: 1, 
      section: 1, 
      'metadata.order': 1 
    });
    
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createContent = async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json({ success: true, data: content });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndDelete(id);
    
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    
    res.json({ success: true, message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderContent = async (req, res) => {
  try {
    const { items } = req.body;
    
    const updatePromises = items.map(item => 
      Content.findByIdAndUpdate(item.id, { 'metadata.order': item.order })
    );
    
    await Promise.all(updatePromises);
    res.json({ success: true, message: 'Content reordered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};