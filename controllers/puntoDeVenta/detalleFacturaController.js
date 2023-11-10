'use strict';

const Sequelize     = require('sequelize');
const db = require("../../models");
const Detalle_factura = db.detalle_facturas;
const Factura = db.facturas;
const Producto = db.productos;
const Producto_sucursal = db.producto_sucursales;
const Historial_precio = db.historial_precios;
const Historial_costo = db.historial_costos;
const moment = require('moment');
const axios = require('axios');
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
        console.log(req.params.id);
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

    create(req, res) {
        let datos = req.body;
        Factura.findOne({
            where: {
                id: datos.id_factura,
                estado: 1
            }
        })
        .then(factura => {
            if (!factura) {
                return res.status(404).json({ error: 'Factura no encontrada' });
            } else {
                Producto.findOne({
                    where: {
                        id: datos.id_producto,
                        estado: 1
                    }
                })
                .then(producto => {
                    if (!producto) {
                        return res.status(404).json({ error: 'Producto no encontrado' });
                    } else {
                        Producto_sucursal.findOne({
                            where: {
                                id_producto: datos.id_producto,
                                id_sucursal: factura.id_sucursal,
                                estado: 1
                            }
                        })
                        .then(productoSucursal => {
                            if (!productoSucursal) {
                                return res.status(404).json({ error: 'Producto y Sucursal no encontrados' });
                            } else {
                                Historial_precio.findOne({
                                    where: {
                                        id_producto: datos.id_producto,
                                        estado: 1
                                    },
                                    order: [['createdAt', 'DESC']],
                                    limit: 1
                                })
                                .then(precios => {
                                    if (!precios) {
                                        return res.status(404).json({ error: 'Precio no encontrado' });
                                    } else {
                                        Historial_costo.findOne({
                                            where: {
                                                id_producto: datos.id_producto,
                                                estado: 1
                                            },
                                            order: [['createdAt', 'DESC']],
                                            limit: 1
                                        })
                                        .then(costos => {
                                            if (!costos) {
                                                return res.status(404).json({ error: 'Costo no encontrado' });
                                            } else {
                                                if(datos.cantidad > productoSucursal.existencia){
                                                    return res.status(404).json({ error: 'No hay existencia suficiente' });
                                                }else{
                                                const precioPro = precios.precio;
                                                const costoPro = costos.costo;
                                                const subtotal = precioPro * datos.cantidad;
                                                const ganancia = (precioPro - costoPro) * datos.cantidad;
                                                const datos_detalle = { 
                                                    cantidad: datos.cantidad,
                                                    subtotal: subtotal, 
                                                    ganancia: ganancia,
                                                    estado: 1,
                                                    id_factura: datos.id_factura,
                                                    id_producto: datos.id_producto
                                                };
        
                                                Detalle_factura.create(datos_detalle)
                                                .then(async detalle => {
                                                    const subtotalFac = parseFloat(factura.subtotal) + parseFloat(subtotal);
                                                    const total = subtotalFac - ((factura.descuento / 100) * subtotalFac);
                                                    const existencia = productoSucursal.existencia - datos.cantidad;
        
                                                    const facturaOptions = {
                                                        'method': 'PUT',
                                                        'url': 'http://localhost:3000/factura/update',
                                                        'headers': {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        data: {
                                                            id: datos.id_factura,
                                                            subtotal: subtotalFac,
                                                            total: total,
                                                            existencia: existencia
                                                        }
                                                    };
        
                                                    try {
                                                        const resultFactura = await axios(facturaOptions);
                                                        const resultadoFactura = resultFactura.data;
        
                                                        const productoOptions = {
                                                            'method': 'PUT',
                                                            'url': 'http://localhost:3000/productoSucursal/update',
                                                            'headers': {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            data: {
                                                                id: productoSucursal.id,
                                                                existencia: existencia
                                                            }
                                                        };
        
                                                        try {
                                                            const resultProducto = await axios(productoOptions);
                                                            const resultadoProducto = resultProducto.data;
                                                            
                                                            res.status(200).send({
                                                                factura: resultadoFactura,
                                                                producto: resultadoProducto
                                                            });
                                                        } catch (e) {
                                                            res.status(500).send("Error con el servidor (producto)");
                                                        }
                                                    } catch (e) {
                                                        res.status(500).send("Error con el servidor (factura)");
                                                    }
                                                })
                                                .catch(error => {
                                                    console.log(error);
                                                    return res.status(500).json({ error: 'Error al insertar' });
                                                });
                                            }}
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    update (req, res) {
        let datos = req.body;
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
        console.log(req.params.id);
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
