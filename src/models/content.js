'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Content.belongsTo(models.UserProfiles, {
        foreignKey: 'userId',
        as: 'user',
      });
      Content.hasMany(models.Comments, {
        foreignKey: 'content_id',
        as: 'comments',
      });
      Content.belongsTo(models.ContentSources, {
        foreignKey: 'source_id',
        as: 'source',
      });
      Content.hasMany(models.ContentShares, {
        foreignKey: 'content_id',
        as: 'contentShares',
      });
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user_profiles',
        key: 'userId',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    source_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'content_sources',
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
  console.log('Content model definition:', JSON.stringify(modelDefinition, null, 2));

  Content.init(modelDefinition, {
    sequelize,
    modelName: 'Content',
    tableName: 'content',
    timestamps: true,
  });

  return Content;
};