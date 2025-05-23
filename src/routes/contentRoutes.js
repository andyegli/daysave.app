import express from 'express';
import contentController from '../controllers/contentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/content', authMiddleware.isAuthenticated, contentController.getAllContent);
router.get('/content/create', authMiddleware.isAuthenticated, contentController.createContent);
router.post('/content', authMiddleware.isAuthenticated, contentController.postContent);
router.get('/content/:id', authMiddleware.isAuthenticated, contentController.getContent);
router.get('/content/:id/edit', authMiddleware.isAuthenticated, contentController.editContent);
router.post('/content/:id', authMiddleware.isAuthenticated, contentController.updateContent);
router.post('/content/:id/delete', authMiddleware.isAuthenticated, contentController.deleteContent);

export default router;