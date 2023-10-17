'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Empleado = db.empleados;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Empleado.findAll() 
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },


    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            dpi: datos.dpi,
            nombre: datos.nombre,
            apellido: datos.apellido,
            telefono: datos.telefono,
            email: datos.email,
            direccion: datos.direccion,
            estado: 1
        };
  
        Empleado.create(datos_ingreso)
        .then(empleados => {
            res.send(empleados);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Empleado.update(
            { 
                dpi: datos.dpi,
                nombre: datos.nombre,
                apellido: datos.apellido,
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
          .then(empleados => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};