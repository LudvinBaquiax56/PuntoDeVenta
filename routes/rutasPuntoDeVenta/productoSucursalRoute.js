const { Router } = require('express');
const router = Router();

const productoSucursalController = require('../../controllers/puntoDeVenta/productoSucursalController');

router.get('/find', productoSucursalController.find);
router.get('/findById/:id', productoSucursalController.findById);
router.post('/create', productoSucursalController.create);
router.put('/update', productoSucursalController.update);
router.put('/delete/:id', productoSucursalController.delete);
router.get('/:codigo,:idSucursal', productoSucursalController.findProductoCodigoSucursal);

module.exports = router;