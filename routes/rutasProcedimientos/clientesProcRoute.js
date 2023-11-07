const { Router } = require('express');
const router = Router();

const clientesProcedimientos = require('../../controllers/procedimientosAlmacenados/clientesProcedimientos');

    router.get('/ComprasPorSucursal', clientesProcedimientos.PorSucursales);
    router.get('/DetalleCompras', clientesProcedimientos.DetalleCompras);

module.exports = router;