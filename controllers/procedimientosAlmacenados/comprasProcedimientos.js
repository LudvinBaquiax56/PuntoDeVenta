'use strict';

const db = require("../../models");
const Compra = db.compras;
const { QueryTypes } = require('sequelize');

module.exports = {

  async Compras(req, res) {
    try {
     const { fechaInicio, fechaFin } = req.params;
      const datos = await Compra.sequelize.query("CALL SP_Compras_General(:fechaInicio, :fechaFin);", {
        replacements: {fechaInicio, fechaFin},
        type: QueryTypes.SELECT,
        model: Compra,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  }

};
