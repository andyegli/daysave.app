'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaymentTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.UserProfiles) {
        PaymentTransactions.belongsTo(models.UserProfiles, {
          foreignKey: 'user_profile_id',
          as: 'userProfile',
        });
      } else {
        console.warn('UserProfiles model not found during PaymentTransactions association setup');
      }

      if (models.Subscriptions) {
        PaymentTransactions.belongsTo(models.Subscriptions, {
          foreignKey: 'subscription_id',
          as: 'subscription',
        });
      } else {
        console.warn('Subscriptions model not found during PaymentTransactions association setup');
      }

      if (models.PaymentProviders) {
        PaymentTransactions.belongsTo(models.PaymentProviders, {
          foreignKey: 'provider_id',
          as: 'provider',
        });
      } else {
        console.warn('PaymentProviders model not found during PaymentTransactions association setup');
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
    subscription_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'subscriptions',
        key: 'id',
      },
    },
    provider_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'payment_providers',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending',
    },
    transaction_date: {
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
  console.log('PaymentTransactions model definition:', JSON.stringify(modelDefinition, null, 2));

  PaymentTransactions.init(modelDefinition, {
    sequelize,
    modelName: 'PaymentTransactions',
    tableName: 'payment_transactions',
    timestamps: true,
  });

  return PaymentTransactions;
};