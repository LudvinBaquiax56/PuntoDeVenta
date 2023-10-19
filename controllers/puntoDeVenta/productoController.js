'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Producto = db.productos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Producto.findAll() 
        .then(productos => res.status(200).send(productos))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
      let id = req.body.id
      return Producto.findByPk(id)
      .then(productos => res.status(200).send(productos))
      .catch(error => res.status(400).send(error))
    }, 

    create (req, res) {
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            codigo: datos.codigo,
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            estado: 1,
            id_marca: datos.id_marca,
            id_categoria: datos.id_categoria
        };
  
        Producto.create(datos_ingreso)
        .then(productos => {
            res.send(productos);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar' });
        });
      },

  
      update (req, res) {
        let datos = req.body
          Producto.update(
            { 
                codigo: datos.codigo,
                nombre: datos.nombre,
                descripcion: datos.descripcion,
                estado: 1,
                id_marca: datos.id_marca,
                id_categoria: datos.id_categoria
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(productos => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },
};