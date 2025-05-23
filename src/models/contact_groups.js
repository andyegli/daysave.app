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
      ContactGroups.belongsToMany(models.Contacts, {
        through: models.ContactGroupMembers,
        foreignKey: 'group_id',
        otherKey: 'contact_id',
        as: 'members',
      });
    }
  }

  ContactGroups.init(
    {
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
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ContactGroups',
      tableName: 'contact_groups',
      timestamps: true,
    }
  );

  return ContactGroups;
};