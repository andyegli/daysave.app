'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.UserProfiles) {
        Subscriptions.belongsTo(models.UserProfiles, {
          foreignKey: 'user_profile_id',
          as: 'userProfile',
        });
      } else {
        console.warn('UserProfiles model not found during Subscriptions association setup');
      }

      if (models.PaymentTransactions) {
        Subscriptions.hasMany(models.PaymentTransactions, {
          foreignKey: 'subscription_id',
          as: 'transactions',
        });
      } else {
        console.warn('PaymentTransactions model not found during Subscriptions association setup');
      }

      if (models.SubscriptionGracePeriods) {
        Subscriptions.hasMany(models.SubscriptionGracePeriods, {
          foreignKey: 'subscription_id',
          as: 'gracePeriods',
        });
      } else {
        console.warn('SubscriptionGracePeriods model not found during Subscriptions association setup');
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
    plan: {
      type: DataTypes.ENUM('basic', 'premium', 'enterprise'),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    end_date: {
      type: DataTypes.DATE,
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
  console.log('Subscriptions model definition:', JSON.stringify(modelDefinition, null, 2));

  Subscriptions.init(modelDefinition, {
    sequelize,
    modelName: 'Subscriptions',
    tableName: 'subscriptions',
    timestamps: true,
  });

  return Subscriptions;
};