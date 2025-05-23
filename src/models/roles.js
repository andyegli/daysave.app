import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.belongsToMany(models.Permissions, {
        through: models.RolePermissions,
        foreignKey: 'role_id',
        otherKey: 'permission_id',
        as: 'permissions',
      });
      Roles.belongsToMany(models.UserProfiles, {
        through: models.UserRoles,
        foreignKey: 'role_id',
        otherKey: 'user_profile_id',
        as: 'users',
      });
    }
  }

  Roles.init(
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
      modelName: 'Roles',
      tableName: 'roles',
      timestamps: true,
    }
  );

  return Roles;
};