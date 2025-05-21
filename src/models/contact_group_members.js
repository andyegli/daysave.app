const { v4: uuidv4 } = require('uuid');

/**
 * Contact Group Members model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} ContactGroupMembers model
 */
module.exports = (sequelize, DataTypes) => {
  const ContactGroupMembers = sequelize.define('ContactGroupMembers', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    contact_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    tableName: 'contact_group_members',
    timestamps: false,
  });

  ContactGroupMembers.associate = models => {
    ContactGroupMembers.belongsTo(models.Contacts, { foreignKey: 'contact_id' });
    ContactGroupMembers.belongsTo(models.ContactGroups, { foreignKey: 'group_id' });
  };

  return ContactGroupMembers;
};