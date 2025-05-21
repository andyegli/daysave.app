module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('social_profiles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid'),
        primaryKey: true,
      },
      contact_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'contacts', key: 'id' },
        onDelete: 'CASCADE',
      },
      social_provider_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'social_providers', key: 'id' },
        onDelete: 'CASCADE',
      },
      social_id: {
        type: Sequelize.STRING(255),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('social_profiles');
  },
};