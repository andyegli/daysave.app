'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Statistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.UserProfiles) {
        Statistics.belongsTo(models.UserProfiles, {
          foreignKey: 'user_profile_id',
          as: 'userProfile',
        });
      } else {
        console.warn('UserProfiles model not found during Statistics association setup');
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
    metric: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
  console.log('Statistics model definition:', JSON.stringify(modelDefinition, null, 2));

  Statistics.init(modelDefinition, {
    sequelize,
    modelName: 'Statistics',
    tableName: 'statistics',
    timestamps: true,
  });

  return Statistics;
};