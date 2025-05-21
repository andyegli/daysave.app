const { v4: uuidv4 } = require('uuid');

/**
 * User Profiles model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} UserProfiles model
 */
module.exports = (sequelize, DataTypes) => {
  const UserProfiles = sequelize.define('UserProfiles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'user_profiles',
    paranoid: true,
    timestamps: true,
  });

  UserProfiles.associate = models => {
    UserProfiles.hasMany(models.AuthProviders, { foreignKey: 'user_profile_id' });
    UserProfiles.hasMany(models.MFAMethods, { foreignKey: 'user_profile_id' });
    UserProfiles.hasMany(models.UserRoles, { foreignKey: 'user_profile_id' });
    UserProfiles.hasMany(models.Fingerprints, { foreignKey: 'user_profile_id' });
    UserProfiles.hasMany(models.Contacts, { foreignKey: 'user_profile_id' });
    UserProfiles.hasMany(models.Content, { foreignKey: 'user_profile_id' });
    UserProfiles.hasMany(models.Subscriptions, { foreignKey: 'user_profile_id' });
    UserProfiles.hasMany(models.AuditLogs, { foreignKey: 'user_profile_id' });
    UserProfiles.hasMany(models.Statistics, { foreignKey: 'user_profile_id' });
  };

  return UserProfiles;
};