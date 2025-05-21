const { v4: uuidv4 } = require('uuid');

/**
 * Comments model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} Comments model
 */
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    content_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    commenter_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'comments',
    timestamps: true,
  });

  Comments.associate = models => {
    Comments.belongsTo(models.Content, { foreignKey: 'content_id' });
    Comments.belongsTo(models.UserProfiles, { foreignKey: 'commenter_id', as: 'Commenter' });
  };

  return Comments;
};