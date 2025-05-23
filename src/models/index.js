import { readdirSync } from 'fs';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const db = {};

console.log('Loading sequelize instance...');
const sequelize = await import(new URL('../config/database.js', import.meta.url).href).then(mod => mod.default);

// Assign sequelize to db immediately
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const modelFiles = readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename(__filename) &&
      file.slice(-3) === '.js'
    );
  })
  .sort((a, b) => {
    const priorityOrder = [
      'role_permissions.js',
      'audit_logs.js',
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
      'user_profiles.js'
    ];

    if (a === 'user_profiles.js') return 1;
    if (b === 'user_profiles.js') return -1;

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

for (const file of modelFiles) {
  try {
    const modelModule = await import(new URL(join(__dirname, file), import.meta.url).href);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    console.log(`Loaded model: ${model.name}`);
  } catch (error) {
    console.error(`Error loading model from file ${file}:`, error);
    throw error;
  }
}

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    console.log(`Setting up associations for model: ${modelName}`);
    try {
      db[modelName].associate(db);
    } catch (error) {
      console.error(`Error setting up associations for model ${modelName}:`, error);
      throw error;
    }
  }
}

export default db;