'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SocialProviders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.SocialProfiles) {
        SocialProviders.hasMany(models.SocialProfiles, {
          foreignKey: 'provider_id',
          as: 'profiles',
        });
      } else {
        console.warn('SocialProfiles model not found during SocialProviders association setup');
      }
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
  console.log('SocialProviders model definition:', JSON.stringify(modelDefinition, null, 2));

  SocialProviders.init(modelDefinition, {
    sequelize,
    modelName: 'SocialProviders',
    tableName: 'social_providers',
    timestamps: true,
  });

  return SocialProviders;
};