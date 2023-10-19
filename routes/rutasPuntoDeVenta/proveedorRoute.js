const { Router } = require('express');
const router = Router();

const proveedorController = require('../../controllers/puntoDeVenta/proveedorController');

    router.get('/find', proveedorController.find);
    router.post('/create', proveedorController.create);
    router.put('/update', proveedorController.update);

module.exports = router;