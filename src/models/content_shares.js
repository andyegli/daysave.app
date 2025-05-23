import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ContentShares extends Model {
    static associate(models) {
      ContentShares.belongsTo(models.Content, {
        foreignKey: 'content_id',
        as: 'content',
      });
      ContentShares.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
    }
  }

  ContentShares.init(
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
      user_profile_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user_profiles',
          key: 'userId',
        },
      },
      shared_at: {
        type: DataTypes.DATE,
        allowNull: false,
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
      modelName: 'ContentShares',
      tableName: 'content_shares',
      timestamps: true,
    }
  );

  return ContentShares;
};