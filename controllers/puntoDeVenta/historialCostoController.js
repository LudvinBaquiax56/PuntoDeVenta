'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Historial_costo = db.historial_costos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Historial_costo.findAll({
            where: {estado: 1}
          }) 
        .then(historial_costos => res.status(200).send(historial_costos))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const historial_costos = await Historial_costo.findOne({
            where: {
              id: id,
              estado: 1
            }
          });
          if (!historial_costos) {
            return res.status(404).json({ error: 'Dato no encontrado' });
          }
          res.status(200).json(historial_costos);
      },

      create(req, res) {
        let datos = req.body;
    
        Historial_costo.findOne({
            where: {
                id_producto: datos.id_producto,
                estado: 1
            },
            order: [['createdAt', 'DESC']],
            limit: 1
        })
        .then(costos => {
            if (!costos) {
                return res.status(404).json({ error: 'Costo no encontrado' });
            } else {
                if (datos.costo != costos.costo) {
                    const datos_ingreso = { 
                        fecha: new Date(),
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
                        console.log(error);
                        return res.status(500).json({ error: 'Error al insertar' });
                    });
                }else{
                  return res.status(404).json({ error: 'Costo no modificado' });
                }
            }
        });
    }
    
};