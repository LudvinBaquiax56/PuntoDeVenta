'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_factura: {
        type: Sequelize.STRING,
      },
      fecha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total: {
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
      id_proveedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'proveedores',
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
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
      },
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('compras');
  }
};