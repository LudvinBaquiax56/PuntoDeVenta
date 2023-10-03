'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class marcas extends Model {
    static associate(models) {
      marcas.hasMany(models.productos, {
        foreignKey: 'id_marca'
      })
    }
  };
  marcas.init({
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
      modelName: 'marcas',
    });
    return marcas;
  };