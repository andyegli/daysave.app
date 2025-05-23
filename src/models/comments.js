import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.Content, {
        foreignKey: 'content_id',
        as: 'content',
      });
      Comments.belongsTo(models.UserProfiles, {
        foreignKey: 'commenter_id',
        as: 'commenter',
      });
    }
  }

  Comments.init(
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
      commenter_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user_profiles',
          key: 'userId',
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
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
      modelName: 'Comments',
      tableName: 'comments',
      timestamps: true,
    }
  );

  return Comments;
};