'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      if (models.Content) {
        UserProfiles.hasMany(models.Content, {
          foreignKey: 'userId',
          as: 'contents',
        });
      } else {
        console.warn('Content model not found during UserProfiles association setup');
      }

      if (models.Comments) {
        UserProfiles.hasMany(models.Comments, {
          foreignKey: 'commenter_id',
          as: 'comments',
        });
      } else {
        console.warn('Comments model not found during UserProfiles association setup');
      }

      if (models.AuthProviders) {
        UserProfiles.hasMany(models.AuthProviders, {
          foreignKey: 'user_profile_id',
          as: 'authProviders',
        });
      } else {
        console.warn('AuthProviders model not found during UserProfiles association setup');
      }

      if (models.Contacts) {
        UserProfiles.hasMany(models.Contacts, {
          foreignKey: 'user_profile_id',
          as: 'contacts',
        });
      } else {
        console.warn('Contacts model not found during UserProfiles association setup');
      }

      if (models.ContactGroups) {
        UserProfiles.hasMany(models.ContactGroups, {
          foreignKey: 'user_profile_id',
          as: 'contactGroups',
        });
      } else {
        console.warn('ContactGroups model not found during UserProfiles association setup');
      }

      if (models.ContentShares) {
        UserProfiles.hasMany(models.ContentShares, {
          foreignKey: 'user_profile_id',
          as: 'contentShares',
        });
      } else {
        console.warn('ContentShares model not found during UserProfiles association setup');
      }

      if (models.Fingerprints) {
        UserProfiles.hasMany(models.Fingerprints, {
          foreignKey: 'user_profile_id',
          as: 'fingerprints',
        });
      } else {
        console.warn('Fingerprints model not found during UserProfiles association setup');
      }

      if (models.MfaMethods) {
        UserProfiles.hasMany(models.MfaMethods, {
          foreignKey: 'user_profile_id',
          as: 'mfaMethods',
        });
      } else {
        console.warn('MfaMethods model not found during UserProfiles association setup');
      }

      if (models.Subscriptions) {
        UserProfiles.hasMany(models.Subscriptions, {
          foreignKey: 'user_profile_id',
          as: 'subscriptions',
        });
      } else {
        console.warn('Subscriptions model not found during UserProfiles association setup');
      }

      if (models.AuditLogs) {
        UserProfiles.hasMany(models.AuditLogs, {
          foreignKey: 'user_profile_id',
          as: 'auditLogs',
        });
      } else {
        console.warn('AuditLogs model not found during UserProfiles association setup');
      }

      if (models.RolePermissions) {
        UserProfiles.hasMany(models.RolePermissions, {
          foreignKey: 'user_profile_id',
          as: 'rolePermissions',
        });
      } else {
        console.warn('RolePermissions model not found during UserProfiles association setup');
      }

      if (models.PaymentTransactions) {
        UserProfiles.hasMany(models.PaymentTransactions, {
          foreignKey: 'user_profile_id',
          as: 'paymentTransactions',
        });
      } else {
        console.warn('PaymentTransactions model not found during UserProfiles association setup');
      }

      if (models.SocialProfiles) {
        UserProfiles.hasMany(models.SocialProfiles, {
          foreignKey: 'user_profile_id',
          as: 'socialProfiles',
        });
      } else {
        console.warn('SocialProfiles model not found during UserProfiles association setup');
      }

      if (models.Statistics) {
        UserProfiles.hasMany(models.Statistics, {
          foreignKey: 'user_profile_id',
          as: 'statistics',
        });
      } else {
        console.warn('Statistics model not found during UserProfiles association setup');
      }

      if (models.UserRoles) {
        UserProfiles.hasMany(models.UserRoles, {
          foreignKey: 'user_profile_id',
          as: 'userRoles',
        });
      } else {
        console.warn('UserRoles model not found during UserProfiles association setup');
      }
    }
  }

  const modelDefinition = {
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
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  };

  // Log the field definitions for debugging
  console.log('UserProfiles model definition:', JSON.stringify(modelDefinition, null, 2));

  UserProfiles.init(modelDefinition, {
    sequelize,
    modelName: 'UserProfiles',
    tableName: 'user_profiles',
    timestamps: true,
  });

  return UserProfiles;
};