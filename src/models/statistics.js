import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Statistics extends Model {
    static associate(models) {
      Statistics.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
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
    metric: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: false,
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

  console.log('Statistics model definition:', JSON.stringify(modelDefinition, null, 2));

  Statistics.init(modelDefinition, {
    sequelize,
    modelName: 'Statistics',
    tableName: 'statistics',
    timestamps: true,
  });

  return Statistics;
};