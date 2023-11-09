const { Router } = require('express');
const router = Router();

const categoriaController = require('../../controllers/puntoDeVenta/categoriaController');

    router.get('/find', categoriaController.find);
    router.get('/findById/:id', categoriaController.findById);
    router.post('/create', categoriaController.create);
    router.put('/update', categoriaController.update);
    router.put('/delete/:id', categoriaController.delete);

module.exports = router;