module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auth_providers', {
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
      provider: {
        type: Sequelize.ENUM('local', 'google', 'github', 'apple', 'passkey', 'microsoft', 'facebook', 'twitter', 'instagram'),
        allowNull: false,
      },
      provider_user_id: {
        type: Sequelize.STRING(255),
      },
      hashed_password: {
        type: Sequelize.STRING(255),
      },
      passkey_data: {
        type: Sequelize.JSON,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('auth_providers');
  },
};