import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from 'sequelize';

async function seed() {
  let sequelize;
  try {
    // Initialize Sequelize directly
    sequelize = new Sequelize(
      process.env.DB_NAME || 'daysave_db',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || 'secret',
      {
        host: process.env.DB_HOST || 'db',
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: process.env.NODE_ENV !== 'production' ? console.log : false,
      }
    );

    console.log('Attempting to connect to the database...');
    await sequelize.authenticate();
    console.log('Connection established successfully');

    // Load only the models needed for seeding
    const UserProfiles = (await import('../models/user_profiles.js')).default(sequelize, Sequelize.DataTypes);
    const AuthProviders = (await import('../models/auth_providers.js')).default(sequelize, Sequelize.DataTypes);
    const Content = (await import('../models/content.js')).default(sequelize, Sequelize.DataTypes);

    // Sync the models (create tables if they don't exist)
    await sequelize.sync({ force: true });
    console.log('Database schema synchronized');

    // Seed the data
    const user = await UserProfiles.create({
      userId: '550e8400-e29b-41d4-a716-446655440000',
      username: 'testuser',
      email: 'testuser@example.com',
    });

    await AuthProviders.create({
      id: uuidv4(),
      user_profile_id: user.userId,
      provider: 'local',
      hashed_password: 'password123', // Plain text for testing; use bcrypt in production
    });

    await Content.create({
      id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      userId: user.userId,
      title: 'My First Post',
      body: 'This is my first post!',
    });

    await Content.create({
      id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
      userId: user.userId,
      title: 'Another Post',
      body: 'This is another post!',
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error; // Rethrow to ensure the script fails visibly if there's an error
  } finally {
    if (sequelize) {
      await sequelize.close();
      console.log('Sequelize connection closed');
    }
  }
}

seed().catch(error => {
  console.error('Seed script failed:', error);
  process.exit(1);
});