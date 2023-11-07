'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Sucursal = db.sucursales;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Sucursal.findAll({
          where: {estado: 1}
        }) 
        .then(sucursales => res.status(200).send(sucursales))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const sucursales = await Sucursal.findOne({
        where: {
          id: id,
          estado: 1
        }
      });
        if (!sucursales) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(sucursales);
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

      async delete (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const sucursales = await Sucursal.findOne({
          where: {
            id: id,
            estado: 1
          }
        });
          if (!sucursales) {
            return res.status(404).json({ error: 'Dato no encontrado' });
          }
          Sucursal.update(
            {estado: 0},
            {where: {id: id}}
          )
          .then(sucursales => res.status(200).send('El registro ha sido eliminado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al eliminar' });
          });
      },
};