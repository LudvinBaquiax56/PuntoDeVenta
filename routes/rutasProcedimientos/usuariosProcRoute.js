const { Router } = require('express');
const router = Router();

const usuariosProcedimientos = require('../../controllers/procedimientosAlmacenados/usuariosProcedimientos');
const usuariosVistas = require('../../controllers/vistas/usuariosVistas');

    router.post('/Login', usuariosProcedimientos.Login);
    router.get('/General', usuariosVistas.General);

module.exports = router;