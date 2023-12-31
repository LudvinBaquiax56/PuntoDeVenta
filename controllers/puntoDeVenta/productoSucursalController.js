'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Producto_sucursal = db.producto_sucursales;
const HistorialPrecio = db.historial_precios;
const Producto = db.productos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
  find(req, res) {
    return Producto_sucursal.findAll({
      where: { estado: 1 }
    })
      .then(producto_sucursales => res.status(200).send(producto_sucursales))
      .catch(error => res.status(400).send(error))
  },

  async findById(req, res) {
    console.log(req.params.id)
    let id = req.params.id;
    const producto_sucursales = await Producto_sucursal.findOne({
      where: {
        id: id,
        estado: 1
      }
    });
    if (!producto_sucursales) {
      return res.status(404).json({ error: 'Dato no encontrado' });
    }
    res.status(200).json(producto_sucursales);
  },

  async findProductoCodigoSucursal(req, res) {
    let idSucursal = req.params.idSucursal;
    let codigoP = req.params.codigo;
    console.log(codigoP)
    try {
      const productoConHistorialYSucursal = await Producto.findOne({
        attributes: [
          'id',
          'codigo',
          ['nombre', 'Producto'],
          'descripcion',
        ],
        include: [
          {
            model: HistorialPrecio,
            attributes: ['precio'],
            where: {
              estado: 1,
            },
          },
          {
            model: Producto_sucursal,
            attributes: ['id_sucursal'],
            where: {
              id_sucursal: idSucursal,
            },
          },
        ],
        where: {
          codigo: codigoP,
        },
      });

      if (!productoConHistorialYSucursal) {
        return null; // o lanza un error si prefieres
      }
      const { id, codigo, nombre, descripcion, historial_precios, producto_sucursales } = productoConHistorialYSucursal.toJSON();
      const { precio } = historial_precios[0]; // Suponiendo que siempre hay un solo historial

      const respuestaFormateada = {
        id,
        codigo,
        nombre: productoConHistorialYSucursal.dataValues.Producto,
        descripcion,
        precio,
        id_sucursal: producto_sucursales[0].id_sucursal, // Suponiendo que siempre hay una sola sucursal
      };

      return res.status(200).json(respuestaFormateada);
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  create(req, res) {
    let datos = req.body //Serializar los datos
    const datos_ingreso = { //Objeto
      existencia: datos.existencia,
      estado: 1,
      id_producto: datos.id_producto,
      id_sucursal: datos.id_sucursal
    };

    Producto_sucursal.create(datos_ingreso)
      .then(producto_sucursales => {
        res.send(producto_sucursales);
      })
      .catch(error => {
        console.log(error)
        return res.status(500).json({ error: 'Error al insertar' });
      });
  },

  update(req, res) {
    let datos = req.body
    Producto_sucursal.update(
      {
        existencia: datos.existencia,
        estado: 1,
        id_producto: datos.id_producto,
        id_sucursal: datos.id_sucursal
      },
      {
        where: {
          id: datos.id
        }
      }
    )
      .then(producto_sucursales => res.status(200).send('El registro ha sido actualizado'))
      .catch(error => {
        console.log(error)
        return res.status(500).json({ error: 'Error al actualizar' });
      });
  },

  async delete(req, res) {
    console.log(req.params.id)
    let id = req.params.id;
    const producto_sucursales = await Producto_sucursal.findOne({
      where: {
        id: id,
        estado: 1
      }
    });
    if (!producto_sucursales) {
      return res.status(404).json({ error: 'Dato no encontrado' });
    }
    Producto_sucursal.update(
      { estado: 0 },
      { where: { id: id } }
    )
      .then(producto_sucursales => res.status(200).send('El registro ha sido eliminado'))
      .catch(error => {
        console.log(error)
        return res.status(500).json({ error: 'Error al eliminar' });
      });
  },
};