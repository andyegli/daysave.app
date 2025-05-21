const { v4: uuidv4 } = require('uuid');

/**
 * Payment Transactions model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} PaymentTransactions model
 */
module.exports = (sequelize, DataTypes) => {
  const PaymentTransactions = sequelize.define('PaymentTransactions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    subscription_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    payment_provider_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'payment_transactions',
    timestamps: true,
  });

  PaymentTransactions.associate = models => {
    PaymentTransactions.belongsTo(models.Subscriptions, { foreignKey: 'subscription_id' });
    PaymentTransactions.belongsTo(models.PaymentProviders, { foreignKey: 'payment_provider_id' });
  };

  return PaymentTransactions;
};