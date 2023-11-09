const { Router } = require('express');
const router = Router();

const sucursalController = require('../../controllers/puntoDeVenta/sucursalController');

    router.get('/find', sucursalController.find);
    router.get('/findById/:id', sucursalController.findById);
    router.post('/create', sucursalController.create);
    router.put('/update', sucursalController.update);
    router.put('/delete/:id', sucursalController.delete);

module.exports = router;