const { v4: uuidv4 } = require('uuid');

/**
 * Permissions model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} Permissions model
 */
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
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
    description: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'permissions',
    timestamps: false,
  });

  Permissions.associate = models => {
    Permissions.hasMany(models.RolePermissions, { foreignKey: 'permission_id' });
  };

  return Permissions;
};