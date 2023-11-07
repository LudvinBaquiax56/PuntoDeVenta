const { Router } = require('express');
const router = Router();

const clientesProcedimientos = require('../../controllers/procedimientosAlmacenados/clientesProcedimientos');

    router.get('/ComprasPorSucursal/:sucursal', clientesProcedimientos.PorSucursales);
    router.get('/DetalleCompras/:cliente', clientesProcedimientos.DetalleCompras);

module.exports = router;