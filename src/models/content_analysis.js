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

  ContentAnalysis.init(
    {
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
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ContentAnalysis',
      tableName: 'content_analysis',
      timestamps: true,
    }
  );

  return ContentAnalysis;
};