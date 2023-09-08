'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proveedores extends Model {
    static associate(models) {
      proveedores.hasMany(models.compras, {
        foreignKey: 'id_proveedor'
      })
    }
  };
  proveedores.init({
    nit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'proveedores',
    });
    return proveedores;
  };