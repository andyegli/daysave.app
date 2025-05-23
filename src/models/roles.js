'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.UserRoles) {
        Roles.hasMany(models.UserRoles, {
          foreignKey: 'role_id',
          as: 'userRoles',
        });
      } else {
        console.warn('UserRoles model not found during Roles association setup');
      }
    }
  }

  const modelDefinition = {
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
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  };

  // Log the field definitions for debugging
  console.log('Roles model definition:', JSON.stringify(modelDefinition, null, 2));

  Roles.init(modelDefinition, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
    timestamps: true,
  });

  return Roles;
};