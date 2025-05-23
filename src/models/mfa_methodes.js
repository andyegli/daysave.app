'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MfaMethods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MfaMethods.belongsTo(models.UserProfiles, {
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
    method_type: {
      type: DataTypes.ENUM('totp', 'sms', 'email', 'authenticator_app'),
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  };

  // Log the field definitions for debugging
  console.log('MfaMethods model definition:', JSON.stringify(modelDefinition, null, 2));

  MfaMethods.init(modelDefinition, {
    sequelize,
    modelName: 'MfaMethods',
    tableName: 'mfa_methods',
    timestamps: true,
  });

  return MfaMethods;
};