'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Categoria = db.categorias;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Categoria.findAll() 
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },


    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            estado: 1
        };
  
        Categoria.create(datos_ingreso)
        .then(categorias => {
            res.send(categorias);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Categoria.update(
            { 
                nombre: datos.nombre,
                descripcion: datos.descripcion,
                estado: 1
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(categorias => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};