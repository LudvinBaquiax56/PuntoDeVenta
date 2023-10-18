const { Router } = require('express');
const router = Router();

const historialCostoController = require('../../controllers/puntoDeVenta/historialCostoController');

    router.get('/find', historialCostoController.find);
    router.post('/create', historialCostoController.create);

module.exports = router;