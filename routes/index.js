const { Router } = require('express');
const router = Router();

// facturas
/*const libroControler = require('../controllers/libro/libroControler');
const generoControler = require('../controllers/libro/generoControler');*/

//RUTAS

module.exports = (app) => {
    /*//libros
    router.get('/libro/find', libroControler.find);
    router.post('/libro/create', libroControler.create);
    router.put('/libro/update', libroControler.update);
    router.delete('/libro/delete/:id', libroControler.delete);

    //generos
    router.get('/genero/find', generoControler.findgeneros);
    router.post('/genero/create', generoControler.create);
    router.put('/genero/update', generoControler.update);
    router.delete('/genero/delete/:id', generoControler.delete);*/


    app.use('/', router);

};