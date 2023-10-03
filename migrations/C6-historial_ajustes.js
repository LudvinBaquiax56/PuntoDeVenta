'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('historial_ajustes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fecha_hora: {
        type: Sequelize.DATE,
        allowNull: false
      },
      razon: {
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
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
      },
      id_producto_sucursal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'producto_sucursales',
            key: 'id'
        }
      },
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('historial_ajustes');
  }
};