'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Producto_sucursal = db.producto_sucursales;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Producto_sucursal.findAll() 
        .then(producto_sucursales => res.status(200).send(producto_sucursales))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const producto_sucursales = await Producto_sucursal.findByPk(id);
        if (!producto_sucursales) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(producto_sucursales);
    },

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            existencia: datos.existencia,
            estado: 1,
            id_producto: datos.id_producto,
            id_sucursal: datos.id_sucursal
        };
  
        Producto_sucursal.create(datos_ingreso)
        .then(producto_sucursales => {
            res.send(producto_sucursales);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Producto_sucursal.update(
            { 
                existencia: datos.existencia,
                estado: 1,
                id_producto: datos.id_producto,
                id_sucursal: datos.id_sucursal
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(producto_sucursales => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};