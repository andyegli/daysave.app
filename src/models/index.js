'use strict';

/**
 * This file serves as the central hub for loading and configuring Sequelize models in the daysave.app application.
 * It dynamically imports all model files in the src/models directory, sets up their associations, and exports a database
 * object (`db`) that contains all models along with the Sequelize instance for use throughout the application.
 */

// Import required Node.js modules
const fs = require('fs'); // File system module to read the directory contents
const path = require('path'); // Path module to handle file paths
const Sequelize = require('sequelize'); // Sequelize ORM library for database interaction
const basename = path.basename(__filename); // Get the filename of this file (index.js) to exclude it from model loading
const db = {}; // Initialize an empty object to store all models and the Sequelize instance

// Import the Sequelize configuration and instance from the database config file
const sequelize = require('../config/database');

/**
 * Dynamically load all model files in the src/models directory.
 * - `fs.readdirSync(__dirname)` reads all files in the current directory (src/models).
 * - `filter` ensures we only process JavaScript files (ending with .js), excluding hidden files (starting with '.') and this file (index.js).
 * - Explicitly control the loading order to avoid circular dependencies.
 */
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Exclude hidden files (e.g., .DS_Store)
      file !== basename && // Exclude this file (index.js)
      file.slice(-3) === '.js' // Include only JavaScript files
    );
  })
  .sort((a, b) => {
    // Load models that UserProfiles depends on first to avoid association issues
    const priorityOrder = [
      'role_permissions.js',
      'audit_logs.js', // Ensure AuditLogs is loaded early
      'content.js',
      'comments.js',
      'auth_providers.js',
      'contacts.js',
      'contact_groups.js',
      'content_shares.js',
      'fingerprints.js',
      'mfa_methods.js',
      'subscriptions.js',
      'content_sources.js',
      'contact_group_members.js',
      'content_analysis.js',
      'content_tags.js',
      'payment_providers.js',
      'payment_transactions.js',
      'permissions.js',
      'roles.js',
      'social_profiles.js',
      'social_providers.js',
      'statistics.js',
      'subscription_grace_periods.js',
      'tags.js',
      'user_roles.js',
    ];

    // Ensure user_profiles.js is loaded last
    if (a === 'user_profiles.js') return 1;
    if (b === 'user_profiles.js') return -1;

    // Sort based on priorityOrder
    const aIndex = priorityOrder.indexOf(a);
    const bIndex = priorityOrder.indexOf(b);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return a.localeCompare(b);
  });

console.log('Model files found (sorted):', modelFiles);

modelFiles.forEach(file => {
  try {
    // Require the model file and initialize it with sequelize and Sequelize.DataTypes
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // Add the initialized model to the db object with its name as the key
    db[model.name] = model;
    console.log(`Loaded model: ${model.name}`);
  } catch (error) {
    console.error(`Error loading model from file ${file}:`, error);
    throw error; // Throw the error to stop execution if a model fails to load
  }
});

/**
 * Set up associations between models.
 * - Iterate through all loaded models in the db object.
 * - If a model has an `associate` method (defined in the model file), call it to define relationships (e.g., belongsTo, hasMany).
 * - Pass the entire db object to the associate method so the model can reference other models for associations.
 */
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    console.log(`Setting up associations for model: ${modelName}`);
    try {
      db[modelName].associate(db);
    } catch (error) {
      console.error(`Error setting up associations for model ${modelName}:`, error);
      throw error; // Throw the error to stop execution if associations fail
    }
  }
});

// Attach the Sequelize instance and Sequelize constructor to the db object for easy access
db.sequelize = sequelize; // The Sequelize instance configured in src/config/database.js
db.Sequelize = Sequelize; // The Sequelize constructor for advanced usage if needed

// Export the db object, which contains all models and the Sequelize instance, for use in the application
module.exports = db;