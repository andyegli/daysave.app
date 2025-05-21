module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contact_groups', {
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
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('contact_groups');
  },
};