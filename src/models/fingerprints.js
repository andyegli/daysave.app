import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Fingerprints extends Model {
    static associate(models) {
      Fingerprints.belongsTo(models.UserProfiles, {
        foreignKey: 'user_profile_id',
        as: 'userProfile',
      });
    }
  }

  Fingerprints.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_profile_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user_profiles',
          key: 'userId',
        },
      },
      fingerprint_data: {
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
      modelName: 'Fingerprints',
      tableName: 'fingerprints',
      timestamps: true,
    }
  );

  return Fingerprints;
};