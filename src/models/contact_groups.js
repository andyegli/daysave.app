const { v4: uuidv4 } = require('uuid');

/**
 * Contact Groups model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} ContactGroups model
 */
module.exports = (sequelize, DataTypes) => {
  const ContactGroups = sequelize.define('ContactGroups', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'contact_groups',
    timestamps: true,
  });

  ContactGroups.associate = models => {
    ContactGroups.belongsTo(models.UserProfiles, { foreignKey: 'user_profile_id' });
    ContactGroups.hasMany(models.ContactGroupMembers, { foreignKey: 'group_id' });
  };

  return ContactGroups;
};