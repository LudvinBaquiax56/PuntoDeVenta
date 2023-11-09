const { Router } = require('express');
const router = Router();

const rolController = require('../../controllers/puntoDeVenta/rolController');

    router.get('/find', rolController.find);
    router.get('/findById/:id', rolController.findById);
    router.post('/create', rolController.create);
    router.put('/update', rolController.update);
    router.put('/delete/:id', rolController.delete);

module.exports = router;