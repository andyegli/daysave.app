'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaymentProviders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.PaymentTransactions) {
        PaymentProviders.hasMany(models.PaymentTransactions, {
          foreignKey: 'provider_id',
          as: 'transactions',
        });
      } else {
        console.warn('PaymentTransactions model not found during PaymentProviders association setup');
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
  console.log('PaymentProviders model definition:', JSON.stringify(modelDefinition, null, 2));

  PaymentProviders.init(modelDefinition, {
    sequelize,
    modelName: 'PaymentProviders',
    tableName: 'payment_providers',
    timestamps: true,
  });

  return PaymentProviders;
};