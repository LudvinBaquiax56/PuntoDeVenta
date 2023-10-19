'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Historial_precio = db.historial_precios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Historial_precio.findAll() 
        .then(historial_precios => res.status(200).send(historial_precios))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Historial_precio.findByPk(id)
        .then(historial_precios => res.status(200).send(historial_precios))
        .catch(error => res.status(400).send(error))
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