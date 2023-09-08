'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    static associate(models) {
      productos.hasMany(models.producto_sucursales, {
        foreignKey: 'id_producto'
      })
      productos.hasMany(models.historial_ajustes, {
        foreignKey: 'id_producto'
      })
      productos.hasMany(models.detalle_facturas, {
        foreignKey: 'id_producto'
      })
      productos.hasMany(models.detalle_compras, {
        foreignKey: 'id_producto'
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
        allowNull: false
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false
      },
      costo: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      precio_normal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      precio_oferta: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado: {
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