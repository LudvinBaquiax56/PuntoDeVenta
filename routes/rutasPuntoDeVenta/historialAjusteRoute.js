const { Router } = require('express');
const router = Router();

const historialAjusteController = require('../../controllers/puntoDeVenta/historialAjusteController');

    router.get('/find', historialAjusteController.find);
    router.get('/findById/:id', historialAjusteController.findById);
    router.post('/create', historialAjusteController.create);

module.exports = router;