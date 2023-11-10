'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compras extends Model {
    static associate(models) {
      compras.hasMany(models.detalle_compras, {
        foreignKey: 'id_compra'
      })
      compras.belongsTo(models.proveedores,{
        foreignKey: 'id_proveedor'
      })
      compras.belongsTo(models.sucursales,{
        foreignKey: 'id_sucursal'
      })
      compras.belongsTo(models.usuarios,{
        foreignKey: 'id_usuario'
      })
    }
  };
  compras.init({
    no_factura: {
        type: DataTypes.STRING,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      total: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_proveedor: {
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
      modelName: 'compras',
    });
    return compras;
  };