import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_DATABASE || 'daysave_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'secret',
  {
    host: process.env.DB_HOST || 'db',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  }
);

export default sequelize;