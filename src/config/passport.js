const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AzureADStrategy = require('passport-azure-ad').OIDCStrategy;
const GitHubStrategy = require('passport-github2').Strategy;
const AppleStrategy = require('passport-appleid').Strategy;
const TwitterStrategy = require('passport-twitter-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { UserProfiles, AuthProviders } = require('../models');
const bcrypt = require('bcryptjs');
require('dotenv').config();

/**
 * Configure Passport.js for daysave.app v1.0.1 authentication
 */
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await UserProfiles.findOne({ where: { email } });
      if (!user) return done(null, false);
      const provider = await AuthProviders.findOne({ where: { user_profile_id: user.id, provider: 'local' } });
      if (!provider || !bcrypt.compareSync(password, provider.hashed_password)) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const [user] = await UserProfiles.findOrCreate({ where: { email: profile.emails[0].value }, defaults: { display_name: profile.displayName } });
    await AuthProviders.findOrCreate({ where: { user_profile_id: user.id, provider: 'google', provider_user_id: profile.id } });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Placeholder for other OAuth strategies (Microsoft, GitHub, Apple, Twitter, Facebook, Instagram)...

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await UserProfiles.findByPk(id);
  done(null, user);
});

module.exports = passport;