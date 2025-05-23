import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ContactGroupMembers extends Model {
    static associate(models) {
      ContactGroupMembers.belongsTo(models.ContactGroups, {
        foreignKey: 'group_id',
        as: 'group',
      });
      ContactGroupMembers.belongsTo(models.Contacts, {
        foreignKey: 'contact_id',
        as: 'contact',
      });
    }
  }

  ContactGroupMembers.init(
    {
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
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ContactGroupMembers',
      tableName: 'contact_group_members',
      timestamps: true,
    }
  );

  return ContactGroupMembers;
};