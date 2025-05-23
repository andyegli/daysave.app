import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      Tags.hasMany(models.ContentTags, {
        foreignKey: 'tag_id',
        as: 'contentTags',
      });
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

  console.log('Tags model definition:', JSON.stringify(modelDefinition, null, 2));

  Tags.init(modelDefinition, {
    sequelize,
    modelName: 'Tags',
    tableName: 'tags',
    timestamps: true,
  });

  return Tags;
};