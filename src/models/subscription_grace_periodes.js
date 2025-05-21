const { v4: uuidv4 } = require('uuid');

/**
 * Subscription Grace Periods model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} SubscriptionGracePeriods model
 */
module.exports = (sequelize, DataTypes) => {
  const SubscriptionGracePeriods = sequelize.define('SubscriptionGracePeriods', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    subscription_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    extended_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'subscription_grace_periods',
    timestamps: true,
  });

  SubscriptionGracePeriods.associate = models => {
    SubscriptionGracePeriods.belongsTo(models.Subscriptions, { foreignKey: 'subscription_id' });
  };

  return SubscriptionGracePeriods;
};