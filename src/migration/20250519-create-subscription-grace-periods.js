module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscription_grace_periods', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid'),
        primaryKey: true,
      },
      subscription_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'subscriptions', key: 'id' },
        onDelete: 'CASCADE',
      },
      extended_end_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('subscription_grace_periods');
  },
};