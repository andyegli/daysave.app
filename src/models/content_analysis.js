'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContentAnalysis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.Content) {
        ContentAnalysis.belongsTo(models.Content, {
          foreignKey: 'content_id',
          as: 'content',
        });
      } else {
        console.warn('Content model not found during ContentAnalysis association setup');
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
    analysis_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    result: {
      type: DataTypes.JSON,
      allowNull: true,
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
  console.log('ContentAnalysis model definition:', JSON.stringify(modelDefinition, null, 2));

  ContentAnalysis.init(modelDefinition, {
    sequelize,
    modelName: 'ContentAnalysis',
    tableName: 'content_analysis',
    timestamps: true,
  });

  return ContentAnalysis;
};