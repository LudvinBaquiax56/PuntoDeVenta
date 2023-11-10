'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Usuario = db.usuarios;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Usuario.findAll() 
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },


    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre_usuario: datos.nombre_usuario,
            contraseña: datos.contraseña,
            estado: 1,
            id_rol: datos.id_rol,
            id_empleado: datos.id_empleado,
            id_sucursal: datos.id_sucursal
        };
  
        Usuario.create(datos_ingreso)
        .then(usuarios => {
            res.send(usuarios);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },

  
      update (req, res) {
        let datos = req.body
          Usuario.update(
            { 
                nombre_usuario: datos.nombre_usuario,
                contraseña: datos.contraseña,
                estado: 1,
                id_rol: datos.id_rol,
                id_empleado: datos.id_empleado,
                id_sucursal: datos.id_sucursal
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(usuarios => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};