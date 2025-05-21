module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment_providers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid'),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('payment_providers');
  },
};