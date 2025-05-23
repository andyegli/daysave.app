const express = require('express');
const path = require('path');
const contentRoutes = require('./src/routes/contentRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const authMiddleware = require('./src/middlewares/authMiddleware');
const { Sequelize } = require('sequelize');
const db = require('./src/models');

/**
 * Main application setup for daysave.app v1.0.1
 */
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Template engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', contentRoutes);
app.use('/', contactRoutes);

// Basic route for homepage
app.get('/', authMiddleware.isAuthenticated, (req, res) => {
  res.redirect('/content');
});

// Route for contacts
app.get('/contacts', authMiddleware.isAuthenticated, async (req, res) => {
  try {
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

    // Manually drop the database to ensure a clean slate
    console.log('Dropping database if it exists...');
    await tempSequelize.query('DROP DATABASE IF EXISTS daysave_db');
    console.log('Creating database...');
    await tempSequelize.query('CREATE DATABASE daysave_db');
    console.log('Database created successfully');

    // Close the temporary connection
    await tempSequelize.close();
    console.log('Temporary connection closed');

    // Use the main Sequelize instance to connect to the new database
    console.log('Connecting to the new database with main Sequelize instance...');
    const sequelize = require('./src/config/database');
    await sequelize.authenticate();
    console.log('Main connection established successfully');

    // Temporarily disable foreign key checks to isolate the issue
    console.log('Disabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    console.log('Synchronizing database schema with force: true (drops existing tables)...');
    await sequelize.sync({ force: true }); // Use force: true to drop and recreate tables
    console.log('Database schema synchronized');

    // Re-enable foreign key checks
    console.log('Re-enabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Models loaded:', Object.keys(db));
    // Additional logging to verify table definitions
    console.log('Checking user_profiles table columns...');
    const [userProfilesTable] = await sequelize.query("SHOW COLUMNS FROM user_profiles LIKE 'userId';");
    console.log('user_profiles.userId definition:', userProfilesTable);

    console.log('Checking if audit_logs table exists...');
    const [tables] = await sequelize.query("SHOW TABLES LIKE 'audit_logs';");
    if (tables.length > 0) {
      console.log('audit_logs table exists, querying columns...');
      const [auditLogsTable] = await sequelize.query("SHOW COLUMNS FROM audit_logs LIKE 'user_profile_id';");
      console.log('audit_logs.user_profile_id definition:', auditLogsTable);
    } else {
      console.warn('audit_logs table does not exist. Please ensure the AuditLogs model is correctly defined and loaded.');
    }
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
});

module.exports = app;