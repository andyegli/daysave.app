const { v4: uuidv4 } = require('uuid');

/**
 * User Roles model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} UserRoles model
 */
module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define('UserRoles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    tableName: 'user_roles',
    timestamps: false,
  });

  UserRoles.associate = models => {
    UserRoles.belongsTo(models.UserProfiles, { foreignKey: 'user_profile_id' });
    UserRoles.belongsTo(models.Roles, { foreignKey: 'role_id' });
  };

  return UserRoles;
};