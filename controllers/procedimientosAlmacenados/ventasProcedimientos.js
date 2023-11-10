'use strict';

const db = require("../../models");
const Factura = db.facturas;
const { QueryTypes } = require('sequelize');

module.exports = {

  async Ventas(req, res) {
    try {
     const { fechaInicio, fechaFin } = req.params;
      const datos = await Factura.sequelize.query("CALL SP_Ventas_General(:fechaInicio, :fechaFin);", {
        replacements: {fechaInicio, fechaFin},
        type: QueryTypes.SELECT,
        model: Factura,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  },
};
