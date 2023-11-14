'use strict';

const db = require("../../models");
const Producto = db.productos;
const { QueryTypes } = require('sequelize');

module.exports = {

  async ExistenciaMenor20(req, res) {
    try {
      const datos = await Producto.sequelize.query("SELECT * FROM VW_Productos_ExistenciaMenor20;", {
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

  async CantidadExistenciaMenor20(req, res) {
    try {
      const datos = await Producto.sequelize.query("SELECT * FROM VW_Productos_CantidadExistenciaMenor20;", {
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

  async General(req, res) {
    try {
      const datos = await Producto.sequelize.query("SELECT * FROM VW_Productos_General;", {
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

  async ExistenciaGeneral(req, res) {
    try {
      const datos = await Producto.sequelize.query("SELECT * FROM VW_Productos_ExistenciaGeneral;", {
        type: QueryTypes.SELECT,
        model: Producto,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  },
};