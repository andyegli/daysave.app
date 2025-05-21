module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
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
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      phone_numbers: {
        type: Sequelize.JSON,
      },
      addresses: {
        type: Sequelize.JSON,
      },
      emails: {
        type: Sequelize.JSON,
      },
      social_profiles: {
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
    await queryInterface.dropTable('contacts');
  },
};