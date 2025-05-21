const { v4: uuidv4 } = require('uuid');

/**
 * Roles model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} Roles model
 */
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'roles',
    timestamps: false,
  });

  Roles.associate = models => {
    Roles.hasMany(models.UserRoles, { foreignKey: 'role_id' });
    Roles.hasMany(models.RolePermissions, { foreignKey: 'role_id' });
  };

  return Roles;
};