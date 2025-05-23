const sequelize = require('./src/config/database');
const seedDatabase = require('./src/seeders/seedDatabase');

(async () => {
  try {
    await seedDatabase(sequelize);
    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
})();