'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Proveedor = db.proveedores;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Proveedor.findAll() 
        .then(proveedores => res.status(200).send(proveedores))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const proveedores = await Proveedor.findByPk(id);
        if (!proveedores) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(proveedores);
    },

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nit: datos.nit,
            nombre: datos.nombre,
            telefono: datos.telefono,
            email: datos.email,
            direccion: datos.direccion,
            estado: 1
        };
  
        Proveedor.create(datos_ingreso)
        .then(proveedores => {
            res.send(proveedores);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Proveedor.update(
            { 
                nit: datos.nit,
                nombre: datos.nombre,
                telefono: datos.telefono,
                email: datos.email,
                direccion: datos.direccion,
                estado: 1
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(proveedores => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};