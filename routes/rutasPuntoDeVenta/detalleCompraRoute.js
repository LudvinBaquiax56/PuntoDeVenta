const { Router } = require('express');
const router = Router();

const detalleCompraController = require('../../controllers/puntoDeVenta/detalleCompraController');

    router.get('/find', detalleCompraController.find);
    router.post('/create', detalleCompraController.create);
    router.put('/update', detalleCompraController.update);

module.exports = router;