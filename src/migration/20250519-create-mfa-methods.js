module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mfa_methods', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid'),
        primaryKey: true,
      },
      user_profile_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'user_profiles', key: 'id' },
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.ENUM('totp', 'sms', 'email', 'backup_codes'),
        allowNull: false,
      },
      config: {
        type: Sequelize.JSON,
      },
      is_primary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('mfa_methods');
  },
};