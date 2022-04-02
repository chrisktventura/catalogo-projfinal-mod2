const Sequelize = require("sequelize");

const sequelize = new Sequelize('teste', 'postgres', 'pass', { dialect: 'postgres', host: 'localhost', port: 5432 });

module.exports = sequelize;