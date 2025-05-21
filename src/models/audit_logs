const { v4: uuidv4 } = require('uuid');

/**
 * Audit Logs model for daysave.app v1.0.1
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} AuditLogs model
 */
module.exports = (sequelize, DataTypes) => {
  const AuditLogs = sequelize.define('AuditLogs', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    details: {
      type: DataTypes.JSON,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'audit_logs',
    timestamps: true,
  });

  AuditLogs.associate = models => {
    AuditLogs.belongsTo(models.UserProfiles, { foreignKey: 'user_profile_id' });
  };

  return AuditLogs;
};