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

  async RealizarVenta(req, res) {
    try {
     const { idFactura, idProducto, nuevoSubtotal, nuevoTotal, nuevaExistencia } = req.body;
      const datos = await Factura.sequelize.query("CALL SP_venta(:idFactura, :idProducto, :nuevoSubtotal, :nuevoTotal, :nuevaExistencia);", {
        replacements: {idFactura, idProducto, nuevoSubtotal, nuevoTotal, nuevaExistencia},
        type: QueryTypes.SELECT,
        model: Factura,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  }
};
