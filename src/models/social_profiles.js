'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SocialProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.UserProfiles) {
        SocialProfiles.belongsTo(models.UserProfiles, {
          foreignKey: 'user_profile_id',
          as: 'userProfile',
        });
      } else {
        console.warn('UserProfiles model not found during SocialProfiles association setup');
      }

      if (models.SocialProviders) {
        SocialProfiles.belongsTo(models.SocialProviders, {
          foreignKey: 'provider_id',
          as: 'provider',
        });
      } else {
        console.warn('SocialProviders model not found during SocialProfiles association setup');
      }
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
    provider_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'social_providers',
        key: 'id',
      },
    },
    provider_user_id: {
      type: DataTypes.STRING,
      allowNull: false,
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
  console.log('SocialProfiles model definition:', JSON.stringify(modelDefinition, null, 2));

  SocialProfiles.init(modelDefinition, {
    sequelize,
    modelName: 'SocialProfiles',
    tableName: 'social_profiles',
    timestamps: true,
  });

  return SocialProfiles;
};