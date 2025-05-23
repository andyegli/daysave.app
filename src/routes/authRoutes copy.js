import express from 'express';
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', (req, res) => {
  res.redirect('/content');
});

router.get('/logout', (req, res) => {
  res.redirect('/login');
});

export default router;