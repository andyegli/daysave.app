import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      UserRoles.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
      UserRoles.belongsTo(models.Roles, {
        foreignKey: 'role_id',
        as: 'role',
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
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'roles',
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

  console.log('UserRoles model definition:', JSON.stringify(modelDefinition, null, 2));

  UserRoles.init(modelDefinition, {
    sequelize,
    modelName: 'UserRoles',
    tableName: 'user_roles',
    timestamps: true,
  });

  return UserRoles;
};