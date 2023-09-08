'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      roles.hasMany(models.usuarios, {
        foreignKey: 'id_rol'
      })
    }
  };
  roles.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'roles',
    });
    return roles;
  };