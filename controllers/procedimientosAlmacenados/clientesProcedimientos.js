'use strict';

const db = require("../../models");
const Cliente = db.clientes;
const { QueryTypes } = require('sequelize');

module.exports = {

  async PorSucursales(req, res) {
    try {
     const { sucursal } = req.body;
      const datos = await Cliente.sequelize.query("CALL SP_Clientes_ComprasPorSucursales(:sucursal);", {
        replacements: {sucursal},
        type: QueryTypes.SELECT,
        model: Cliente,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  },

  async DetalleCompras(req, res) {
    try {
     const { cliente } = req.body;
      const datos = await Cliente.sequelize.query("CALL SP_Clientes_DetalleCompras(:cliente);", {
        replacements: {cliente},
        type: QueryTypes.SELECT,
        model: Cliente,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  },
};



