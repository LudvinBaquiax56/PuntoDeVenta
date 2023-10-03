'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('producto_sucursales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 
      existencia: {
        type: Sequelize.INTEGER,
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
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
      },
      id_sucursal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'sucursales',
            key: 'id'
        }
      },
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('producto_sucursales');
  }
};