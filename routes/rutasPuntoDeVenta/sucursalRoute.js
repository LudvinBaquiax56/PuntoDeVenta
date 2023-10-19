const { Router } = require('express');
const router = Router();

const sucursalController = require('../../controllers/puntoDeVenta/sucursalController');

    router.get('/find', sucursalController.find);
    router.post('/create', sucursalController.create);
    router.put('/update', sucursalController.update);

module.exports = router;