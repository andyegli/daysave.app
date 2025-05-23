import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ContactGroups extends Model {
    static associate(models) {
      ContactGroups.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
      ContactGroups.hasMany(models.Contacts, {
        foreignKey: 'group_id',
        as: 'contacts',
      });
      ContactGroups.hasMany(models.ContactGroupMembers, {
        foreignKey: 'group_id',
        as: 'groupMembers',
      });
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

  console.log('ContactGroups model definition:', JSON.stringify(modelDefinition, null, 2));

  ContactGroups.init(modelDefinition, {
    sequelize,
    modelName: 'ContactGroups',
    tableName: 'contact_groups',
    timestamps: true,
  });

  return ContactGroups;
};