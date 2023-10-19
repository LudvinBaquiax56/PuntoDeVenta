const { Router } = require('express');
const router = Router();

const clienteController = require('../../controllers/puntoDeVenta/clienteController');

    router.get('/find', clienteController.find);
    router.get('/findById', clienteController.findById);
    router.post('/create', clienteController.create);
    router.put('/update', clienteController.update);

module.exports = router;