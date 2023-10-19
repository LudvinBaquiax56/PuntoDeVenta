const { Router } = require('express');
const router = Router();

const empleadoController = require('../../controllers/puntoDeVenta/empleadoController');

    router.get('/find', empleadoController.find);
    router.get('/findById', empleadoController.findById);
    router.post('/create', empleadoController.create);
    router.put('/update', empleadoController.update);

module.exports = router;