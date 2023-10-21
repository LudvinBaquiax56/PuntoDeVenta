const { Router } = require('express');
const router = Router();

const historialPrecioController = require('../../controllers/puntoDeVenta/historialPrecioController');

    router.get('/find', historialPrecioController.find);
    router.get('/findById/:id', historialPrecioController.findById);
    router.post('/create', historialPrecioController.create);

module.exports = router;