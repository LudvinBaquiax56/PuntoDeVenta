'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Detalle_factura = db.detalle_facturas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Detalle_factura.findAll() 
        .then(detalle_facturas => res.status(200).send(detalle_facturas))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
      let id = req.body.id
      return Detalle_factura.findByPk(id)
      .then(detalle_facturas => res.status(200).send(detalle_facturas))
      .catch(error => res.status(400).send(error))
    }, 

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            cantidad: datos.cantidad,
            subtotal: datos.subtotal,
            ganancia: datos.ganancia,
            estado: 1,
            id_factura: datos.id_factura,
            id_producto: datos.id_producto
        };
  
        Detalle_factura.create(datos_ingreso)
        .then(detalle_facturas => {
            res.send(detalle_facturas);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Detalle_factura.update(
            { 
                cantidad: datos.cantidad,
                subtotal: datos.subtotal,
                ganancia: datos.ganancia,
                estado: 1,
                id_factura: datos.id_factura,
                id_producto: datos.id_producto
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(detalle_facturas => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};