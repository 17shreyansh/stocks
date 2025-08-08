import express from 'express';
import {
  getPageContent,
  getAllContent,
  createContent,
  updateContent,
  deleteContent,
  reorderContent
} from '../controllers/contentController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateContent } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/page/:page', getPageContent);

// Protected routes
router.use(authenticate);

router.get('/', getAllContent);
router.post('/', authorize('admin', 'editor'), validateContent, createContent);
router.put('/:id', authorize('admin', 'editor'), validateContent, updateContent);
router.delete('/:id', authorize('admin'), deleteContent);
router.post('/reorder', authorize('admin', 'editor'), reorderContent);

export default router;