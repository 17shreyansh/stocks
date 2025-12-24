const Document = require('../models/Document');
const Page = require('../models/Page');
const WhyChooseUs = require('../models/WhyChooseUs');
const path = require('path');
const fs = require('fs-extra');

// Get all documents with stats for admin
exports.getDocuments = async (req, res) => {
    try {
        const { category, search, sort = 'newest', page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        
        let query = {};
        
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
        
        // Get total count for pagination
        const total = await Document.countDocuments(query);
        
        // Sorting
        let sortOption = {};
        switch (sort) {
            case 'newest':
                sortOption = { createdAt: -1 };
                break;
            case 'oldest':
                sortOption = { createdAt: 1 };
                break;
            case 'mostDownloaded':
                sortOption = { downloadCount: -1 };
                break;
            case 'name':
                sortOption = { title: 1 };
                break;
            default:
                sortOption = { createdAt: -1 };
        }
        
        const documents = await Document.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit))
            .select('title category description downloadCount createdAt lastUpdated fileSize isActive');
            
        // Get download stats
        const totalDownloads = await Document.aggregate([
            { $group: { _id: null, total: { $sum: '$downloadCount' } } }
        ]);
        
        res.json({
            documents,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page: parseInt(page),
                limit: parseInt(limit)
            },
            stats: {
                totalDocuments: total,
                totalDownloads: totalDownloads[0]?.total || 0
            }
        });
    } catch (error) {
        console.error('Admin get documents error:', error);
        res.status(500).json({ message: 'Error fetching documents' });
    }
};

// Get document details for admin
exports.getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(document);
    } catch (error) {
        console.error('Admin get document error:', error);
        res.status(500).json({ message: 'Error fetching document' });
    }
};

// Update document status (active/inactive)
exports.updateDocumentStatus = async (req, res) => {
    try {
        const { isActive } = req.body;
        const document = await Document.findByIdAndUpdate(
            req.params.id,
            { isActive },
            { new: true }
        );
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(document);
    } catch (error) {
        console.error('Admin update document status error:', error);
        res.status(500).json({ message: 'Error updating document status' });
    }
};

// Delete document
exports.deleteDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        
        // Delete file from storage
        if (document.fileName) {
            const filePath = path.join(__dirname, '../uploads/documents', document.fileName);
            await fs.unlink(filePath).catch(err => console.error('File delete error:', err));
        }
        
        await document.remove();
        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Admin delete document error:', error);
        res.status(500).json({ message: 'Error deleting document' });
    }
};

// Get policies page data for admin
exports.getPolicies = async (req, res) => {
    try {
        const page = await Page.findOne({ name: 'policies' });
        if (!page) {
            return res.status(404).json({ message: 'Policies page not found' });
        }
        res.json(page);
    } catch (error) {
        console.error('Admin get policies error:', error);
        res.status(500).json({ message: 'Error fetching policies' });
    }
};

// Update policies page data
exports.updatePolicies = async (req, res) => {
    try {
        const { content } = req.body;
        let page = await Page.findOne({ name: 'policies' });
        
        if (page) {
            page.content = content;
            page.lastModified = new Date();
            await page.save();
        } else {
            page = new Page({
                name: 'policies',
                content,
                isActive: true
            });
            await page.save();
        }
        
        res.json(page);
    } catch (error) {
        console.error('Admin update policies error:', error);
        res.status(500).json({ message: 'Error updating policies' });
    }
};

// Get WhyChooseUs data for admin
exports.getWhyChooseUs = async (req, res) => {
    try {
        const { pageName } = req.params;
        const data = await WhyChooseUs.findOne({ pageName: pageName || 'homepage', isActive: true });
        res.json({ success: true, data });
    } catch (error) {
        console.error('Admin get WhyChooseUs error:', error);
        res.status(500).json({ success: false, message: 'Error fetching WhyChooseUs data' });
    }
};

// Update WhyChooseUs data
exports.updateWhyChooseUs = async (req, res) => {
    try {
        const { pageName } = req.params;
        const updateData = { ...req.body, pageName: pageName || 'homepage' };
        
        const data = await WhyChooseUs.findOneAndUpdate(
            { pageName: pageName || 'homepage' },
            updateData,
            { upsert: true, new: true }
        );
        
        res.json({ success: true, data, message: 'WhyChooseUs updated successfully' });
    } catch (error) {
        console.error('Admin update WhyChooseUs error:', error);
        res.status(500).json({ success: false, message: 'Error updating WhyChooseUs data' });
    }
};
