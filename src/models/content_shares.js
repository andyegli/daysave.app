const { v4: uuidv4 } = require('uuid');

/**
 * Content Shares model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} ContentShares model
 */
module.exports = (sequelize, DataTypes) => {
  const ContentShares = sequelize.define('ContentShares', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    content_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    contact_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    shared_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'content_shares',
    timestamps: true,
  });

  ContentShares.associate = models => {
    ContentShares.belongsTo(models.Content, { foreignKey: 'content_id' });
    ContentShares.belongsTo(models.Contacts, { foreignKey: 'contact_id' });
  };

  return ContentShares;
};