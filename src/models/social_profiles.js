const { v4: uuidv4 } = require('uuid');

/**
 * Social Profiles model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} SocialProfiles model
 */
module.exports = (sequelize, DataTypes) => {
  const SocialProfiles = sequelize.define('SocialProfiles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    contact_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    social_provider_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    social_id: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'social_profiles',
    timestamps: false,
  });

  SocialProfiles.associate = models => {
    SocialProfiles.belongsTo(models.Contacts, { foreignKey: 'contact_id' });
    SocialProfiles.belongsTo(models.SocialProviders, { foreignKey: 'social_provider_id' });
  };

  return SocialProfiles;
};