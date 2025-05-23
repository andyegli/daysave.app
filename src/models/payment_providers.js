import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PaymentProviders extends Model {
    static associate(models) {
      PaymentProviders.hasMany(models.PaymentTransactions, {
        foreignKey: 'provider_id',
        as: 'transactions',
      });
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

  console.log('PaymentProviders model definition:', JSON.stringify(modelDefinition, null, 2));

  PaymentProviders.init(modelDefinition, {
    sequelize,
    modelName: 'PaymentProviders',
    tableName: 'payment_providers',
    timestamps: true,
  });

  return PaymentProviders;
};