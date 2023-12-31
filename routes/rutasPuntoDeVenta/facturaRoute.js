const { Router } = require('express');
const router = Router();

const facturaController = require('../../controllers/puntoDeVenta/facturaController');

    router.get('/find', facturaController.find);
    router.get('/findAnulados', facturaController.findAnulados);
    router.get('/findById/:id', facturaController.findById);
    router.post('/create', facturaController.create);
    router.put('/update', facturaController.update);
    router.put('/delete/:id', facturaController.delete);

module.exports = router;