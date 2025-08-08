import express from 'express';
import {
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  addNote
} from '../controllers/contactController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateContact } from '../middleware/validation.js';

const router = express.Router();

// Public route
router.post('/', validateContact, createContact);

// Protected routes
router.use(authenticate);

router.get('/', authorize('admin', 'editor'), getAllContacts);
router.get('/:id', authorize('admin', 'editor'), getContact);
router.put('/:id', authorize('admin', 'editor'), updateContact);
router.post('/:id/notes', authorize('admin', 'editor'), addNote);

export default router;