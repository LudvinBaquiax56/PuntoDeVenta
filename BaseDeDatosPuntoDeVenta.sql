use proyectofinal1;

/* SE UTILIZA PARA ELIMINAR UN PROCEDIMIENTO (NO UTILIZAR SIN PREVIA AUTORIZACIÓN)
DROP PROCEDURE IF EXISTS SP_Compras_General;
DROP VIEW VW_Productos_ExistenciaGeneral;*/



DELIMITER //
CREATE PROCEDURE SP_Productos_MasVendidos(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT productos.codigo As Codigo, productos.nombre As Producto, SUM(detalle_facturas.cantidad) AS TotalVendido, DATE_FORMAT(facturas.fecha, '%Y-%m-%d') As Fecha
    FROM productos
    INNER JOIN detalle_facturas ON productos.id = detalle_facturas.id_producto
    INNER JOIN facturas ON facturas.id = detalle_facturas.id_factura
    WHERE Date(facturas.fecha) BETWEEN fecha_inicio AND fecha_fin AND productos.estado = 1
    GROUP BY productos.id
    ORDER BY TotalVendido DESC;
END 
//DELIMITER ;
/*CALL SP_Productos_MasVendidos('2023-05-01', '2023-11-14');*/


DELIMITER //
CREATE PROCEDURE SP_Productos_MenosVendidos(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT productos.codigo As Codigo, productos.nombre As Producto, SUM(detalle_facturas.cantidad) AS TotalVendido, DATE_FORMAT(facturas.fecha, '%Y-%m-%d') As Fecha
    FROM productos
    INNER JOIN detalle_facturas ON productos.id = detalle_facturas.id_producto
    INNER JOIN facturas ON facturas.id = detalle_facturas.id_factura
    WHERE Date(facturas.fecha) BETWEEN fecha_inicio AND fecha_fin AND productos.estado = 1
    GROUP BY productos.id
    ORDER BY TotalVendido ASC;
END 
//DELIMITER ;
/*CALL SP_Productos_MenosVendidos('2023-05-01', '2023-11-14');*/


DELIMITER //
CREATE VIEW VW_Productos_ExistenciaMenor20
AS
    SELECT productos.codigo As Codigo, productos.nombre As Producto, producto_sucursales.existencia As Existencia
    FROM productos 
    INNER JOIN producto_sucursales ON  productos.id = producto_sucursales.id_producto
    WHERE existencia < 20 AND productos.estado = 1;
//DELIMITER ;
/*SELECT * FROM VW_Productos_ExistenciaMenor20;*/


DELIMITER //
CREATE VIEW VW_Productos_CantidadExistenciaMenor20
AS
    SELECT COUNT(*) As cantidadProductos 
    FROM productos 
    INNER JOIN producto_sucursales ON  productos.id = producto_sucursales.id_producto
    WHERE existencia < 20 AND productos.estado = 1;
//DELIMITER ;
/*SELECT * FROM VW_Productos_CantidadExistenciaMenor20;*/


DELIMITER //
CREATE PROCEDURE SP_Clientes_ComprasPorSucursales(IN sucursal INT)
BEGIN
    SELECT nit As Nit, clientes.nombre As Cliente, COUNT(*) AS TotalCompras
    FROM clientes
    INNER JOIN facturas ON clientes.id = facturas.id_cliente
    INNER JOIN sucursales ON facturas.id_sucursal = sucursales.id
    WHERE facturas.id_sucursal = sucursal AND clientes.estado = 1
    GROUP BY clientes.id
    ORDER BY TotalCompras DESC;
END 
//DELIMITER ;
/*CALL SP_Clientes_ComprasPorSucursales(1);*/


DELIMITER //
CREATE VIEW VW_Clientes_ComprasEnGeneral
AS
    SELECT nit As Nit, clientes.nombre As Cliente, COUNT(*) AS TotalCompras
    FROM clientes
    INNER JOIN facturas ON clientes.id = facturas.id_cliente
    INNER JOIN sucursales ON facturas.id_sucursal = sucursales.id
    WHERE clientes.estado = 1
    GROUP BY clientes.id
    ORDER BY TotalCompras DESC;
//DELIMITER ;
SELECT * FROM VW_Clientes_ComprasEnGeneral;


DELIMITER //
CREATE PROCEDURE SP_Clientes_DetalleCompras(IN cliente INT)
BEGIN
    SELECT 
		clientes.nit As Nit, 
        clientes.nombre As Cliente, 
        productos.nombre As Producto, 
        detalle_facturas.cantidad As Cantidad, 
        (SELECT precio FROM historial_precios 
			WHERE historial_precios.id_producto = productos.id 
			ORDER BY fecha DESC LIMIT 1) AS Precio, 
        detalle_facturas.subtotal As Subtotal, 
        facturas.fecha As Fecha
    FROM clientes
    INNER JOIN facturas ON clientes.id = facturas.id_cliente
    INNER JOIN detalle_facturas ON facturas.id = detalle_facturas.id_factura
    INNER JOIN productos ON detalle_facturas.id_producto = productos.id
    INNER JOIN historial_precios ON productos.id = historial_precios.id_producto
    WHERE clientes.id = cliente AND clientes.estado = 1
    ORDER BY facturas.fecha;
END 
//DELIMITER;
/*CALL SP_Clientes_DetalleCompras(4);*/


DELIMITER //
CREATE VIEW VW_Clientes_General
AS
   SELECT nit As Nit, nombre As Nombre, apellido As Apellido, puntos_privilegio As Puntos
    FROM clientes
    WHERE clientes.estado = 1;
//DELIMITER ;
/*SELECT * FROM VW_Clientes_General;*/


DELIMITER //
CREATE PROCEDURE SP_Compras_General(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT 
        productos.nombre As Producto, 
        detalle_compras.cantidad As Cantidad, 
        (detalle_compras.subtotal / detalle_compras.cantidad) AS Costo, 
        detalle_compras.subtotal As Subtotal, 
        DATE_FORMAT(compras.fecha, '%Y-%m-%d') AS Fecha
    FROM compras
    INNER JOIN detalle_compras ON compras.id = detalle_compras.id_compra
    INNER JOIN productos ON detalle_compras.id_producto = productos.id
    WHERE compras.estado = 1 AND DATE(compras.fecha) BETWEEN fecha_inicio AND fecha_fin
    ORDER BY compras.fecha;
END 
//DELIMITER ;
/*CALL SP_Compras_General('2023-05-01', '2023-11-14');*/


DELIMITER //
CREATE PROCEDURE SP_Ventas_General(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT 
        productos.nombre AS Producto, 
        detalle_facturas.cantidad AS Cantidad, 
        (detalle_facturas.subtotal / detalle_facturas.cantidad) AS Precio, 
        detalle_facturas.subtotal AS Subtotal, 
        DATE_FORMAT(facturas.fecha, '%Y-%m-%d') AS Fecha
    FROM facturas
    INNER JOIN detalle_facturas ON facturas.id = detalle_facturas.id_factura
    INNER JOIN productos ON detalle_facturas.id_producto = productos.id
    WHERE facturas.estado = 1 AND DATE(facturas.fecha) BETWEEN fecha_inicio AND fecha_fin
    ORDER BY facturas.fecha; 
END 	
//DELIMITER ;
/*CALL SP_Ventas_General('2023-05-01', '2023-11-14');*/


DELIMITER //
CREATE PROCEDURE SP_Productos_ExistenciaSucursal(IN sucursal INT)
	BEGIN
    SELECT codigo As Codigo, nombre As Producto, existencia As Existencia
    FROM productos
    INNER JOIN producto_sucursales ON productos.id = producto_sucursales.id_producto
    WHERE producto_sucursales.id_sucursal = sucursal AND productos.estado = 1;
END //
DELIMITER ;
/*CALL SP_Productos_ExistenciaSucursal(1);*/


DELIMITER //
CREATE VIEW VW_Productos_ExistenciaGeneral
AS
   SELECT codigo As Codigo, nombre As Producto, SUM(producto_sucursales.existencia) As Existencia
    FROM productos
    INNER JOIN producto_sucursales ON productos.id = producto_sucursales.id_producto
    WHERE productos.estado = 1
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
    SELECT nombre_usuario As Usuario, roles.nombre As Rol, id_empleado As IdEmpelado, empleados.nombre As NombreEmpleado, id_sucursal As IdSucursal, sucursales.nombre As NombreSucursal
    FROM usuarios
    INNER JOIN roles ON usuarios.id_rol = roles.id
    INNER JOIN sucursales ON usuarios.id_sucursal = sucursales.id
    WHERE nombre_usuario = usuario_p AND contraseña = contraseña_p AND usuarios.estado = 1;
END
//DELIMITER ;
/*CALL SP_Usuarios_Login('Candy','123');*/

DELIMITER //
CREATE VIEW VW_Productos_General
AS
   SELECT productos.id As id, codigo As Codigo, productos.nombre As Nombre, marcas.nombre As Marca, categorias.nombre As Categoria
    FROM productos
    INNER JOIN marcas ON productos.id_marca = marcas.id
    INNER JOIN categorias ON productos.id_categoria = categorias.id
    WHERE productos.estado = 1
//DELIMITER ;
/*SELECT * FROM VW_Productos_General;*/

DELIMITER //
CREATE VIEW VW_Usuarios_General
AS
   SELECT usuarios.id As id, 
	   usuarios.nombre_usuario As Usuario, 
	   concat(empleados.nombre, ' ', empleados.apellido) As Empleado, 
	   roles.nombre As Rol
    FROM usuarios
    INNER JOIN empleados ON usuarios.id_empleado = empleados.id
    INNER JOIN roles ON usuarios.id_rol = roles.id
    WHERE usuarios.estado = 1
//DELIMITER ;
/*SELECT * FROM VW_Usuarios_General;*/




