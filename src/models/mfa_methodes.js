const { v4: uuidv4 } = require('uuid');

/**
 * MFA Methods model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} MFAMethods model
 */
module.exports = (sequelize, DataTypes) => {
  const MFAMethods = sequelize.define('MFAMethods', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('totp', 'sms', 'email', 'backup_codes'),
      allowNull: false,
    },
    config: {
      type: DataTypes.JSON,
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'mfa_methods',
    timestamps: false,
  });

  MFAMethods.associate = models => {
    MFAMethods.belongsTo(models.UserProfiles, { foreignKey: 'user_profile_id' });
  };

  return MFAMethods;
};