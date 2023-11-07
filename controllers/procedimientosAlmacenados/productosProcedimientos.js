'use strict';

const db = require("../../models");
const Producto = db.productos;
const { QueryTypes } = require('sequelize');

module.exports = {

  async ExistenciaSucursal(req, res) {
    try {
     const { sucursal } = req.params;
      const datos = await Producto.sequelize.query("CALL SP_Productos_ExistenciaSucursal(:sucursal);", {
        replacements: {sucursal},
        type: QueryTypes.SELECT,
        model: Producto,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  },

  async MasVendidos(req, res) {
    try {
     const { fechaInicio, fechaFin } = req.params;
      const datos = await Producto.sequelize.query("CALL SP_Productos_MasVendidos(:fechaInicio, :fechaFin);", {
        replacements: {fechaInicio, fechaFin},
        type: QueryTypes.SELECT,
        model: Producto,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  },

  async MenosVendidos(req, res) {
    try {
     const { fechaInicio, fechaFin } = req.params;
      const datos = await Producto.sequelize.query("CALL SP_Productos_MenosVendidos(:fechaInicio, :fechaFin);", {
        replacements: {fechaInicio, fechaFin},
        type: QueryTypes.SELECT,
        model: Producto,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  },

};



