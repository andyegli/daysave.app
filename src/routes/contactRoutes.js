import express from 'express';
import contactController from '../controllers/contactController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/contact', authMiddleware.isAuthenticated, contactController.getAllContacts);
router.get('/contact/create', authMiddleware.isAuthenticated, contactController.createContact);
router.post('/contact', authMiddleware.isAuthenticated, contactController.postContact);
router.get('/contact/:id', authMiddleware.isAuthenticated, contactController.getContact);
router.get('/contact/:id/edit', authMiddleware.isAuthenticated, contactController.editContact);
router.post('/contact/:id', authMiddleware.isAuthenticated, contactController.updateContact);
router.post('/contact/:id/delete', authMiddleware.isAuthenticated, contactController.deleteContact);

export default router;