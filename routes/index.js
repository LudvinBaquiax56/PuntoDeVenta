const { Router } = require('express');
const router = Router();


const clienteRoute = require('./rutasPuntoDeVenta/clienteRoute');
const empleadoRoute = require('./rutasPuntoDeVenta/empleadoRoute');
const proveedorRoute = require('./rutasPuntoDeVenta/proveedorRoute');
const sucursalRoute = require('./rutasPuntoDeVenta/sucursalRoute');
const categoriaRoute = require('./rutasPuntoDeVenta/categoriaRoute');
const marcaRoute = require('./rutasPuntoDeVenta/marcaRoute');
const rolRoute = require('./rutasPuntoDeVenta/rolRoute');
const productoRoute = require('./rutasPuntoDeVenta/productoRoute');
const usuarioRoute = require('./rutasPuntoDeVenta/usuarioRoute');
const facturaRoute = require('./rutasPuntoDeVenta/facturaRoute');
const compraRoute = require('./rutasPuntoDeVenta/compraRoute');
const detalleFacturaRoute = require('./rutasPuntoDeVenta/detalleFacturaRoute');
const detalleCompraRoute = require('./rutasPuntoDeVenta/detalleCompraRoute');
const productoSucursalRoute = require('./rutasPuntoDeVenta/productoSucursalRoute');
const historialPrecioRoute = require('./rutasPuntoDeVenta/historialPrecioRoute');
const historialCostoRoute = require('./rutasPuntoDeVenta/historialCostoRoute');
const historialAjusteRoute = require('./rutasPuntoDeVenta/historialAjusteRoute');

//RUTAS

module.exports = (app) => {
    
    app.use('/cliente',clienteRoute);
    app.use('/empleado', empleadoRoute);
    app.use('/proveedor', proveedorRoute);
    app.use('/sucursal', sucursalRoute);
    app.use('/categoria', categoriaRoute);
    app.use('/marca', marcaRoute);
    app.use('/rol', rolRoute);
    app.use('/producto', productoRoute);
    app.use('/usuario', usuarioRoute);
    app.use('/factura', facturaRoute);
    app.use('/compra', compraRoute);
    app.use('/detalleFactura', detalleFacturaRoute);
    app.use('/detalleCompra', detalleCompraRoute);
    app.use('/productoSucursal', productoSucursalRoute);
    app.use('/historialPrecio', historialPrecioRoute);
    app.use('/historialCosto', historialCostoRoute);
    app.use('/historialAjuste', historialAjusteRoute);

    app.use('/', router);

};