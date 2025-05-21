module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('content_analysis', {
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
      keywords: {
        type: Sequelize.JSON,
      },
      summary: {
        type: Sequelize.TEXT,
      },
      transcription: {
        type: Sequelize.TEXT,
      },
      objects: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('content_analysis');
  },
};