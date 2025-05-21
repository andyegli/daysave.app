const { v4: uuidv4 } = require('uuid');

/**
 * Social Providers model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} SocialProviders model
 */
module.exports = (sequelize, DataTypes) => {
  const SocialProviders = sequelize.define('SocialProviders', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'social_providers',
    timestamps: false,
  });

  SocialProviders.associate = models => {
    SocialProviders.hasMany(models.SocialProfiles, { foreignKey: 'social_provider_id' });
  };

  return SocialProviders;
};