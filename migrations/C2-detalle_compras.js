'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detalle_compras', {
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
      subtotal: {
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
      id_compra: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'compras',
            key: 'id'
        }
      },
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
      },
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detalle_compras');
  }
};