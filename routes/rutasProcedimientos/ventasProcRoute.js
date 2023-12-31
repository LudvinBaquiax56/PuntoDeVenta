const { Router } = require('express');
const router = Router();

const ventasProcedimientos = require('../../controllers/procedimientosAlmacenados/ventasProcedimientos');


router.get('/Ventas/:fechaInicio,:fechaFin', ventasProcedimientos.Ventas);
router.get('/Ventas', ventasProcedimientos.VentasAll);


module.exports = router;