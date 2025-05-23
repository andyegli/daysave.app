import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Permissions extends Model {
    static associate(models) {
      Permissions.belongsToMany(models.Roles, {
        through: models.RolePermissions,
        foreignKey: 'permission_id',
        otherKey: 'role_id',
        as: 'roles',
      });
    }
  }

  Permissions.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: 'Permissions',
      tableName: 'permissions',
      timestamps: true,
    }
  );

  return Permissions;
};