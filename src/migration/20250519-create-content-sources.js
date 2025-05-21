module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('content_sources', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid'),
        primaryKey: true,
      },
      name: {
        type: Sequelize.ENUM(
          'youtube', 'facebook', 'instagram', 'upload', 'weblink',
          'whatsapp', 'whatsappbusiness', 'teams', 'zoom', 'threema',
          'linkedin', 'messenger', 'telegram', 'discord', 'snapchat',
          'threads', 'slack', 'github', 'signal', 'gmail', 'simple',
          'tiktok', 'revolut'
        ),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('content_sources');
  },
};