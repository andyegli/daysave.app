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

  const modelDefinition = {
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
  };

  console.log('ContentSources model definition:', JSON.stringify(modelDefinition, null, 2));

  ContentSources.init(modelDefinition, {
    sequelize,
    modelName: 'ContentSources',
    tableName: 'content_sources',
    timestamps: false,
  });

  return ContentSources;
};