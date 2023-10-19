'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Detalle_compra = db.detalle_compras;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Detalle_compra.findAll() 
        .then(detalle_compras => res.status(200).send(detalle_compras))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
      let id = req.body.id
      return Detalle_compra.findByPk(id)
      .then(detalle_compras => res.status(200).send(detalle_compras))
      .catch(error => res.status(400).send(error))
    }, 

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            cantidad: datos.cantidad,
            subtotal: datos.subtotal,
            estado: 1,
            id_compra: datos.id_compra,
            id_producto: datos.id_producto
        };
  
        Detalle_compra.create(datos_ingreso)
        .then(detalle_compras => {
            res.send(detalle_compras);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Detalle_compra.update(
            { 
                cantidad: datos.cantidad,
            subtotal: datos.subtotal,
            estado: 1,
            id_compra: datos.id_compra,
            id_producto: datos.id_producto
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(detalle_compras => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};