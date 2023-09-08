'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categorias extends Model {
    static associate(models) {
      categorias.hasMany(models.productos, {
        foreignKey: 'id_categoria'
      })
    }
  };
  categorias.init({
    no_sucursal: {
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
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'categorias',
    });
    return categorias;
  };