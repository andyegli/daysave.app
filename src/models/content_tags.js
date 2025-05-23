'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContentTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.Content) {
        ContentTags.belongsTo(models.Content, {
          foreignKey: 'content_id',
          as: 'content',
        });
      } else {
        console.warn('Content model not found during ContentTags association setup');
      }

      if (models.Tags) {
        ContentTags.belongsTo(models.Tags, {
          foreignKey: 'tag_id',
          as: 'tag',
        });
      } else {
        console.warn('Tags model not found during ContentTags association setup');
      }
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'content',
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id',
      },
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
  console.log('ContentTags model definition:', JSON.stringify(modelDefinition, null, 2));

  ContentTags.init(modelDefinition, {
    sequelize,
    modelName: 'ContentTags',
    tableName: 'content_tags',
    timestamps: true,
  });

  return ContentTags;
};