'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Historial_ajuste = db.historial_ajustes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Historial_ajuste.findAll({
            where: {estado: 1}
          }) 
        .then(historial_ajustes => res.status(200).send(historial_ajustes))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const historial_ajustes = await Historial_ajuste.findOne({
            where: {
              id: id,
              estado: 1
            }
          });
          if (!historial_ajustes) {
            return res.status(404).json({ error: 'Dato no encontrado' });
          }
          res.status(200).json(historial_ajustes);
      },

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            cantidad: datos.cantidad,
            fecha_hora: datos.fecha_hora,
            razon: datos.razon,
            estado: 1,
            id_usuario: datos.id_usuario,
            id_producto_sucursal: datos.id_producto_sucursal
        };
  
        Historial_ajuste.create(datos_ingreso)
        .then(historial_ajustes => {
            res.send(historial_ajustes);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
};