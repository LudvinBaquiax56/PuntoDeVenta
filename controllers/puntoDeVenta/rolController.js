'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Rol = db.roles;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Rol.findAll() 
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },


    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            estado: 1
        };
  
        Rol.create(datos_ingreso)
        .then(roles => {
            res.send(roles);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Rol.update(
            { 
                nombre: datos.nombre,
                estado: 1
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(roles => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};