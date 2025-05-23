const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Placeholder controller for content (we'll create this next)
const contentController = require('../controllers/contentController');

// Routes for content management
router.get('/content', authMiddleware.isAuthenticated, contentController.getAllContent);
router.post('/content', authMiddleware.isAuthenticated, contentController.createContent);

module.exports = router;