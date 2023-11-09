const { Router } = require('express');
const router = Router();

const usuariosProcedimientos = require('../../controllers/procedimientosAlmacenados/usuariosProcedimientos');

    router.post('/Login', usuariosProcedimientos.Login);

module.exports = router;