'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Sucursal = db.sucursales;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Sucursal.findAll() 
        .then(sucursales => res.status(200).send(sucursales))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
      let id = req.body.id
      return Sucursal.findByPk(id)
      .then(sucursales => res.status(200).send(sucursales))
      .catch(error => res.status(400).send(error))
    }, 

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            no_sucursal: datos.no_sucursal,
            nombre: datos.nombre,
            ubicacion: datos.ubicacion,
            telefono: datos.telefono,
            estado: 1
        };
  
        Sucursal.create(datos_ingreso)
        .then(sucursales => {
            res.send(sucursales);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Sucursal.update(
            { 
                no_sucursal: datos.no_sucursal,
                nombre: datos.nombre,
                ubicacion: datos.ubicacion,
                telefono: datos.telefono,
                estado: 1
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(sucursales => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};