const { Router } = require('express');
const router = Router();

const detalleCompraController = require('../../controllers/puntoDeVenta/detalleCompraController');

    router.get('/find', detalleCompraController.find);
    router.get('/findById/:id', detalleCompraController.findById);
    router.post('/create', detalleCompraController.create);
    router.put('/update', detalleCompraController.update);
    router.put('/delete/:id', detalleCompraController.delete);

module.exports = router;