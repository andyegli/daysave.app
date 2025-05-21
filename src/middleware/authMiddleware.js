const { UserRoles, Roles, Permissions, RolePermissions } = require('../models');

/**
 * Authentication middleware for daysave.app v1.0.1
 */
class AuthMiddleware {
  static isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }

  static async checkPermission(permissionName) {
    return async (req, res, next) => {
      if (!req.user) return res.status(401).send('Unauthorized');
      const role = await UserRoles.findOne({ where: { user_profile_id: req.user.id } });
      const permission = await Permissions.findOne({ where: { name: permissionName } });
      const hasPermission = await RolePermissions.findOne({ where: { role_id: role.role_id, permission_id: permission.id } });
      if (!hasPermission) return res.status(403).send('Forbidden');
      next();
    };
  }
}

module.exports = AuthMiddleware;