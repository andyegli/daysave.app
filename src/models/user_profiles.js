import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserProfiles extends Model {
    static associate(models) {
      if (models.AuditLogs) {
        UserProfiles.hasMany(models.AuditLogs, {
          foreignKey: 'user_profile_id',
          as: 'auditLogs',
        });
      } else {
        console.warn('AuditLogs model not found during UserProfiles association setup');
      }
    }
  }

  const modelDefinition = {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

  console.log('UserProfiles model definition:', JSON.stringify(modelDefinition, null, 2));

  UserProfiles.init(modelDefinition, {
    sequelize,
    modelName: 'UserProfiles',
    tableName: 'user_profiles',
    timestamps: true,
  });

  return UserProfiles;
};