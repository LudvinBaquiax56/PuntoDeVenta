'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Historial_costo = db.historial_costos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Historial_costo.findAll() 
        .then(historial_costos => res.status(200).send(historial_costos))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Historial_costo.findByPk(id)
        .then(historial_costos => res.status(200).send(historial_costos))
        .catch(error => res.status(400).send(error))
      }, 

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            fecha: datos.fecha,
            descripcion: datos.descripcion,
            estado: 1,
            costo: datos.costo,
            id_producto: datos.id_producto
        };
  
        Historial_costo.create(datos_ingreso)
        .then(historial_costos => {
            res.send(historial_costos);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
};