import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SocialProfiles extends Model {
    static associate(models) {
      SocialProfiles.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
      SocialProfiles.belongsTo(models.SocialProviders, {
        foreignKey: 'provider_id',
        as: 'provider',
      });
    }
  }

  SocialProfiles.init(
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
      provider_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'social_providers',
          key: 'id',
        },
      },
      provider_user_id: {
        type: DataTypes.STRING,
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
      modelName: 'SocialProfiles',
      tableName: 'social_profiles',
      timestamps: true,
    }
  );

  return SocialProfiles;
};