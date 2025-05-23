'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubscriptionGracePeriods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.Subscriptions) {
        SubscriptionGracePeriods.belongsTo(models.Subscriptions, {
          foreignKey: 'subscription_id',
          as: 'subscription',
        });
      } else {
        console.warn('Subscriptions model not found during SubscriptionGracePeriods association setup');
      }
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subscription_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'subscriptions',
        key: 'id',
      },
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
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
  console.log('SubscriptionGracePeriods model definition:', JSON.stringify(modelDefinition, null, 2));

  SubscriptionGracePeriods.init(modelDefinition, {
    sequelize,
    modelName: 'SubscriptionGracePeriods',
    tableName: 'subscription_grace_periods',
    timestamps: true,
  });

  return SubscriptionGracePeriods;
};