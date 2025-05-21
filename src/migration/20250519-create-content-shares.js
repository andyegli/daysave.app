module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('content_shares', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid'),
        primaryKey: true,
      },
      content_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'content', key: 'id' },
        onDelete: 'CASCADE',
      },
      contact_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'contacts', key: 'id' },
        onDelete: 'CASCADE',
      },
      shared_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable('content_shares');
  },
};