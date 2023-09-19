'use strict'
const Sequelize = require('sequelize');
const db = require("../models");
const Rol = db.roles;
const moment = require('moment');

module.exports = {
    find (req, res) {
        return Rol.findAll()
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    findById (req, res) {
        let id = req.body.id
        return Rol.findByPk(id)
        .then(cuenta => res.status(200).send(cuenta))
        .catch(error => res.status(400).send(error))
    },

    create (req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            nombre: datos.nombre,
            estado: 1,
        };

        Rol.create(datos_ingreso)
        .then(rol => {
            res.send(rol);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al crear rol' });
        });
    },
    
    update (req, res) {
        //Actualizar
        let datos = req.body
        Rol.update(
          { //En crudo
            nombre: datos.nombre,
            estado: datos.estado,
            updatedAt: NOW(),
        },
        { 
        where: { id: datos.id }
        })
        .then(rol => res.status(200).send('El registro ha sido actualizado'))
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    /*async delete (req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
          //Busqueda de un objeto especifico por id
        const editorial = await Editorial.findByPk(id);
          //evaluamos si el objeto trajo algo
        if (!editorial) {
            return res.status(404).json({ error: 'Editorial no encontrada' });
        }
          //Si pasa este punto
        await editorial.destroy(); 
        return res.json({ message: 'Editorial eliminada correctamente' });
        } catch (error) {
        console.error('Error al eliminar editorial:', error);
        return res.status(500).json({ error: 'Error al eliminar editorial' });
        }
    },*/
};


