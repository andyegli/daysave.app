module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('content_tags', {
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
      tag_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'tags', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('content_tags');
  },
};