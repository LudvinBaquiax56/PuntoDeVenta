const { Router } = require('express');
const router = Router();

const productoSucursalController = require('../../controllers/puntoDeVenta/productoSucursalController');

    router.get('/find', productoSucursalController.find);
    router.get('/findById', productoSucursalController.findById);
    router.post('/create', productoSucursalController.create);
    router.put('/update', productoSucursalController.update);

module.exports = router;