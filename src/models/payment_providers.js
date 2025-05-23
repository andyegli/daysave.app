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

  PaymentProviders.init(
    {
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
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PaymentProviders',
      tableName: 'payment_providers',
      timestamps: true,
    }
  );

  return PaymentProviders;
};