'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalle_facturas extends Model {
    static associate(models) {
      detalle_facturas.belongsTo(models.facturas,{
        foreignKey: 'id_factura'
      })
      detalle_facturas.belongsTo(models.productos,{
        foreignKey: 'id_producto'
      })
    }
  };
  detalle_facturas.init({
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ganancia: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_factura: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'detalle_facturas',
    });
    return detalle_facturas;
  };