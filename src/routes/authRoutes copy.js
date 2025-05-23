const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const AuthMiddleware = require('../middlewares/authMiddleware');

/**
 * Authentication routes for daysave.app v1.0.1
 */
router.get('/login', (req, res) => res.render('login'));
router.post('/login', AuthController.login);
router.get('/register', (req, res) => res.render('register'));
router.post('/register', AuthController.register);
router.get('/logout', (req, res) => { req.logout(); res.redirect('/login'); });
router.get('/oauth/:provider', passport.authenticate(':provider'));
router.get('/oauth/:provider/callback', passport.authenticate(':provider', { successRedirect: '/dashboard', failureRedirect: '/login' }));
router.get('/2fa/setup', AuthMiddleware.isAuthenticated, (req, res) => res.render('2fa-setup'));
router.post('/2fa/setup', AuthMiddleware.isAuthenticated, AuthController.setup2FA);
router.post('/2fa/verify', AuthMiddleware.isAuthenticated, AuthController.verify2FA);
router.get('/reset-password', (req, res) => res.render('reset-password'));
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;