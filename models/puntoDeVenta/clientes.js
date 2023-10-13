'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    static associate(models) {
      clientes.hasMany(models.facturas, {
        foreignKey: 'id_cliente'
      })
    }
  };
  clientes.init({
      dpi: {
        type: DataTypes.STRING,
      },
      nit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      puntos_privilegio: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'clientes',
    });
    return clientes;
  };