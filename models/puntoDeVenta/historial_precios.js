'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historial_precios extends Model {
    static associate(models) {
          historial_precios.belongsTo(models.productos,{
            foreignKey: 'id_producto'
          })
          historial_precios.belongsTo(models.usuarios,{
            foreignKey: 'id_usuario'
          })
    }
  };
  historial_precios.init({
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
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'historial_precios',
    });
    return historial_precios;
  };