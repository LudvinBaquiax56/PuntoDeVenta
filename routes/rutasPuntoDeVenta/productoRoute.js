const { Router } = require('express');
const router = Router();

const productoController = require('../../controllers/puntoDeVenta/productoController');

    router.get('/find', productoController.find);
    router.get('/findById', productoController.findById);
    router.post('/create', productoController.create);
    router.put('/update', productoController.update);

module.exports = router;