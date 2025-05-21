const { v4: uuidv4 } = require('uuid');

/**
 * Content Sources model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} ContentSources model
 */
module.exports = (sequelize, DataTypes) => {
  const ContentSources = sequelize.define('ContentSources', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM(
        'youtube', 'facebook', 'instagram', 'upload', 'weblink',
        'whatsapp', 'whatsappbusiness', 'teams', 'zoom', 'threema',
        'linkedin', 'messenger', 'telegram', 'discord', 'snapchat',
        'threads', 'slack', 'github', 'signal', 'gmail', 'simple',
        'tiktok', 'revolut'
      ),
      allowNull: false,
    },
  }, {
    tableName: 'content_sources',
    timestamps: false,
  });

  ContentSources.associate = models => {
    ContentSources.hasMany(models.Content, { foreignKey: 'source_id' });
  };

  return ContentSources;
};