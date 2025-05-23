import express from 'express';
   const router = express.Router();

   // Landing page for guests
   router.get('/', (req, res) => {
     console.log('Rendering landing page');
     res.render('landing');
   });

   // Login page
   router.get('/login', (req, res) => {
     console.log('Rendering login page');
     res.render('auth/login');
   });

   router.post('/login', (req, res) => {
     console.log('Processing login');
     res.redirect('/content');
   });

   // Signup page
   router.get('/signup', (req, res) => {
     console.log('Rendering signup page');
     res.render('auth/signup');
   });

   router.post('/signup', (req, res) => {
     console.log('Processing signup');
     // Placeholder for signup logic
     res.redirect('/content');
   });

   // Terms of Service page
   router.get('/terms', (req, res) => {
     console.log('Rendering terms page');
     res.render('terms');
   });

   // Privacy Policy page
   router.get('/privacy', (req, res) => {
     console.log('Rendering privacy page');
     res.render('privacy');
   });

   // Support & Help page
   router.get('/support', (req, res) => {
     console.log('Rendering support page');
     res.render('support');
   });

   // Logout route
   router.get('/logout', (req, res) => {
     console.log('Processing logout');
     res.redirect('/login');
   });

   export default router;