const { Router } = require('express');
const router = Router();

const reporteController = require('../../controllers/reporteController');

    router.get('/procedimiento', reporteController.procedimientoProductos);

module.exports = router;