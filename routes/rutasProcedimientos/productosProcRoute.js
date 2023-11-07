const { Router } = require('express');
const router = Router();


const productosProcedimientos = require('../../controllers/procedimientosAlmacenados/productosProcedimientos');

    router.get('/ExistenciaSucursal', productosProcedimientos.ExistenciaSucursal);
    router.get('/MasVendidos', productosProcedimientos.MasVendidos);
    router.get('/MenosVendidos', productosProcedimientos.MenosVendidos);

module.exports = router;