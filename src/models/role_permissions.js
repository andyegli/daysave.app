import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RolePermissions extends Model {
    static associate(models) {
      RolePermissions.belongsTo(models.Roles, {
        foreignKey: 'role_id',
        as: 'role',
      });
      RolePermissions.belongsTo(models.Permissions, {
        foreignKey: 'permission_id',
        as: 'permission',
      });
    }
  }

  RolePermissions.init(
    {
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      permission_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'permissions',
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
      modelName: 'RolePermissions',
      tableName: 'role_permissions',
      timestamps: true,
    }
  );

  return RolePermissions;
};