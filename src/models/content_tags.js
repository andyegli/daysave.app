import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ContentTags extends Model {
    static associate(models) {
      ContentTags.belongsTo(models.Content, {
        foreignKey: 'content_id',
        as: 'content',
      });
      ContentTags.belongsTo(models.Tags, {
        foreignKey: 'tag_id',
        as: 'tag',
      });
    }
  }

  ContentTags.init(
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
      tag_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tags',
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
      modelName: 'ContentTags',
      tableName: 'content_tags',
      timestamps: true,
    }
  );

  return ContentTags;
};