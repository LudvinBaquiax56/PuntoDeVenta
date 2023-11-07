'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Rol = db.roles;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Rol.findAll({
          where: {estado: 1}
        }) 
        .then(roles => res.status(200).send(roles))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const roles = await Rol.findOne({
        where: {
          id: id,
          estado: 1
        }
      });
        if (!roles) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(roles);
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

      async delete (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const roles = await Rol.findOne({
          where: {
            id: id,
            estado: 1
          }
        });
          if (!roles) {
            return res.status(404).json({ error: 'Dato no encontrado' });
          }
          Rol.update(
            {estado: 0},
            {where: {id: id}}
          )
          .then(roles => res.status(200).send('El registro ha sido eliminado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al eliminar' });
          });
      },
};