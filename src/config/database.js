import { Sequelize } from 'sequelize';

/**
 * Database configuration for daysave.app
 */
const sequelize = new Sequelize(
  process.env.DB_DATABASE || 'daysave_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'db',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.NODE_ENV !== 'production' ? console.log : false,
    retry: {
      max: 5,
      timeout: 10000,
    },
  }
);

export default sequelize;