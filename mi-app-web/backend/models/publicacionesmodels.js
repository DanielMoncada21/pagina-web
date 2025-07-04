const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Publicaciones = sequelize.define('Publicaciones', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: true // Puede ser null si es texto sin archivo
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'publicaciones',
  timestamps: false
});

module.exports = Publicaciones;
  