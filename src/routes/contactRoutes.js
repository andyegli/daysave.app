const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const contactController = require('../controllers/contactController');

// Routes for contact management
router.get('/contacts', authMiddleware.isAuthenticated, contactController.getAllContacts);
router.post('/contacts', authMiddleware.isAuthenticated, contactController.createContact);

module.exports = router;