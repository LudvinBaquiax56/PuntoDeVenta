'use strict';

const db = require("../../models");
const Cliente = db.clientes;
const { QueryTypes } = require('sequelize');

module.exports = {

  async General(req, res) {
    try {
     const { sucursal } = req.params;
      const datos = await Cliente.sequelize.query("SELECT * FROM VW_Clientes_General;", {
        type: QueryTypes.SELECT,
        model: Cliente,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  }
};