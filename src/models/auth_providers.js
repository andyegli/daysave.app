const { v4: uuidv4 } = require('uuid');

/**
 * Auth Providers model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} AuthProviders model
 */
module.exports = (sequelize, DataTypes) => {
  const AuthProviders = sequelize.define('AuthProviders', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    provider: {
      type: DataTypes.ENUM('local', 'google', 'github', 'apple', 'passkey', 'microsoft', 'facebook', 'twitter', 'instagram'),
      allowNull: false,
    },
    provider_user_id: {
      type: DataTypes.STRING(255),
    },
    hashed_password: {
      type: DataTypes.STRING(255),
    },
    passkey_data: {
      type: DataTypes.JSON,
    },
  }, {
    tableName: 'auth_providers',
    timestamps: false,
  });

  AuthProviders.associate = models => {
    AuthProviders.belongsTo(models.UserProfiles, { foreignKey: 'user_profile_id' });
  };

  return AuthProviders;
};