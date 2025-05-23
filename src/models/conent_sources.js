'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContentSources extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContentSources.hasMany(models.Content, {
        foreignKey: 'source_id',
        as: 'contents',
      });
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM('youtube', 'facebook', 'instagram', 'upload', 'weblink', 'whatsapp', 'whatsappbusiness', 'teams', 'zoom', 'threema', 'linkedin', 'messenger', 'telegram', 'discord', 'snapchat', 'threads', 'slack', 'github', 'signal', 'gmail', 'simple', 'tiktok', 'revolut'),
      allowNull: false,
    },
  };

  // Log the field definitions for debugging
  console.log('ContentSources model definition:', JSON.stringify(modelDefinition, null, 2));

  ContentSources.init(modelDefinition, {
    sequelize,
    modelName: 'ContentSources',
    tableName: 'content_sources',
    timestamps: false,
  });

  return ContentSources;
};