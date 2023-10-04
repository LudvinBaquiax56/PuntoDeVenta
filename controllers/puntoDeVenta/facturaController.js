'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Factura = db.facturas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Factura.findAll() 
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },


    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            no_factura: datos.no_factura,
            fecha: datos.fecha,
            subtotal: datos.subtotal,
            descuento: datos.descuento,
            total: datos.total,
            estado: 1,
            id_cliente: datos.id_cliente,
            id_sucursal: datos.id_sucursal,
            id_usuario: datos.id_usuario
        };
  
        Factura.create(datos_ingreso)
        .then(facturas => {
            res.send(facturas);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Factura.update(
            { 
                no_factura: datos.no_factura,
                fecha: datos.fecha,
                subtotal: datos.subtotal,
                descuento: datos.descuento,
                total: datos.total,
                estado: 1,
                id_cliente: datos.id_cliente,
                id_sucursal: datos.id_sucursal,
                id_usuario: datos.id_usuario
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(facturas => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};