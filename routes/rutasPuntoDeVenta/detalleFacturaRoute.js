const { Router } = require('express');
const router = Router();

const detalleFacturaController = require('../../controllers/puntoDeVenta/detalleFacturaController');

    router.get('/find', detalleFacturaController.find);
    router.get('/findById/:id', detalleFacturaController.findById);
    router.post('/create', detalleFacturaController.create);
    router.put('/update', detalleFacturaController.update);
    router.put('/delete/:id', detalleFacturaController.delete);

module.exports = router;