const { v4: uuidv4 } = require('uuid');

/**
 * Contacts model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} Contacts model
 */
module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('Contacts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
    },
    birthday: {
      type: DataTypes.DATEONLY,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    phone_numbers: {
      type: DataTypes.JSON,
    },
    addresses: {
      type: DataTypes.JSON,
    },
    emails: {
      type: DataTypes.JSON,
    },
    social_profiles: {
      type: DataTypes.JSON,
    },
  }, {
    tableName: 'contacts',
    timestamps: true,
  });

  Contacts.associate = models => {
    Contacts.belongsTo(models.UserProfiles, { foreignKey: 'user_profile_id' });
    Contacts.hasMany(models.SocialProfiles, { foreignKey: 'contact_id' });
    Contacts.hasMany(models.ContactGroupMembers, { foreignKey: 'contact_id' });
    Contacts.hasMany(models.ContentShares, { foreignKey: 'contact_id' });
  };

  return Contacts;
};