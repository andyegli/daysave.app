import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      Content.belongsTo(models.UserProfiles, {
        foreignKey: 'userId',
        as: 'user',
      });
      Content.hasMany(models.Comments, {
        foreignKey: 'content_id',
        as: 'comments',
      });
      Content.hasMany(models.ContentShares, {
        foreignKey: 'content_id',
        as: 'shares',
      });
      Content.hasMany(models.ContentAnalysis, {
        foreignKey: 'content_id',
        as: 'analyses',
      });
      Content.hasMany(models.ContentTags, {
        foreignKey: 'content_id',
        as: 'contentTags',
      });
      Content.belongsTo(models.ContentSources, {
        foreignKey: 'source_id',
        as: 'source',
      });
    }
  }

  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user_profiles',
        key: 'userId',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    source_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'content_sources',
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

  console.log('Content model definition:', JSON.stringify(modelDefinition, null, 2));

  Content.init(modelDefinition, {
    sequelize,
    modelName: 'Content',
    tableName: 'content',
    timestamps: true,
  });

  return Content;
};