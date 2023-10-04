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
    router.post('/rol/create', rolController.create);        router.put('/rol/update', rolController.update);

    //PRODUCTOS
    router.get('/producto/find', productoController.find);
    router.post('/producto/create', productoController.create);
    router.put('/producto/update', productoController.update);

    //USUARIOS
    router.get('/usuario/find', usuarioController.find);
    router.post('/usuario/create', usuarioController.create);
    router.put('/usuario/update', usuarioController.update);




    app.use('/', router);

};