const { v4: uuidv4 } = require('uuid');

/**
 * Fingerprints model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} Fingerprints model
 */
module.exports = (sequelize, DataTypes) => {
  const Fingerprints = sequelize.define('Fingerprints', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ip_history: {
      type: DataTypes.JSON,
    },
    locale: {
      type: DataTypes.JSON,
    },
    browser_headers: {
      type: DataTypes.JSON,
    },
  }, {
    tableName: 'fingerprints',
    timestamps: true,
  });

  Fingerprints.associate = models => {
    Fingerprints.belongsTo(models.UserProfiles, { foreignKey: 'user_profile_id' });
  };

  return Fingerprints;
};