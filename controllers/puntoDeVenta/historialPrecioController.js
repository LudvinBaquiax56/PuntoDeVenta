'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Historial_precio = db.historial_precios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Historial_precio.findAll({
            where: {estado: 1}
          }) 
        .then(historial_precios => res.status(200).send(historial_precios))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const historial_precios = await Historial_precio.findOne({
            where: {
              id: id,
              estado: 1
            }
          });
          if (!historial_precios) {
            return res.status(404).json({ error: 'Dato no encontrado' });
          }
          res.status(200).json(historial_precios);
      },

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            fecha: datos.fecha,
            descripcion: datos.descripcion,
            estado: 1,
            precio: datos.precio,
            id_producto: datos.id_producto,
            id_usuario: datos.id_usuario
        };
  
        Historial_precio.create(datos_ingreso)
        .then(historial_precios => {
            res.send(historial_precios);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
};