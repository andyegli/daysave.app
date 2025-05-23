'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuthProviders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AuthProviders.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user_profiles',
        key: 'userId',
      },
    },
    provider: {
      type: DataTypes.ENUM('local', 'google', 'github', 'apple', 'passkey', 'microsoft', 'facebook', 'twitter', 'instagram'),
      allowNull: false,
    },
    provider_user_id: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    passkey_data: DataTypes.JSON,
  };

  // Log the field definitions for debugging
  console.log('AuthProviders model definition:', JSON.stringify(modelDefinition, null, 2));

  AuthProviders.init(modelDefinition, {
    sequelize,
    modelName: 'AuthProviders',
    tableName: 'auth_providers',
    timestamps: false,
  });

  return AuthProviders;
};