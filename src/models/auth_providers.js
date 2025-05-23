import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class AuthProviders extends Model {
    static associate(models) {
      AuthProviders.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
    }
  }

  AuthProviders.init(
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
      provider: {
        type: DataTypes.ENUM(
          'local',
          'google',
          'github',
          'apple',
          'passkey',
          'microsoft',
          'facebook',
          'twitter',
          'instagram'
        ),
        allowNull: false,
      },
      provider_user_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passkey_data: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'AuthProviders',
      tableName: 'auth_providers',
      timestamps: false,
    }
  );

  return AuthProviders;
};