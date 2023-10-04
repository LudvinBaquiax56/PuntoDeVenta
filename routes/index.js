const { Router } = require('express');
const router = Router();

    //Clientes
    router.get('/clientes/find', clienteController.find);
    router.post('/clientes/create', clienteController.create);
    router.put('/clientes/update', clienteController.update);
    //router.delete('/sucursales/delete/:id', sucursalControler.delete);

    app.use('/', router);

};