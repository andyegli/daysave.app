const { v4: uuidv4 } = require('uuid');

/**
 * Content model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} Content model
 */
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
    },
    url: {
      type: DataTypes.TEXT,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM('short', 'video', 'text', 'clip', 'file'),
      allowNull: false,
    },
    source_id: {
      type: DataTypes.UUID,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'content',
    paranoid: true,
    timestamps: true,
  });

  Content.associate = models => {
    Content.belongsTo(models.UserProfiles, { foreignKey: 'user_profile_id' });
    Content.belongsTo(models.ContentSources, { foreignKey: 'source_id' });
    Content.hasMany(models.Comments, { foreignKey: 'content_id' });
    Content.hasMany(models.ContentTags, { foreignKey: 'content_id' });
    Content.hasMany(models.ContentShares, { foreignKey: 'content_id' });
    Content.hasMany(models.ContentAnalysis, { foreignKey: 'content_id' });
  };

  return Content;
};