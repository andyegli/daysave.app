// Content Routes for daysave.app v1.0.1
// This file defines the routes for content-related operations in the application.
// It includes routes for getting, creating, updating, deleting content,
// performing batch actions, and adding comments and tags to content.
// The routes are protected by authentication middleware to ensure that only
// authenticated users can access them.
// The routes are defined using Express.js and are exported for use in the main application.
// Import necessary modules and dependencies    
const express = require('express');
const router = express.Router();
const ContentController = require('../controllers/contentController');
const AuthMiddleware = require('../middlewares/authMiddleware');

/**
 * Content routes for daysave.app v1.0.1
 */
router.get('/content', AuthMiddleware.isAuthenticated, ContentController.getContent);
router.post('/content', AuthMiddleware.isAuthenticated, ContentController.createContent);
router.put('/content/:id', AuthMiddleware.isAuthenticated, ContentController.updateContent);
router.delete('/content/:id', AuthMiddleware.isAuthenticated, ContentController.deleteContent);
router.post('/content/batch', AuthMiddleware.isAuthenticated, ContentController.batchAction);
router.post('/content/:id/comment', AuthMiddleware.isAuthenticated, ContentController.addComment);
router.post('/content/:id/tag', AuthMiddleware.isAuthenticated, ContentController.addTag);
router.post('/content/:id/share', AuthMiddleware.isAuthenticated, ContentController.batchAction);

module.exports = router;