'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContactGroupMembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.ContactGroups) {
        ContactGroupMembers.belongsTo(models.ContactGroups, {
          foreignKey: 'group_id',
          as: 'group',
        });
      } else {
        console.warn('ContactGroups model not found during ContactGroupMembers association setup');
      }

      if (models.Contacts) {
        ContactGroupMembers.belongsTo(models.Contacts, {
          foreignKey: 'contact_id',
          as: 'contact',
        });
      } else {
        console.warn('Contacts model not found during ContactGroupMembers association setup');
      }
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'contact_groups',
        key: 'id',
      },
    },
    contact_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'contacts',
        key: 'id',
      },
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
  console.log('ContactGroupMembers model definition:', JSON.stringify(modelDefinition, null, 2));

  ContactGroupMembers.init(modelDefinition, {
    sequelize,
    modelName: 'ContactGroupMembers',
    tableName: 'contact_group_members',
    timestamps: true,
  });

  return ContactGroupMembers;
};