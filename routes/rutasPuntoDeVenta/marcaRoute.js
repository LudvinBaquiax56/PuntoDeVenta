const { Router } = require('express');
const router = Router();

const marcaController = require('../../controllers/puntoDeVenta/marcaController');

    router.get('/find', marcaController.find);
    router.get('/findById/:id', marcaController.findById);
    router.post('/create', marcaController.create);
    router.put('/update', marcaController.update);
    router.put('/delete/:id', marcaController.delete);

module.exports = router;