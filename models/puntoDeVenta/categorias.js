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
    }, {
      sequelize,
      modelName: 'categorias',
    });
    return categorias;
  };