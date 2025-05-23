import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    static associate(models) {
      Subscriptions.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
      Subscriptions.hasMany(models.PaymentTransactions, {
        foreignKey: 'subscription_id',
        as: 'transactions',
      });
      Subscriptions.hasMany(models.SubscriptionGracePeriods, {
        foreignKey: 'subscription_id',
        as: 'gracePeriods',
      });
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

  console.log('Subscriptions model definition:', JSON.stringify(modelDefinition, null, 2));

  Subscriptions.init(modelDefinition, {
    sequelize,
    modelName: 'Subscriptions',
    tableName: 'subscriptions',
    timestamps: true,
  });

  return Subscriptions;
};