const { v4: uuidv4 } = require('uuid');

/**
 * Role Permissions model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} RolePermissions model
 */
module.exports = (sequelize, DataTypes) => {
  const RolePermissions = sequelize.define('RolePermissions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    tableName: 'role_permissions',
    timestamps: false,
  });

  RolePermissions.associate = models => {
    RolePermissions.belongsTo(models.Roles, { foreignKey: 'role_id' });
    RolePermissions.belongsTo(models.Permissions, { foreignKey: 'permission_id' });
  };

  return RolePermissions;
};