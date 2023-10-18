const { Router } = require('express');
const router = Router();

const empleadoController = require('../../controllers/puntoDeVenta/empleadoController');

    router.get('/find', empleadoController.find);
    router.post('/create', empleadoController.create);
    router.put('/update', empleadoController.update);

module.exports = router;