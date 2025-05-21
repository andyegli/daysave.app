const { UserProfiles, AuthProviders, UserRoles, Roles, MFAMethods } = require('../models');
const bcrypt = require('bcryptjs');
const passport = require('passport');

/**
 * Authentication controller for daysave.app v1.0.1
 */
class AuthController {
  static async register(req, res) {
    const { email, password, display_name } = req.body;
    try {
      const [user] = await UserProfiles.findOrCreate({ where: { email }, defaults: { display_name } });
      const hashedPassword = bcrypt.hashSync(password, 10);
      await AuthProviders.create({ user_profile_id: user.id, provider: 'local', hashed_password: hashedPassword });
      const role = (await UserProfiles.count()) === 1 ? await Roles.findOne({ where: { name: 'super_admin' } }) : await Roles.findOne({ where: { name: 'trial_member' }});
      await UserRoles.create({ user_profile_id: user.id, role_id: role.id });
      res.redirect('/dashboard');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static login(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err || !user) return res.status(401).send('Invalid credentials');
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect('/dashboard');
      });
    })(req, res, next);
  }

  static async setup2FA(req, res) {
    const { type, config } = req.body;
    await MFAMethods.create({ user_profile_id: req.user.id, type, config, is_primary: true });
    res.send('2FA setup successful');
  }

  static async verify2FA(req, res) {
    const { code } = req.body;
    const mfa = await MFAMethods.findOne({ where: { user_profile_id: req.user.id, is_primary: true } });
    // Placeholder for TOTP/SMS/email verification
    res.send('2FA verified');
  }

  static async resetPassword(req, res) {
    const { email, code, newPassword } = req.body;
    const user = await UserProfiles.findOne({ where: { email } });
    const mfa = await MFAMethods.findOne({ where: { user_profile_id: user.id } });
    // Placeholder for 2FA verification and password update
    res.send('Password reset successful');
  }
}

module.exports = AuthController;