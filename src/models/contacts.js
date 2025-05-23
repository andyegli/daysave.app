'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.UserProfiles) {
        Contacts.belongsTo(models.UserProfiles, {
          foreignKey: 'user_profile_id',
          as: 'userProfile',
        });
      } else {
        console.warn('UserProfiles model not found during Contacts association setup');
      }

      if (models.ContactGroups) {
        Contacts.belongsTo(models.ContactGroups, {
          foreignKey: 'group_id',
          as: 'group',
        });
      } else {
        console.warn('ContactGroups model not found during Contacts association setup');
      }

      if (models.ContactGroupMembers) {
        Contacts.hasMany(models.ContactGroupMembers, {
          foreignKey: 'contact_id',
          as: 'groupMemberships',
        });
      } else {
        console.warn('ContactGroupMembers model not found during Contacts association setup');
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
    group_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'contact_groups',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
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
  console.log('Contacts model definition:', JSON.stringify(modelDefinition, null, 2));

  Contacts.init(modelDefinition, {
    sequelize,
    modelName: 'Contacts',
    tableName: 'contacts',
    timestamps: true,
  });

  return Contacts;
};