
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('content', [
      {
        uuid: Sequelize.literal('NEWID()'),
        userId: 1,
        url: 'https://example.com/demo',
        title: 'Demo Post',
        summary: 'Demo summary',
        location: 'Auckland',
        creatorType: 'user',
        savedAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('content', null, {});
  }
};
