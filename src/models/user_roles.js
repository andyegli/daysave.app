'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.UserProfiles) {
        UserRoles.belongsTo(models.UserProfiles, {
          foreignKey: 'user_profile_id',
          as: 'userProfile',
        });
      } else {
        console.warn('UserProfiles model not found during UserRoles association setup');
      }

      if (models.Roles) {
        UserRoles.belongsTo(models.Roles, {
          foreignKey: 'role_id',
          as: 'role',
        });
      } else {
        console.warn('Roles model not found during UserRoles association setup');
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

  // Log the field definitions for debugging
  console.log('UserRoles model definition:', JSON.stringify(modelDefinition, null, 2));

  UserRoles.init(modelDefinition, {
    sequelize,
    modelName: 'UserRoles',
    tableName: 'user_roles',
    timestamps: true,
  });

  return UserRoles;
};