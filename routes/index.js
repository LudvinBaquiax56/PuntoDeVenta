const { Router } = require('express');
const router = Router();


const clienteController = require('../controllers/puntoDeVenta/clienteController');
const empleadoController = require('../controllers/puntoDeVenta/empleadoController');
const proveedorController = require('../controllers/puntoDeVenta/proveedorController');
const sucursalController = require('../controllers/puntoDeVenta/sucursalController');
const categoriaController = require('../controllers/puntoDeVenta/categoriaController');
const marcaController = require('../controllers/puntoDeVenta/marcaController');
const rolController = require('../controllers/puntoDeVenta/rolController');
const productoController = require('../controllers/puntoDeVenta/productoController');
const usuarioController = require('../controllers/puntoDeVenta/usuarioController');
const facturaController = require('../controllers/puntoDeVenta/facturaController');
const compraController = require('../controllers/puntoDeVenta/compraController');
const detalleFacturaController = require('../controllers/puntoDeVenta/detalleFacturaController');
const detalleCompraController = require('../controllers/puntoDeVenta/detalleCompraController');
const productoSucursalController = require('../controllers/puntoDeVenta/productoSucursalController');
const historialPrecioController = require('../controllers/puntoDeVenta/historialPrecioController');
const historialCostoController = require('../controllers/puntoDeVenta/historialCostoController');
const historialAjusteController = require('../controllers/puntoDeVenta/historialAjusteController');

//RUTAS

module.exports = (app) => {
    
    //CLIENTES
    router.get('/cliente/find', clienteController.find);
    router.post('/cliente/create', clienteController.create);
    router.put('/cliente/update', clienteController.update);

    //EMPLEADOS
    router.get('/empleado/find', empleadoController.find);
    router.post('/empleado/create', empleadoController.create);
    router.put('/empleado/update', empleadoController.update);

    //PROVEEDORES
    router.get('/proveedor/find', proveedorController.find);
    router.post('/proveedor/create', proveedorController.create);
    router.put('/proveedor/update', proveedorController.update);

    //SUCURSALES
    router.get('/sucursal/find', sucursalController.find);
    router.post('/sucursal/create', sucursalController.create);
    router.put('/sucursal/update', sucursalController.update);

    //CATEGORIAS
    router.get('/categoria/find', categoriaController.find);
    router.post('/categoria/create', categoriaController.create);
    router.put('/categoria/update', categoriaController.update);

    //MARCAS
    router.get('/marca/find', marcaController.find);
    router.post('/marca/create', marcaController.create);
    router.put('/marca/update', marcaController.update);

     //ROLES
    router.get('/rol/find', rolController.find);
    router.post('/rol/create', rolController.create);        
    router.put('/rol/update', rolController.update);

    //PRODUCTOS
    router.get('/producto/find', productoController.find);
    router.post('/producto/create', productoController.create);
    router.put('/producto/update', productoController.update);

    //USUARIOS
    router.get('/usuario/find', usuarioController.find);
    router.post('/usuario/create', usuarioController.create);
    router.put('/usuario/update', usuarioController.update);

    //FACTURAS
    router.get('/factura/find', facturaController.find);
    router.post('/factura/create', facturaController.create);
    router.put('/factura/update', facturaController.update);

    //COMPRAS
    router.get('/compra/find', compraController.find);
    router.post('/compra/create', compraController.create);
    router.put('/compra/update', compraController.update);

    //DETALLE FACTURAS
    router.get('/detalleFactura/find', detalleFacturaController.find);
    router.post('/detalleFactura/create', detalleFacturaController.create);
    router.put('/detalleFactura/update', detalleFacturaController.update);

    //DETALLE COMPRAS
    router.get('/detalleCompra/find', detalleCompraController.find);
    router.post('/detalleCompra/create', detalleCompraController.create);
    router.put('/detalleCompra/update', detalleCompraController.update);

    //PRODUCTO SUCURSALES
    router.get('/productoSucursal/find', productoSucursalController.find);
    router.post('/productoSucursal/create', productoSucursalController.create);
    router.put('/productoSucursal/update', productoSucursalController.update);

    //HISTORIAL PRECIOS
    router.get('/historialPrecio/find', historialPrecioController.find);
    router.post('/historialPrecio/create', historialPrecioController.create);
   
    //HISTORIAL COSTOS
    router.get('/historialCosto/find', historialCostoController.find);
    router.post('/historialCosto/create', historialCostoController.create);
   
    //HISTORIAL AJUSTES
    router.get('/historialAjuste/find', historialAjusteController.find);
    router.post('/historialAjuste/create', historialAjusteController.create);
   


    app.use('/', router);

};