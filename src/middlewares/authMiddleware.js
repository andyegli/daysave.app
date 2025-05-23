export default {
  isAuthenticated(req, res, next) {
    console.log('Checking authentication...');
    next(); // For now, always proceed
  },
};