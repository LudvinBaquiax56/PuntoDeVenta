const { Router } = require('express');
const router = Router();

const ventasProcedimientos = require('../../controllers/procedimientosAlmacenados/ventasProcedimientos');

    router.get('/Ventas', ventasProcedimientos.Ventas);

module.exports = router;