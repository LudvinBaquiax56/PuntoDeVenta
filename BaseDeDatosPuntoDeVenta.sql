use proyectofinal1;

/* SE UTILIZA PARA ELIMINAR UN PROCEDIMIENTO (NO UTILIZAR SIN PREVIA AUTORIZACIÓN)
DROP PROCEDURE IF EXISTS SP_Usuarios_Login;
DROP VIEW SP_Productos_CantidadExistenciaMenor20;*/


DELIMITER //
CREATE PROCEDURE SP_Productos_MasVendidos(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT productos.codigo, productos.nombre, SUM(detalle_facturas.cantidad) AS TotalVendido, facturas.fecha
    FROM productos
    INNER JOIN detalle_facturas ON productos.id = detalle_facturas.id_producto
    INNER JOIN facturas ON facturas.id = detalle_facturas.id_factura
    WHERE facturas.fecha BETWEEN fecha_inicio AND fecha_fin
    GROUP BY productos.id
    ORDER BY TotalVendido DESC;
END 
//DELIMITER ;
/*CALL SP_Productos_MasVendidos('2023-05-01', '2023-11-01');*/


DELIMITER //
CREATE PROCEDURE SP_Productos_MenosVendidos(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT productos.codigo, productos.nombre, SUM(detalle_facturas.cantidad) AS TotalVendido, facturas.fecha
    FROM productos
    INNER JOIN detalle_facturas ON productos.id = detalle_facturas.id_producto
    INNER JOIN facturas ON facturas.id = detalle_facturas.id_factura
    WHERE facturas.fecha BETWEEN fecha_inicio AND fecha_fin
    GROUP BY productos.id
    ORDER BY TotalVendido ASC;
END 
//DELIMITER ;
/*CALL SP_Productos_MenosVendidos('2023-05-01', '2023-11-01');*/


DELIMITER //
CREATE VIEW VW_Productos_ExistenciaMenor20
AS
    SELECT productos.codigo, productos.nombre, producto_sucursales.existencia FROM productos 
    INNER JOIN producto_sucursales ON  productos.id = producto_sucursales.id_producto
    WHERE existencia < 20;
//DELIMITER ;
/*SELECT * FROM VW_Productos_ExistenciaMenor20;*/


DELIMITER //
CREATE VIEW VW_Productos_CantidadExistenciaMenor20
AS
    SELECT COUNT(*) As cantidadProductos FROM productos 
    INNER JOIN producto_sucursales ON  productos.id = producto_sucursales.id_producto
    WHERE existencia < 20;
//DELIMITER ;
/*SELECT * FROM VW_Productos_CantidadExistenciaMenor20;*/


DELIMITER //
CREATE PROCEDURE SP_Clientes_ComprasPorSucursales(IN sucursal INT)
BEGIN
    SELECT nit, clientes.nombre, COUNT(*) AS TotalCompras
    FROM clientes
    INNER JOIN facturas ON clientes.id = facturas.id_cliente
    INNER JOIN sucursales ON facturas.id_sucursal = sucursales.id
    WHERE facturas.id_sucursal = sucursal
    GROUP BY clientes.id
    ORDER BY TotalCompras DESC;
END 
//DELIMITER ;
/*CALL SP_Clientes_ComprasPorSucursales(1);*/


DELIMITER //
CREATE VIEW VW_Clientes_ComprasEnGeneral
AS
    SELECT nit, clientes.nombre, COUNT(*) AS TotalCompras
    FROM clientes
    INNER JOIN facturas ON clientes.id = facturas.id_cliente
    INNER JOIN sucursales ON facturas.id_sucursal = sucursales.id
    GROUP BY clientes.id
    ORDER BY TotalCompras DESC;
//DELIMITER ;
/*SELECT * FROM VW_Clientes_ComprasEnGeneral;*/


DELIMITER //
CREATE PROCEDURE SP_Clientes_DetalleCompras(IN cliente INT)
BEGIN
    SELECT 
		clientes.nit, clientes.nombre, 
        productos.nombre, 
        detalle_facturas.cantidad, 
        (SELECT precio FROM historial_precios 
			WHERE historial_precios.id_producto = productos.id 
			ORDER BY fecha DESC LIMIT 1) AS precio, 
        detalle_facturas.subtotal, 
        facturas.fecha
    FROM clientes
    INNER JOIN facturas ON clientes.id = facturas.id_cliente
    INNER JOIN detalle_facturas ON facturas.id = detalle_facturas.id_factura
    INNER JOIN productos ON detalle_facturas.id_producto = productos.id
    INNER JOIN historial_precios ON productos.id = historial_precios.id_producto
    WHERE clientes.id = cliente
    ORDER BY facturas.fecha;
END 
//DELIMITER;
/*CALL SP_Clientes_DetalleCompras(4);*/


DELIMITER //
CREATE VIEW VW_Clientes_General
AS
   SELECT nit, nombre, apellido, puntos_privilegio
    FROM clientes;
//DELIMITER ;
SELECT * FROM VW_Clientes_General;


DELIMITER //
CREATE PROCEDURE SP_Compras_General(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT 
        productos.nombre, 
        detalle_compras.cantidad, 
        (SELECT costo FROM historial_costos 
			WHERE historial_costos.id_producto = productos.id 
			ORDER BY fecha DESC LIMIT 1) AS costo, 
        detalle_compras.subtotal, 
        compras.fecha
    FROM compras
    INNER JOIN detalle_compras ON compras.id = detalle_compras.id_compra
    INNER JOIN productos ON detalle_compras.id_producto = productos.id
    INNER JOIN historial_costos ON productos.id = historial_costos.id_producto
    ORDER BY compras.fecha;
END 
//DELIMITER ;
/*CALL SP_Compras('2023-05-01', '2023-11-01');*/


DELIMITER //
CREATE PROCEDURE SP_Ventas_General(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT 
        productos.nombre, 
        detalle_facturas.cantidad, 
        (SELECT precio FROM historial_precios 
			WHERE historial_precios.id_producto = productos.id 
			ORDER BY fecha DESC LIMIT 1) AS precio, 
        detalle_facturas.subtotal, 
        facturas.fecha
    FROM facturas
    INNER JOIN detalle_facturas ON facturas.id = detalle_facturas.id_factura
    INNER JOIN productos ON detalle_facturas.id_producto = productos.id
    INNER JOIN historial_precios ON productos.id = historial_precios.id_producto
    ORDER BY facturas.fecha;
END 	
//DELIMITER ;
/*CALL SP_Ventas('2023-05-01', '2023-11-01');*/


DELIMITER //
CREATE PROCEDURE SP_Productos_ExistenciaSucursal(IN sucursal INT)
	BEGIN
    SELECT codigo, nombre, existencia
    FROM productos
    INNER JOIN producto_sucursales ON productos.id = producto_sucursales.id_producto
    WHERE producto_sucursales.id_sucursal = sucursal;
END //
DELIMITER ;
/*CALL SP_Productos_ExistenciaSucursal(1);*/


DELIMITER //
CREATE VIEW VW_Productos_ExistenciaGeneral
AS
   SELECT codigo, nombre, SUM(producto_sucursales.existencia) As TotalExistencia
    FROM productos
    INNER JOIN producto_sucursales ON productos.id = producto_sucursales.id_producto
    GROUP BY productos.id;
//DELIMITER ;
/*SELECT * FROM VW_Productos_ExistenciaGeneral;*/


DELIMITER //
CREATE PROCEDURE SP_Usuarios_Login(
    IN usuario_p VARCHAR(255),
    IN contraseña_p VARCHAR(255)
)
BEGIN
    DECLARE v_rol VARCHAR(255);
    DECLARE v_sucursal VARCHAR(255);
    SELECT nombre_usuario, roles.nombre, id_empleado
    FROM usuarios
    INNER JOIN roles ON usuarios.id_rol = roles.id
    WHERE nombre_usuario = usuario_p AND contraseña = contraseña_p AND usuarios.estado = 1;
END
//DELIMITER ;
/*CALL SP_Usuarios_Login('Candy','123');*/

