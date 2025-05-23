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

  console.log('ContactGroupMembers model definition:', JSON.stringify(modelDefinition, null, 2));

  ContactGroupMembers.init(modelDefinition, {
    sequelize,
    modelName: 'ContactGroupMembers',
    tableName: 'contact_group_members',
    timestamps: true,
  });

  return ContactGroupMembers;
};