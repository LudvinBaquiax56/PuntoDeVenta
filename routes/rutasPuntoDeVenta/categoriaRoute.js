const { Router } = require('express');
const router = Router();

const categoriaController = require('../../controllers/puntoDeVenta/categoriaController');

    router.get('/find', categoriaController.find);
    router.get('/findById', categoriaController.findById);
    router.post('/create', categoriaController.create);
    router.put('/update', categoriaController.update);

module.exports = router;