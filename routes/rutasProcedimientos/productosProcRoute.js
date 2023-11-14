const { Router } = require('express');
const router = Router();


const productosProcedimientos = require('../../controllers/procedimientosAlmacenados/productosProcedimientos');
const productosVistas = require('../../controllers/vistas/productosVistas');

    router.get('/ExistenciaSucursal/:sucursal', productosProcedimientos.ExistenciaSucursal);
    router.get('/MasVendidos/:fechaInicio,:fechaFin', productosProcedimientos.MasVendidos);
    router.get('/MenosVendidos/:fechaInicio,:fechaFin', productosProcedimientos.MenosVendidos);
    router.get('/ExistenciaMenor20', productosVistas.ExistenciaMenor20);
    router.get('/CantidadExistenciaMenor20', productosVistas.CantidadExistenciaMenor20);
    router.get('/General', productosVistas.General);
    router.get('/ExistenciaGeneral', productosVistas.ExistenciaGeneral);

module.exports = router;