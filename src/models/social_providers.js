import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SocialProviders extends Model {
    static associate(models) {
      SocialProviders.hasMany(models.SocialProfiles, {
        foreignKey: 'provider_id',
        as: 'profiles',
      });
    }
  }

  SocialProviders.init(
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
      modelName: 'SocialProviders',
      tableName: 'social_providers',
      timestamps: true,
    }
  );

  return SocialProviders;
};