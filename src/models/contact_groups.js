'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContactGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.UserProfiles) {
        ContactGroups.belongsTo(models.UserProfiles, {
          foreignKey: 'user_profile_id',
          as: 'userProfile',
        });
      } else {
        console.warn('UserProfiles model not found during ContactGroups association setup');
      }

      if (models.Contacts) {
        ContactGroups.hasMany(models.Contacts, {
          foreignKey: 'group_id',
          as: 'contacts',
        });
      } else {
        console.warn('Contacts model not found during ContactGroups association setup');
      }

      if (models.ContactGroupMembers) {
        ContactGroups.hasMany(models.ContactGroupMembers, {
          foreignKey: 'group_id',
          as: 'groupMembers',
        });
      } else {
        console.warn('ContactGroupMembers model not found during ContactGroups association setup');
      }
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user_profiles',
        key: 'userId',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  console.log('ContactGroups model definition:', JSON.stringify(modelDefinition, null, 2));

  ContactGroups.init(modelDefinition, {
    sequelize,
    modelName: 'ContactGroups',
    tableName: 'contact_groups',
    timestamps: true,
  });

  return ContactGroups;
};