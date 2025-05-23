import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserProfiles extends Model {
    static associate(models) {
      UserProfiles.hasMany(models.Content, {
        foreignKey: 'userId',
        as: 'contents',
      });
      UserProfiles.hasMany(models.Comments, {
        foreignKey: 'commenter_id',
        as: 'comments',
      });
      UserProfiles.hasMany(models.AuthProviders, {
        foreignKey: 'user_profile_id',
        as: 'authProviders',
      });
      UserProfiles.hasMany(models.Contacts, {
        foreignKey: 'user_profile_id',
        as: 'contacts',
      });
      UserProfiles.hasMany(models.ContactGroups, {
        foreignKey: 'user_profile_id',
        as: 'contactGroups',
      });
      UserProfiles.hasMany(models.ContentShares, {
        foreignKey: 'user_profile_id',
        as: 'contentShares',
      });
      UserProfiles.hasMany(models.Fingerprints, {
        foreignKey: 'user_profile_id',
        as: 'fingerprints',
      });
      UserProfiles.hasMany(models.MfaMethods, {
        foreignKey: 'user_profile_id',
        as: 'mfaMethods',
      });
      UserProfiles.hasMany(models.Subscriptions, {
        foreignKey: 'user_profile_id',
        as: 'subscriptions',
      });
      UserProfiles.hasMany(models.PaymentTransactions, {
        foreignKey: 'user_profile_id',
        as: 'paymentTransactions',
      });
      UserProfiles.hasMany(models.Statistics, {
        foreignKey: 'user_profile_id',
        as: 'statistics',
      });
      UserProfiles.hasMany(models.SocialProfiles, {
        foreignKey: 'user_profile_id',
        as: 'socialProfiles',
      });
      UserProfiles.hasMany(models.AuditLogs, {
        foreignKey: 'user_profile_id',
        as: 'auditLogs',
      });
      UserProfiles.belongsToMany(models.Roles, {
        through: models.UserRoles,
        foreignKey: 'user_profile_id',
        otherKey: 'role_id',
        as: 'roles',
      });
    }
  }

  UserProfiles.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
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
      modelName: 'UserProfiles',
      tableName: 'user_profiles',
      timestamps: true,
    }
  );

  return UserProfiles;
};