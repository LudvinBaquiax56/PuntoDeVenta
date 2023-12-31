'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sucursales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_sucursal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ubicacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sucursales');
  }
};