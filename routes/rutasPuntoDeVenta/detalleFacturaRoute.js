const { Router } = require('express');
const router = Router();

const detalleFacturaController = require('../../controllers/puntoDeVenta/detalleFacturaController');

    router.get('/find', detalleFacturaController.find);
    router.post('/create', detalleFacturaController.create);
    router.put('/update', detalleFacturaController.update);

module.exports = router;