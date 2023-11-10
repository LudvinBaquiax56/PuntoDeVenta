'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    static associate(models) {
      usuarios.hasMany(models.facturas, {
        foreignKey: 'id_usuario'
      })
      usuarios.hasMany(models.compras, {
        foreignKey: 'id_usuario'
      })
      usuarios.hasMany(models.historial_precios, {
        foreignKey: 'id_usuario'
      })
      usuarios.hasMany(models.historial_ajustes, {
        foreignKey: 'id_usuario'
      })
      usuarios.belongsTo(models.empleados,{
        foreignKey: 'id_empleado'
      })
      usuarios.belongsTo(models.roles,{
        foreignKey: 'id_rol'
      })
      usuarios.belongsTo(models.sucursales,{
        foreignKey: 'id_sucursal'
      })
    }
  };
  usuarios.init({
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'usuarios',
    });
    return usuarios;
  };