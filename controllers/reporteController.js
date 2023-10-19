'use strict';

const Sequelize = require('sequelize');
const db = require("../models");
const Producto = db.productos;
const { QueryTypes } = require('sequelize');
const moment = require('moment');
const axios = require('axios');
const { Op } = require("sequelize");

module.exports = {
  /*procedimientoProductos(req, res) {
      const sequelize = new Sequelize('proyectofinal1', 'root', null, {
          host: 'localhost',
          dialect: 'mysql'
      });

      sequelize.query('CALL PA_Productos()')
          .then(([results]) => {
              console.log(results);
              res.status(200).send(results);
          })
          .catch(error => {
              console.error(error);
              res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
          });
  },*/

  async procedimientoProductos(req, res) {
    try {
      const datos = await Producto.sequelize.query("CALL PA_Productos();", {
        type: QueryTypes.SELECT,
        model: Producto,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  }
};


  

