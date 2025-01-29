const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Restuarant', 'root', 'Password@2024', {
    host: 'localhost',
    dialect: 'mysql' 
});

module.exports = sequelize;