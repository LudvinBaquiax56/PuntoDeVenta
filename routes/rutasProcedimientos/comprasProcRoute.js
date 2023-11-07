const { Router } = require('express');
const router = Router();

const comprasProcedimientos = require('../../controllers/procedimientosAlmacenados/comprasProcedimientos');

    router.get('/Compras', comprasProcedimientos.Compras);

module.exports = router;