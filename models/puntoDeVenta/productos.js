'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    static associate(models) {
      productos.hasMany(models.detalle_facturas, {
        foreignKey: 'id_producto'
      })
      productos.hasMany(models.detalle_compras, {
        foreignKey: 'id_producto'
      })
      productos.hasMany(models.producto_sucursales, {
        foreignKey: 'id_producto'
      })
      productos.hasMany(models.historial_precios, {
        foreignKey: 'id_producto'
      })
      productos.hasMany(models.historial_costos, {
        foreignKey: 'id_producto'
      })
      productos.belongsTo(models.marcas,{
        foreignKey: 'id_marca'
      })
      productos.belongsTo(models.categorias,{
        foreignKey: 'id_categoria'
      })
    }
  };
  productos.init({
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_marca: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'productos',
    });
    return productos;
  };