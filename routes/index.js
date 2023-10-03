const { Router } = require('express');
const router = Router();


const clienteController = require('../controllers/puntoDeVenta/clienteController');

//RUTAS

module.exports = (app) => {
    
    //CLIENTES
    router.get('/cliente/find', clienteController.find);
    router.post('/cliente/create', clienteController.create);
    router.put('/cliente/update', clienteController.update);
    router.delete('/cliente/delete/:id', clienteController.delete);


    app.use('/', router);

};