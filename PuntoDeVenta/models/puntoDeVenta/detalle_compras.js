'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalle_compras extends Model {
    static associate(models) {
      detalle_compras.belongsTo(models.compras,{
        foreignKey: 'id_compra'
      })
      detalle_compras.belongsTo(models.productos,{
        foreignKey: 'id_producto'
      })
    }
  };
  detalle_compras.init({
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'detalle_compras',
    });
    return detalle_compras;
  };