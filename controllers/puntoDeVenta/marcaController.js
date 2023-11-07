'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Marca = db.marcas;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Marca.findAll() 
        .then(marcas => res.status(200).send(marcas))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const marcas = await Marca.findByPk(id);
        if (!marcas) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(marcas);
    },

    findById2 (req, res) {
      let id = req.params.id;
      return Marca.findByPk(id)
      .then(marcas => res.status(200).send(marcas))
      .catch(error => res.status(400).send(error))
    }, 

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            estado: 1
        };
  
        Marca.create(datos_ingreso)
        .then(marcas => {
            res.send(marcas);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },
  
      update (req, res) {
        let datos = req.body
          Marca.update(
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
          .then(marcas => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },

      delete (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
          Marca.update(
            {estado: 0},
            {where: {id: id}}
          )
          .then(marcas => res.status(200).send('El registro ha sido eliminado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al eliminar' });
          });
      },
};