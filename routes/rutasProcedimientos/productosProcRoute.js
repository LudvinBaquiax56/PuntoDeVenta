const { Router } = require('express');
const router = Router();


const productosProcedimientos = require('../../controllers/procedimientosAlmacenados/productosProcedimientos');

    router.get('/ExistenciaSucursal/:sucursal', productosProcedimientos.ExistenciaSucursal);
    router.get('/MasVendidos/:fechaInicio,:fechaFin', productosProcedimientos.MasVendidos);
    router.get('/MenosVendidos/:fechaInicio,:fechaFin', productosProcedimientos.MenosVendidos);

module.exports = router;