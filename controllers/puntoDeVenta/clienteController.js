'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Cliente = db.clientes;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Cliente.findAll() 
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },


    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            dpi: datos.dpi,
            nit: datos.nit,
            nombre: datos.nombre,
            apellido: datos.apellido,
            telefono: datos.telefono,
            email: datos.email,
            direccion: datos.direccion,
            puntos_privilegio: 0,
            estado: 1
        };
  
        Cliente.create(datos_ingreso)
        .then(clientes => {
            res.send(clientes);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Cliente.update(
            { 
                dpi: datos.dpi,
                nit: datos.nit,
                nombre: datos.nombre,
                apellido: datos.apellido,
                telefono: datos.telefono,
                email: datos.email,
                direccion: datos.direccion,
                puntos_privilegio: datos.puntos_privilegio,
                estado: 1
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(clientes => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};