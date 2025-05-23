import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PaymentTransactions extends Model {
    static associate(models) {
      PaymentTransactions.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
      PaymentTransactions.belongsTo(models.Subscriptions, {
        foreignKey: 'subscription_id',
        as: 'subscription',
      });
      PaymentTransactions.belongsTo(models.PaymentProviders, {
        foreignKey: 'provider_id',
        as: 'provider',
      });
    }
  }

  PaymentTransactions.init(
    {
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
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PaymentTransactions',
      tableName: 'payment_transactions',
      timestamps: true,
    }
  );

  return PaymentTransactions;
};