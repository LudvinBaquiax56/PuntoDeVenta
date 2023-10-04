'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historial_costos extends Model {
    static associate(models) {
          historial_costos.belongsTo(models.productos,{
            foreignKey: 'id_producto'
          })
    }
  };
  historial_costos.init({
      fecha: {
        type: DataTypes.DATE,
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
      costo: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'historial_costos',
    });
    return historial_costos;
  };