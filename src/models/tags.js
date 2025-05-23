'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.ContentTags) {
        Tags.hasMany(models.ContentTags, {
          foreignKey: 'tag_id',
          as: 'contentTags',
        });
      } else {
        console.warn('ContentTags model not found during Tags association setup');
      }
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
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
  console.log('Tags model definition:', JSON.stringify(modelDefinition, null, 2));

  Tags.init(modelDefinition, {
    sequelize,
    modelName: 'Tags',
    tableName: 'tags',
    timestamps: true,
  });

  return Tags;
};