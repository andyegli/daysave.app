import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SubscriptionGracePeriods extends Model {
    static associate(models) {
      SubscriptionGracePeriods.belongsTo(models.Subscriptions, {
        foreignKey: 'subscription_id',
        as: 'subscription',
      });
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

  console.log('SubscriptionGracePeriods model definition:', JSON.stringify(modelDefinition, null, 2));

  SubscriptionGracePeriods.init(modelDefinition, {
    sequelize,
    modelName: 'SubscriptionGracePeriods',
    tableName: 'subscription_grace_periods',
    timestamps: true,
  });

  return SubscriptionGracePeriods;
};