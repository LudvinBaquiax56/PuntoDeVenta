'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Detalle_factura = db.detalle_facturas;
const Factura = db.facturas;
const Producto = db.productos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find (req, res) {
        return Detalle_factura.findAll({
          where: {estado: 1}
        }) 
        .then(detalle_facturas => res.status(200).send(detalle_facturas))
        .catch(error => res.status(400).send(error))
    },

    async findById (req, res) {
      console.log(req.params.id)
      let id = req.params.id;
      const detalle_facturas = await Detalle_factura.findOne({
        where: {
          id: id,
          estado: 1
        }
      });
        if (!detalle_facturas) {
          return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(detalle_facturas);
    },

    create (req, res) {
        let datos = req.body
        Factura.findOne({
            where: {
              id: datos.id_factura,
              estado: 1
            }
          })
        .then(factura => {
            if (!factura) {
                return res.status(404).json({ error: 'Factura no encontrada' });
            }
            Producto.findOne({
                where: {
                  id: datos.id_producto,
                  estado: 1
                }
            })
                .then(producto => {
                    if (!producto) {
                        return res.status(404).json({ error: 'Producto no encontrado' });
                    }
    
                    const datos_detalle = { 
                        cantidad: datos.cantidad,
                        subtotal: datos.subtotal, //P
                        ganancia: datos.ganancia, //P
                        estado: 1,
                        id_factura: datos.id_factura,
                        id_producto: datos.id_producto
                    };
                    Detalle_factura.create(datos_detalle)
                    .then(async detalle => {
                      const subtotalFac = parseFloat(factura.subtotal) + parseFloat(datos.subtotal);
                      const total = subtotalFac - ((factura.descuento / 100) * subtotalFac);
                        const options = {
                            'method': 'PUT',
                            'url': 'http://localhost:3000/factura/update',
                            'headers': {
                                'Content-Type': 'application/json'
                            },
                            data: {
                                id: datos.id_factura,
                                subtotal: subtotalFac,
                                total: total
                            }
                        };
                        try {
                            const result = await axios(options);
                            const resultado = result.data;
                            res.status(200).send(resultado);
                        } catch (e) {
                            res.status(500).send("Error con el servidor");
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        return res.status(500).json({ error: 'Error al insertar' });
                    });
                })
            })
      },
  
      update (req, res) {
        let datos = req.body
          Detalle_factura.update(
            { 
                cantidad: datos.cantidad,
                subtotal: datos.subtotal,
                ganancia: datos.ganancia,
                estado: 1,
                id_factura: datos.id_factura,
                id_producto: datos.id_producto
            },
            { 
              where: { 
                id: datos.id 
              }
            }
          )
          .then(detalle_facturas => res.status(200).send('El registro ha sido actualizado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al actualizar' });
          });
      },

      async delete (req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const detalle_facturas = await Detalle_factura.findOne({
          where: {
            id: id,
            estado: 1
          }
        });
          if (!detalle_facturas) {
            return res.status(404).json({ error: 'Dato no encontrado' });
          }
          Detalle_factura.update(
            {estado: 0},
            {where: {id: id}}
          )
          .then(detalle_facturas => res.status(200).send('El registro ha sido eliminado'))
          .catch(error => {
              console.log(error)
              return res.status(500).json({ error: 'Error al eliminar' });
          });
      },
};