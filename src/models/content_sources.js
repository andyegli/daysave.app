import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ContentSources extends Model {
    static associate(models) {
      ContentSources.hasMany(models.Content, {
        foreignKey: 'source_id',
        as: 'contents',
      });
    }
  }

  ContentSources.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM(
          'youtube',
          'facebook',
          'instagram',
          'upload',
          'weblink',
          'whatsapp',
          'whatsappbusiness',
          'teams',
          'zoom',
          'threema',
          'linkedin',
          'messenger',
          'telegram',
          'discord',
          'snapchat',
          'threads',
          'slack',
          'github',
          'signal',
          'gmail',
          'simple',
          'tiktok',
          'revolut'
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ContentSources',
      tableName: 'content_sources',
      timestamps: false,
    }
  );

  return ContentSources;
};
