import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class MfaMethods extends Model {
    static associate(models) {
      MfaMethods.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
    }
  }

  MfaMethods.init(
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
      method_type: {
        type: DataTypes.ENUM('totp', 'sms', 'email', 'authenticator_app'),
        allowNull: false,
      },
      secret: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      modelName: 'MfaMethods',
      tableName: 'mfa_methods',
      timestamps: true,
    }
  );

  return MfaMethods;
};