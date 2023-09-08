'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historial_ajustes extends Model {
    static associate(models) {
      historial_ajustes.belongsTo(models.usuarios,{
        foreignKey: 'id_usuario'
      })
      historial_ajustes.belongsTo(models.productos,{
        foreignKey: 'id_producto'
      })
      historial_ajustes.belongsTo(models.sucursales,{
        foreignKey: 'id_sucursal'
      })
    }
  };
  historial_ajustes.init({
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false
      },
      razon: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'historial_ajustes',
    });
    return historial_ajustes;
  };