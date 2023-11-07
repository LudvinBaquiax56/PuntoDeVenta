const { Router } = require('express');
const router = Router();

const productoController = require('../../controllers/puntoDeVenta/productoController');

    router.get('/find', productoController.find);
    router.get('/findById/:id', productoController.findById);
    router.post('/create', productoController.create);
    router.put('/update', productoController.update);
    router.put('/delete/:id', productoController.delete);

module.exports = router;