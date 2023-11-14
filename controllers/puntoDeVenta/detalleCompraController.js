'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Detalle_compra = db.detalle_compras;
const Compra = db.compras;
const Producto = db.productos;
const Producto_sucursal = db.producto_sucursales;
const Historial_costo = db.historial_costos;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return Detalle_compra.findAll({
            where: { estado: 1 }
        })
            .then(detalle_compras => res.status(200).send(detalle_compras))
            .catch(error => res.status(400).send(error))
    },

    async findById(req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const detalle_compras = await Detalle_compra.findOne({
            where: {
                id: id,
                estado: 1
            }
        });
        if (!detalle_compras) {
            return res.status(404).json({ error: 'Dato no encontrado' });
        }
        res.status(200).json(detalle_compras);
    },

    create(req, res) {
        let datos = req.body;
        Compra.findOne({
            where: {
                id: datos.id_compra,
                estado: 1
            }
        })
            .then(compra => {
                if (!compra) {
                    return res.status(404).json({ error: 'Compra no encontrada' });
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
                                        id_sucursal: compra.id_sucursal,
                                        estado: 1
                                    }
                                })
                                    .then(productoSucursal => {
                                        if (!productoSucursal) {
                                            return res.status(404).json({ error: 'Producto y Sucursal no encontrados' });
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
                                                        const costoPro = costos.costo;
                                                        const subtotal = costoPro * datos.cantidad;
                                                        const datos_detalle = {
                                                            cantidad: datos.cantidad,
                                                            subtotal: subtotal,
                                                            estado: 1,
                                                            id_compra: datos.id_compra,
                                                            id_producto: datos.id_producto
                                                        };

                                                        Detalle_compra.create(datos_detalle)
                                                            .then(async detalle => {
                                                                const total = parseFloat(compra.total) + parseFloat(subtotal);
                                                                const existencia = parseFloat(productoSucursal.existencia) + parseFloat(datos.cantidad);

                                                                const compraOptions = {
                                                                    'method': 'PUT',
                                                                    'url': 'http://localhost:3000/compra/update',
                                                                    'headers': {
                                                                        'Content-Type': 'application/json'
                                                                    },
                                                                    data: {
                                                                        id: datos.id_compra,
                                                                        total: total,
                                                                        existencia: existencia
                                                                    }
                                                                };

                                                                try {
                                                                    const resultCompra = await axios(compraOptions);
                                                                    const resultadoCompra = resultCompra.data;

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
                                                                            compra: resultadoCompra,
                                                                            producto: resultadoProducto
                                                                        });
                                                                    } catch (e) {
                                                                        res.status(500).send("Error con el servidor (producto)");
                                                                    }
                                                                } catch (e) {
                                                                    res.status(500).send("Error con el servidor (compra)");
                                                                }
                                                            })
                                                            .catch(error => {
                                                                console.log(error);
                                                                return res.status(500).json({ error: 'Error al insertar' });
                                                            });
                                                    }
                                                })
                                        }

                                    })
                            }
                        })
                }
            })
    },

    update(req, res) {
        let datos = req.body
        Detalle_compra.update(
            {
                cantidad: datos.cantidad,
                subtotal: datos.subtotal,
                estado: 1,
                id_compra: datos.id_compra,
                id_producto: datos.id_producto
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
            .then(detalle_compras => res.status(200).send('El registro ha sido actualizado'))
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al actualizar' });
            });
    },

    async delete(req, res) {
        console.log(req.params.id)
        let id = req.params.id;
        const detalle_compras = await Detalle_compra.findOne({
            where: {
                id: id,
                estado: 1
            }
        });
        if (!detalle_compras) {
            return res.status(404).json({ error: 'Dato no encontrado' });
        }
        Detalle_compra.update(
            { estado: 0 },
            { where: { id: id } }
        )
            .then(detalle_compras => res.status(200).send('El registro ha sido eliminado'))
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al eliminar' });
            });
    },
};