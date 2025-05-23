import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ContentAnalysis extends Model {
    static associate(models) {
      ContentAnalysis.belongsTo(models.Content, {
        foreignKey: 'content_id',
        as: 'content',
      });
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'content',
        key: 'id',
      },
    },
    analysis_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    result: {
      type: DataTypes.JSON,
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

  console.log('ContentAnalysis model definition:', JSON.stringify(modelDefinition, null, 2));

  ContentAnalysis.init(modelDefinition, {
    sequelize,
    modelName: 'ContentAnalysis',
    tableName: 'content_analysis',
    timestamps: true,
  });

  return ContentAnalysis;
};