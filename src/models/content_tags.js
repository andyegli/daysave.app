const { v4: uuidv4 } = require('uuid');

/**
 * Content Tags model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} ContentTags model
 */
module.exports = (sequelize, DataTypes) => {
  const ContentTags = sequelize.define('ContentTags', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    content_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    tableName: 'content_tags',
    timestamps: false,
  });

  ContentTags.associate = models => {
    ContentTags.belongsTo(models.Content, { foreignKey: 'content_id' });
    ContentTags.belongsTo(models.Tags, { foreignKey: 'tag_id' });
  };

  return ContentTags;
};