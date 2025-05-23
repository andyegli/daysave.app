export default {
     isAuthenticated(req, res, next) {
       console.log('Checking authentication...');
       const publicRoutes = ['/', '/signup', '/terms', '/privacy', '/support', '/login'];

       if (publicRoutes.includes(req.path)) {
         return next();
       }

       if (!req.session.userId) {
         return res.redirect('/login');
       }

       next();
     },
   };