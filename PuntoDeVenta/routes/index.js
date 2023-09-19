const { Router } = require('express');
const router = Router();

// facturas
const sucursalController = require('../controllers/1SucursalesController');
const clienteController = require('../controllers/3ClientesController');

//RUTAS

module.exports = (app) => {
    
    //Sucursales
    router.get('/sucursales/find', sucursalController.find);
    router.post('/sucursales/create', sucursalController.create);
    router.put('/sucursales/update', sucursalController.update);
    //router.delete('/sucursales/delete/:id', sucursalControler.delete);

    //Clientes
    router.get('/clientes/find', clienteController.find);
    router.post('/clientes/create', clienteController.create);
    router.put('/clientes/update', clienteController.update);
    //router.delete('/sucursales/delete/:id', sucursalControler.delete);

    app.use('/', router);

};