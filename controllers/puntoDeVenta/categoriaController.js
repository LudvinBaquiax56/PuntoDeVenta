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
        .then(categorias => res.status(200).send(categorias))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const categorias = await Categoria.findByPk(id);
        if (!categorias) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(categorias);
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