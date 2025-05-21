const { v4: uuidv4 } = require('uuid');

/**
 * Content Analysis model for daysave.app v1.0.1 (AI backend placeholder)
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} ContentAnalysis model
 */
module.exports = (sequelize, DataTypes) => {
  const ContentAnalysis = sequelize.define('ContentAnalysis', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    content_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    keywords: {
      type: DataTypes.JSON,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    transcription: {
      type: DataTypes.TEXT,
    },
    objects: {
      type: DataTypes.JSON,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'content_analysis',
    timestamps: true,
  });

  ContentAnalysis.associate = models => {
    ContentAnalysis.belongsTo(models.Content, { foreignKey: 'content_id' });
  };

  return ContentAnalysis;
};