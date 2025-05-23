import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      Tags.belongsToMany(models.Content, {
        through: models.ContentTags,
        foreignKey: 'tag_id',
        otherKey: 'content_id',
        as: 'contents',
      });
    }
  }

  Tags.init(
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
      modelName: 'Tags',
      tableName: 'tags',
      timestamps: true,
    }
  );

  return Tags;
};