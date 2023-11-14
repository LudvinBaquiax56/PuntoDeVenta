const { Router } = require('express');
const router = Router();

const clientesProcedimientos = require('../../controllers/procedimientosAlmacenados/clientesProcedimientos');
const clientesVistas = require('../../controllers/vistas/clientesVistas');

    router.get('/ComprasPorSucursal/:sucursal', clientesProcedimientos.PorSucursales);
    router.get('/DetalleCompras/:cliente', clientesProcedimientos.DetalleCompras);
    router.get('/General', clientesVistas.General);
    router.get('/ComprasGeneral', clientesVistas.ComprasGeneral);

module.exports = router;