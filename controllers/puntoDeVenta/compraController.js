'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Compra = db.compras;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Compra.findAll() 
        .then(compras => res.status(200).send(compras))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const compras = await Compra.findByPk(id);
        if (!compras) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(compras);
    },
    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            no_factura: datos.no_factura,
            fecha: datos.fecha,
            total: datos.total,
            estado: 1,
            id_proveedor: datos.id_proveedor,
            id_sucursal: datos.id_sucursal,
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

      delete (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
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