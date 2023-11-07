const { Router } = require('express');
const router = Router();

const proveedorController = require('../../controllers/puntoDeVenta/proveedorController');

    router.get('/find', proveedorController.find);
    router.get('/findById/:id', proveedorController.findById);
    router.post('/create', proveedorController.create);
    router.put('/update', proveedorController.update);
    router.put('/delete/:id', proveedorController.delete);

module.exports = router;