'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Factura = db.facturas;
const Cliente = db.clientes;
const Usuario = db.usuarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Factura.findAll({
          where: {estado: 1}
        }) 
        .then(facturas => res.status(200).send(facturas))
        .catch(error => res.status(400).send(error))
    },

    findAnulados (req, res) {
      return Factura.findAll({
        where: {estado: 0}
      }) 
      .then(facturas => res.status(200).send(facturas))
      .catch(error => res.status(400).send(error))
  },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const facturas = await Factura.findOne({
        where: {
          id: id,
          estado: 1
        }
      });
        if (!facturas) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(facturas);
    },

    create (req, res) {
        let datos = req.body 
        Usuario.findOne({
          where: {
              id: datos.id_usuario,
              estado: 1
          }
      })
      .then(usuario => {
          if (!usuario) {
              return res.status(404).json({ error: 'Usuario no encontrado' });
          } else {
        Cliente.findOne({
          where: {
            id: datos.id_cliente,
            estado: 1
          }
        })
      .then(cliente => {
          if (!cliente) {
              return res.status(404).json({ error: 'Cliente no encontrado' });
          }
        const datos_ingreso = { 
            no_factura: datos.no_factura,
            fecha: new Date(),
            subtotal: 0,
            descuento: datos.descuento,
            total: 0,
            estado: 1,
            id_cliente: datos.id_cliente,
            id_sucursal: usuario.id_sucursal,
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
      })
      } }) },
  
      update (req, res) {
        let datos = req.body
          Factura.update(
            { 
              no_factura: datos.no_factura,
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

      async delete (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const facturas = await Factura.findOne({
          where: {
            id: id,
            estado: 1
          }
        });
          if (!facturas) {
            return res.status(404).json({ error: 'Dato no encontrado' });
          }
          Factura.update(
            {estado: 0},
            {where: {id: id}}
          )
          .then(facturas => res.status(200).send('El registro ha sido eliminado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al eliminar' });
          });
      },
};