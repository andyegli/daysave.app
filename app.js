import express from 'express';
import session from 'express-session';
import { join } from 'path';
import { Sequelize } from 'sequelize';
import contentRoutes from './src/routes/contentRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import authMiddleware from './src/middlewares/authMiddleware.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(new URL(import.meta.url).pathname, '../public')));
app.use('/bootstrap', express.static(join(new URL(import.meta.url).pathname, '../node_modules/bootstrap/dist')));

// Session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with a secure secret in production
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Template engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', join(new URL(import.meta.url).pathname, '../src/views'));

// Routes
app.use('/', authRoutes);
app.use('/', contentRoutes);
app.use('/', contactRoutes);

// Route for contacts (requires authentication)
app.get('/contacts', authMiddleware.isAuthenticated, async (req, res) => {
  try {
    const db = (await import('./src/models/index.js')).default;
    const contacts = await db.Contacts.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Server error');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment variables - NODE_ENV: ${process.env.NODE_ENV}, DB_HOST: ${process.env.DB_HOST}`);
  try {
    // Create a temporary Sequelize instance to drop and create the database
    console.log('Creating temporary Sequelize instance to manage database...');
    const tempSequelize = new Sequelize(
      '',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || 'secret',
      {
        host: process.env.DB_HOST || 'db',
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: process.env.NODE_ENV !== 'production' ? console.log : false,
      }
    );

    console.log('Attempting to connect to the database...');
    await tempSequelize.authenticate();
    console.log('Temporary connection established successfully');

    console.log('Dropping database if it exists...');
    await tempSequelize.query('DROP DATABASE IF EXISTS daysave_db');
    console.log('Creating database...');
    await tempSequelize.query('CREATE DATABASE daysave_db');
    console.log('Database created successfully');

    await tempSequelize.close();
    console.log('Temporary connection closed');

    console.log('Importing database models...');
    const db = (await import('./src/models/index.js')).default;

    if (!db.sequelize) {
      throw new Error('db.sequelize is not defined after import');
    }

    console.log('Connecting to the new database with main Sequelize instance...');
    await db.sequelize.authenticate();
    console.log('Main connection established successfully');

    console.log('Disabling foreign key checks...');
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    console.log('Synchronizing database schema with force: true (drops existing tables)...');
    await db.sequelize.sync({ force: true });
    console.log('Database schema synchronized');

    console.log('Re-enabling foreign key checks...');
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Models loaded:', Object.keys(db));
    console.log('Checking user_profiles table columns...');
    const [userProfilesTable] = await db.sequelize.query("SHOW COLUMNS FROM user_profiles LIKE 'userId';");
    console.log('user_profiles.userId definition:', userProfilesTable);

    console.log('Checking if audit_logs table exists...');
    const [tables] = await db.sequelize.query("SHOW TABLES LIKE 'audit_logs';");
    if (tables.length > 0) {
      console.log('audit_logs table exists, querying columns...');
      const [auditLogsTable] = await db.sequelize.query("SHOW COLUMNS FROM audit_logs LIKE 'user_profile_id';");
      console.log('audit_logs.user_profile_id definition:', auditLogsTable);
    } else {
      console.warn('audit_logs table does not exist. Please ensure the AuditLogs model is correctly defined and loaded.');
    }
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
});

export default app;