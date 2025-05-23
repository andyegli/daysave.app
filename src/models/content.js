import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      Content.belongsTo(models.UserProfiles, {
        foreignKey: 'userId',
        as: 'user',
      });
      Content.belongsTo(models.ContentSources, {
        foreignKey: 'source_id',
        as: 'source',
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
        as: 'analysis',
      });
      Content.belongsToMany(models.Tags, {
        through: models.ContentTags,
        foreignKey: 'content_id',
        otherKey: 'tag_id',
        as: 'tags',
      });
    }
  }

  Content.init(
    {
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
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Content',
      tableName: 'content',
      timestamps: true,
    }
  );

  return Content;
};