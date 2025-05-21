const { Sequelize } = require('sequelize');
require('dotenv').config();

/**

Sequelize database configuration
@returns {Sequelize} Configured Sequelize instance */ const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'mysql', dialectOptions: { ssl: { require: true, // Enforce SSL for data in transit }, }, define: { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci', timestamps: true, paranoid: true, // Soft deletes }, });
module.exports = sequelize;

// .devcontainer/devcontainer.json
{
"name": "daysave-app",
"dockerComposeFile": "docker-compose.yml",
"service": "app",
"workspaceFolder": "/workspace",
"extensions": [
"dbaeumer.vscode-eslint",
"webfreak.plantuml"
],
"settings": {
"plantuml.server": "http://plantuml:8080"
}
}