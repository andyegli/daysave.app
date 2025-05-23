import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Contacts extends Model {
    static associate(models) {
      Contacts.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
      Contacts.belongsTo(models.ContactGroups, {
        foreignKey: 'group_id',
        as: 'group',
      });
      Contacts.hasMany(models.ContactGroupMembers, {
        foreignKey: 'contact_id',
        as: 'groupMemberships',
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

  console.log('Contacts model definition:', JSON.stringify(modelDefinition, null, 2));

  Contacts.init(modelDefinition, {
    sequelize,
    modelName: 'Contacts',
    tableName: 'contacts',
    timestamps: true,
  });

  return Contacts;
};