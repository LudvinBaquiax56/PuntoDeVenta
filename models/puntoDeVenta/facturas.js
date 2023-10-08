'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facturas extends Model {
    static associate(models) {
      facturas.hasMany(models.detalle_facturas, {
        foreignKey: 'id_factura'
      })
      facturas.belongsTo(models.clientes,{
        foreignKey: 'id_cliente'
      })
      facturas.belongsTo(models.sucursales,{
        foreignKey: 'id_sucursal'
      })
      facturas.belongsTo(models.usuarios,{
        foreignKey: 'id_usuario'
      })
    }
  };
  facturas.init({
     no_factura: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      descuento: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'facturas',
    });
    return facturas;
  };