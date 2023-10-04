'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producto_sucursales extends Model {
    static associate(models) {
      producto_sucursales.hasMany(models.historial_ajustes,{
        foreignKey: 'id_producto_sucursal'
      })
      producto_sucursales.belongsTo(models.productos,{
        foreignKey: 'id_producto'
      })
      producto_sucursales.belongsTo(models.sucursales,{
        foreignKey: 'id_sucursal'
      })
    }
  };
  producto_sucursales.init({
    existencia: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'producto_sucursales',
    });
    return producto_sucursales;
  };