const { Router } = require('express');
const router = Router();

const compraController = require('../../controllers/puntoDeVenta/compraController');

    router.get('/find', compraController.find);
    router.get('/findById/:id', compraController.findById);
    router.post('/create', compraController.create);
    router.put('/update', compraController.update);

module.exports = router;