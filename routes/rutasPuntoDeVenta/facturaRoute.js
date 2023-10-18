const { Router } = require('express');
const router = Router();

const facturaController = require('../../controllers/puntoDeVenta/facturaController');

    router.get('/find', facturaController.find);
    router.post('/create', facturaController.create);
    router.put('/update', facturaController.update);

module.exports = router;