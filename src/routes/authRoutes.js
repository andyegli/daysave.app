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
     res.render('auth/login', { error: req.session.loginError });
     req.session.loginError = null; // Clear error after displaying
   });

   router.post('/login', async (req, res) => {
     console.log('Processing login');
     const { username, password } = req.body;

     try {
       const db = (await import('../models/index.js')).default;
       const user = await db.UserProfiles.findOne({ where: { username } });

       if (!user) {
         req.session.loginError = 'Invalid username or password';
         return res.redirect('/login');
       }

       const authProvider = await db.AuthProviders.findOne({
         where: {
           user_profile_id: user.userId,
           provider: 'local'
         }
       });

       if (!authProvider || authProvider.hashed_password !== password) {
         req.session.loginError = 'Invalid username or password';
         return res.redirect('/login');
       }

       // Successful login: store user ID in session
       req.session.userId = user.userId;
       res.redirect('/content');
     } catch (error) {
       console.error('Error during login:', error);
       req.session.loginError = 'An error occurred. Please try again.';
       res.redirect('/login');
     }
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
     req.session.destroy();
     res.redirect('/login');
   });

   export default router;