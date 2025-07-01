const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('visor_contenido', 'root', '2104', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;