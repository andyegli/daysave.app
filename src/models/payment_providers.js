const { v4: uuidv4 } = require('uuid');

/**
 * Payment Providers model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} PaymentProviders model
 */
module.exports = (sequelize, DataTypes) => {
  const PaymentProviders = sequelize.define('PaymentProviders', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'payment_providers',
    timestamps: false,
  });

  PaymentProviders.associate = models => {
    PaymentProviders.hasMany(models.PaymentTransactions, { foreignKey: 'payment_provider_id' });
  };

  return PaymentProviders;
};