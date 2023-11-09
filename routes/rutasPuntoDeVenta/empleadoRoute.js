const { Router } = require('express');
const router = Router();

const empleadoController = require('../../controllers/puntoDeVenta/empleadoController');

    router.get('/find', empleadoController.find);
    router.get('/findDesactivos', empleadoController.findDesactivos);
    router.get('/findById/:id', empleadoController.findById);
    router.post('/create', empleadoController.create);
    router.put('/update', empleadoController.update);
    router.put('/delete/:id', empleadoController.delete);

module.exports = router;