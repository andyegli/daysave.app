const { v4: uuidv4 } = require('uuid');

/**
 * Tags model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} Tags model
 */
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'tags',
    timestamps: false,
  });

  Tags.associate = models => {
    Tags.hasMany(models.ContentTags, { foreignKey: 'tag_id' });
  };

  return Tags;
};