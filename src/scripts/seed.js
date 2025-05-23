import { resolve } from 'path';
import { existsSync, statSync, readFileSync, constants, accessSync } from 'fs';

// Resolve the path to models/index.js
const modelsIndexPath = resolve(new URL(import.meta.url).pathname, '../../models/index.js');
console.log('Resolved models/index.js path:', modelsIndexPath);

// Check if the file exists
if (!existsSync(modelsIndexPath)) {
  console.error('Error: models/index.js file does not exist at:', modelsIndexPath);
  process.exit(1);
}

// Log file stats
try {
  const stats = statSync(modelsIndexPath);
  console.log('models/index.js file stats:', stats);
  console.log('File size (bytes):', stats.size);
  console.log('File permissions:', stats.mode.toString(8));
  console.log('File is readable:', accessSync(modelsIndexPath, constants.R_OK) === undefined);
} catch (error) {
  console.error('Error accessing models/index.js file stats:', error);
  process.exit(1);
}

// Attempt to read the file content
try {
  const fileContent = readFileSync(modelsIndexPath, 'utf8');
  console.log('models/index.js file content (first 100 characters):', fileContent.substring(0, 100));
} catch (error) {
  console.error('Error reading models/index.js file content:', error);
  process.exit(1);
}

// Attempt to import the module
let db;
try {
  console.log('Attempting to import ../models/index...');
  db = await import(new URL('../models/index.js', import.meta.url).href);
  console.log('Successfully imported ../models/index');
} catch (error) {
  console.error('Error importing ../models/index:', error);
  console.error('Error stack:', error.stack);
  process.exit(1);
}

// Verify sequelize instance and models
if (!db.sequelize) {
  console.error('Error: db.sequelize is not defined');
  process.exit(1);
}
console.log('Sequelize instance loaded:', !!db.sequelize);

if (!db.UserProfiles) {
  console.error('Error: db.UserProfiles is not defined');
  console.log('Available models in db:', Object.keys(db));
  process.exit(1);
}
console.log('UserProfiles model loaded:', !!db.UserProfiles);

// Synchronize the database schema
try {
  console.log('Synchronizing database schema with force: true (drops existing tables)...');
  await db.sequelize.sync({ force: true });
  console.log('Database schema synchronized');
} catch (error) {
  console.error('Error synchronizing database schema:', error);
  process.exit(1);
}

// Resolve the path to seedDatabase.js
const seedDatabasePath = resolve(new URL(import.meta.url).pathname, '../../seeders/seedDatabase.js');
console.log('Resolved seedDatabase.js path:', seedDatabasePath);

// Check if the file exists
if (!existsSync(seedDatabasePath)) {
  console.error('Error: seedDatabase.js file does not exist at:', seedDatabasePath);
  process.exit(1);
}

// Log file stats
try {
  const seedStats = statSync(seedDatabasePath);
  console.log('seedDatabase.js file stats:', seedStats);
  console.log('File size (bytes):', seedStats.size);
  console.log('File permissions:', seedStats.mode.toString(8));
  console.log('File is readable:', accessSync(seedDatabasePath, constants.R_OK) === undefined);
} catch (error) {
  console.error('Error accessing seedDatabase.js file stats:', error);
  process.exit(1);
}

// Attempt to read the file content
try {
  const seedFileContent = readFileSync(seedDatabasePath, 'utf8');
  console.log('seedDatabase.js file content (first 100 characters):', seedFileContent.substring(0, 100));
} catch (error) {
  console.error('Error reading seedDatabase.js file content:', error);
  process.exit(1);
}

// Attempt to import the module
let seedDatabase;
try {
  console.log('Attempting to import ../seeders/seedDatabase...');
  seedDatabase = (await import(new URL('../seeders/seedDatabase.js', import.meta.url).href)).default;
  console.log('Successfully imported ../seeders/seedDatabase');
  console.log('Type of seedDatabase:', typeof seedDatabase);
  console.log('seedDatabase value:', seedDatabase);
} catch (error) {
  console.error('Error importing ../seeders/seedDatabase:', error);
  console.error('Error stack:', error.stack);
  process.exit(1);
}

// Verify seedDatabase is a function
if (typeof seedDatabase !== 'function') {
  console.error('Error: seedDatabase is not a function. Actual type:', typeof seedDatabase);
  console.error('seedDatabase value:', seedDatabase);
  process.exit(1);
}

try {
  await seedDatabase(db); // Pass the entire db object
  console.log('Database seeding completed successfully.');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}