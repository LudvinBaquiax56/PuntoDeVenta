'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sucursales extends Model {
    static associate(models) {
      sucursales.hasMany(models.producto_sucursales, {
        foreignKey: 'id_sucursal'
      })
      sucursales.hasMany(models.facturas, {
        foreignKey: 'id_sucursal'
      })
      sucursales.hasMany(models.compras, {
        foreignKey: 'id_sucursal'
      })
      sucursales.hasMany(models.usuarios, {
        foreignKey: 'id_sucursal'
      })
    }
  };
  sucursales.init({
    no_sucursal: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'sucursales',
    });
    return sucursales;
  };