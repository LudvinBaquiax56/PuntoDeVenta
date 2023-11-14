'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Compra = db.compras;
const Usuario = db.usuarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Compra.findAll({
          where: {
            estado: 1
          }
        }) 
        .then(compras => res.status(200).send(compras))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const compras = await Compra.findOne({
        where: {
          id: id,
          estado: 1
        }
      });
        if (!compras) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(compras);
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
        const datos_ingreso = {
            no_factura: datos.no_factura,
            fecha: new Date(),
            total: 0,
            estado: 1,
            id_proveedor: datos.id_proveedor,
            id_sucursal: usuario.id_sucursal,
            id_usuario: datos.id_usuario
        };
  
        Compra.create(datos_ingreso)
        .then(compras => {
            res.send(compras);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
         }})
      },

  
      update (req, res) {
        let datos = req.body
          Compra.update(
            { 
                no_factura: datos.no_factura,
                fecha: datos.fecha,
                total: datos.total,
                estado: 1,
                id_proveedor: datos.id_proveedor,
                id_sucursal: datos.id_sucursal,
                id_usuario: datos.id_usuario
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(compras => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },

      async delete (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const compras = await Compra.findOne({
          where: {
            id: id,
            estado: 1
          }
        });
          if (!compras) {
            return res.status(404).json({ error: 'Dato no encontrado' });
          }
          Compra.update(
            {estado: 0},
            {where: {id: id}}
          )
          .then(compras => res.status(200).send('El registro ha sido eliminado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al eliminar' });
          });
      },
};