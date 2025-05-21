const { v4: uuidv4 } = require('uuid');

/**
 * Subscriptions model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} Subscriptions model
 */
module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define('Subscriptions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    subscription_type: {
      type: DataTypes.ENUM('trial', 'paid', 'lifetime'),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    end_date: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'subscriptions',
    timestamps: true,
  });

  Subscriptions.associate = models => {
    Subscriptions.belongsTo(models.UserProfiles, { foreignKey: 'user_profile_id' });
    Subscriptions.hasMany(models.SubscriptionGracePeriods, { foreignKey: 'subscription_id' });
    Subscriptions.hasMany(models.PaymentTransactions, { foreignKey: 'subscription_id' });
  };

  return Subscriptions;
};