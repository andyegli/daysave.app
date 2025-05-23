export default {
  isAuthenticated(req, res, next) {
    console.log('Checking authentication...');
    // Placeholder for authentication check
    const isAuthenticated = false; // Replace with real authentication logic
    const publicRoutes = ['/', '/signup', '/terms', '/privacy', '/support', '/login'];

    if (publicRoutes.includes(req.path)) {
      return next();
    }

    if (!isAuthenticated) {
      return res.redirect('/login');
    }

    next();
  },
};