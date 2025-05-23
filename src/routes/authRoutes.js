import express from 'express';
import { v4 as uuidv4 } from 'uuid';
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

    console.log('User found:', user ? user.dataValues : 'No user found');

    if (!user) {
      req.session.loginError = 'Invalid username or password';
      console.log('Session error set:', req.session.loginError);
      return res.redirect('/login');
    }

    const authProvider = await db.AuthProviders.findOne({
      where: {
        user_profile_id: user.userId,
        provider: 'local'
      }
    });

    console.log('AuthProvider found:', authProvider ? authProvider.dataValues : 'No auth provider found');

    if (!authProvider || authProvider.hashed_password !== password) {
      req.session.loginError = 'Invalid username or password';
      console.log('Session error set:', req.session.loginError);
      return res.redirect('/login');
    }

    // Successful login: store user ID in session
    req.session.userId = user.userId;
    console.log('Session userId set:', req.session.userId);
    res.redirect('/content');
  } catch (error) {
    console.error('Error during login:', error);
    req.session.loginError = 'An error occurred. Please try again.';
    console.log('Session error set:', req.session.loginError);
    res.redirect('/login');
  }
});

// Signup page
router.get('/signup', (req, res) => {
  console.log('Rendering signup page');
  res.render('auth/signup', { error: req.session.signupError });
  req.session.signupError = null; // Clear error after displaying
});

router.post('/signup', async (req, res) => {
  console.log('Processing signup');
  const { username, email, password } = req.body;

  try {
    const db = (await import('../models/index.js')).default;

    console.log('Checking for existing user with username:', username, 'or email:', email);
    const existingUser = await db.UserProfiles.findOne({
      where: {
        [db.Sequelize.Op.or]: [{ username }, { email }]
      }
    });

    console.log('Existing user check result:', existingUser ? existingUser.dataValues : 'No existing user found');

    if (existingUser) {
      req.session.signupError = 'Username or email already exists';
      console.log('Signup error set:', req.session.signupError);
      return res.redirect('/signup');
    }

    console.log('Creating new user with username:', username, 'email:', email);
    const user = await db.UserProfiles.create({
      userId: uuidv4(),
      username,
      email
    });

    console.log('New user created:', user.dataValues);

    console.log('Creating AuthProviders entry for userId:', user.userId);
    const authProvider = await db.AuthProviders.create({
      id: uuidv4(),
      user_profile_id: user.userId,
      provider: 'local',
      hashed_password: password
    });

    console.log('AuthProvider created for new user:', authProvider.dataValues);

    // Store user ID in session
    req.session.userId = user.userId;
    console.log('Session userId set:', req.session.userId);

    // Verify session data
    console.log('Session after signup:', req.session);

    res.redirect('/content');
  } catch (error) {
    console.error('Error during signup:', error);
    req.session.signupError = 'An error occurred. Please try again.';
    console.log('Signup error set:', req.session.signupError);
    res.redirect('/signup');
  }
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