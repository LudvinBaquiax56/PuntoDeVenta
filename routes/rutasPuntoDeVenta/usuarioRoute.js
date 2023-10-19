const { Router } = require('express');
const router = Router();

const usuarioController = require('../../controllers/puntoDeVenta/usuarioController');

    router.get('/find', usuarioController.find);
    router.post('/create', usuarioController.create);
    router.put('/update', usuarioController.update);

module.exports = router;