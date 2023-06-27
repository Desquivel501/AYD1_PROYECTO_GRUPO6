USE PROY1;

-- ########################### INICIAR SESIÓN ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS InicioSesion $$
CREATE PROCEDURE InicioSesion(
	IN correo VARCHAR(200),
    IN contrasenia VARCHAR(100)
)
inicio_sesion:BEGIN
	DECLARE rol INTEGER;
	IF(CredencialesValidas(correo, contrasenia)) THEN
		
        IF(NoIngresar(correo)) THEN
			SELECT 'Su usuario se encuentra deshabilitado o pendiente de aprobación por un administrador' AS 'MENSAJE',
			'ERROR' AS 'TIPO';
        END IF;
    
		SELECT u.rol INTO rol 
        FROM Usuarios u
        WHERE u.correo = correo;
        
        SELECT rol AS 'MENSAJE',
        'EXITO' AS 'TIPO';
    ELSE
		SELECT 'Las credenciales de inicio de sesión son incorrectas' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
    END IF;
END $$


-- ########################### INSERTAR UN CLIENTE NUEVO A TABLA USUARIOS ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS RegistrarCliente $$
CREATE PROCEDURE RegistrarCliente(
	IN correo_in VARCHAR(200),
    IN nombre_in VARCHAR(150),
    IN apellidos_in VARCHAR(150),
    IN contrasenia_in VARCHAR(150)
)
registrar_cliente:BEGIN
	IF(ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado ya se encuentra vinculado a una cuenta en la plataforma' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE registrar_cliente;
    END IF;
    
    INSERT INTO Usuarios (correo, nombre, apellidos, contrasenia, rol, estado)
    VALUES(correo_in, nombre_in, apellidos_in, contrasenia_in, 1, 1);
    
    INSERT INTO Clientes VALUES (correo_in);
    
	SELECT 'Se registró correctamente en la aplicación' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### INSERTAR UN REPARTIDOR NUEVO A TABLA USUARIOS ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS RegistrarRepartidor $$
CREATE PROCEDURE RegistrarRepartidor(
	IN nombre_in VARCHAR(150),
    IN apellidos_in VARCHAR(150),
    IN correo_in VARCHAR(200),
    IN contrasenia_in VARCHAR(150),
	IN celular_in INTEGER,
    IN tipo_licencia_in VARCHAR(10),
    IN existe_moto BOOLEAN,
    IN municipio_in VARCHAR(200),
    IN departamento VARCHAR(200),
    IN direccion_in VARCHAR(200),
    IN cv_in VARCHAR(250)
)
registrar_repartidor:BEGIN
	DECLARE id_dep_in INTEGER;
    
	IF(ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado ya se encuentra vinculado a una cuenta en la plataforma' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE registrar_repartidor;
    END IF;
    
	SELECT ObtenerDepartamento(departamento) INTO id_dep_in;
    
    INSERT INTO Usuarios (correo, nombre, apellidos, contrasenia, rol, estado)
    VALUES(correo_in, nombre_in, apellidos_in, contrasenia_in, 2, 0);
    
    INSERT INTO Repartidores (correo, municipio, tipo_licencia, motocicleta, id_dep, direccion, celular, cv)
    VALUES(correo_in, municipio_in, tipo_licencia_in, existe_moto, id_dep_in, direccion_in, celular_in, cv_in);

	SELECT 'La solicitud fue ingresada correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### ACEPTAR LA PETICIÓN DE UN REPARTIDOR ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS AceptarRepartidor $$
CREATE PROCEDURE AceptarRepartidor(
	IN correo_admin VARCHAR(200),
	IN correo_in VARCHAR(200)
)
aceptar_repartidor:BEGIN

	IF(NOT ExisteUsuario(correo_admin)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_repartidor;
    END IF;

	IF(NOT UsuarioPendiente(correo_in)) THEN
		SELECT 'El usuario que se intenta aceptar no tiene estado pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_repartidor;
    END IF;
    
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_repartidor;
    END IF;

	IF(NOT ExisteRepartidor(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a un repartidor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_repartidor;
    END IF;
    
    UPDATE Administradores a
    SET aceptados = aceptados + 1
    WHERE a.correo = correo_admin;
    
    UPDATE Usuarios SET estado=1
    WHERE Usuarios.correo = correo_in;
    
	SELECT 'La solicitud fue aceptada correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### RECHAZAR LA PETICIÓN DE UN REPARTIDOR ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS RechazarRepartidor $$
CREATE PROCEDURE RechazarRepartidor(
	IN correo_admin VARCHAR(200),
	IN correo_in VARCHAR(200)
)
rechazar_repartidor:BEGIN

	IF(NOT ExisteUsuario(correo_admin)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_repartidor;
    END IF;

	IF(NOT UsuarioPendiente(correo_in)) THEN
		SELECT 'El usuario que se intenta rechazar no tiene estado pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_repartidor;
    END IF;
    
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_repartidor;
    END IF;
    
	IF(NOT ExisteRepartidor(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a un repartidor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_repartidor;
    END IF;
    
    UPDATE Administradores a
    SET rechazados = rechazados + 1
    WHERE a.correo = correo_admin;
    
    DELETE FROM Repartidores r
    WHERE r.correo = correo_in;
    
    DELETE FROM Usuarios u
    WHERE u.correo = correo_in;

	SELECT 'La solicitud fue rechazada correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### INSERTAR UNA EMPRESA NUEVA A LA BASE DE DATOS ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS RegistrarEmpresa $$
CREATE PROCEDURE RegistrarEmpresa(
	IN correo_in VARCHAR(200),
    IN contrasenia_in VARCHAR(100),
    IN descripcion_in VARCHAR(250),
	IN nombre_entidad_in VARCHAR(250),
    IN categoria_in VARCHAR(150),
    IN departamento_in VARCHAR(200),
    IN ciudad_in VARCHAR(200),
    IN direccion_in VARCHAR(200),
    IN doc_in VARCHAR(200)
)
registrar_empresa:BEGIN
	DECLARE id_cat_in INTEGER;
    DECLARE id_dep_in INTEGER;

	IF(ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado ya se encuentra vinculado a una cuenta en la plataforma' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE registrar_empresa;
    END IF;

	SELECT ObtenerDepartamento(departamento_in) INTO id_dep_in;
    
    IF(RestauranteRepetido(nombre_entidad_in, id_dep_in)) THEN
		SELECT 'EL restaurante ingresado ya tiene una sucursal en el departamento indicado' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE registrar_empresa;
    END IF;
    
    SELECT ObtenerCategoria(categoria_in) INTO id_cat_in;
    
    INSERT INTO Usuarios (correo, nombre, apellidos, contrasenia, rol, estado)
    VALUES(correo_in, nombre_entidad_in, '', contrasenia_in, 3, 0);
    
    INSERT INTO Empresas (correo, descripcion, nombre_entidad, direccion, ciudad, id_dep, id_cat, doc)
    VALUES(correo_in, descripcion_in, nombre_entidad_in, direccion_in, ciudad_in, id_dep_in, id_cat_in, doc_in);

	SELECT 'La solicitud fue ingresada correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### ACEPTAR LA PETICIÓN DE UNA EMPRESA ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS AceptarEmpresa $$
CREATE PROCEDURE AceptarEmpresa(
	IN correo_admin VARCHAR(200),
	IN correo_in VARCHAR(200)
)
aceptar_empresa:BEGIN

	IF(NOT ExisteUsuario(correo_admin)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_empresa;
    END IF;
    
	IF(NOT UsuarioPendiente(correo_in)) THEN
		SELECT 'El usuario que se intenta aceptar no tiene estado pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_empresa;
    END IF;
    
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_empresa;
    END IF;

	IF(NOT ExisteEmpresa(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a una empresa' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_empresa;
    END IF;
    
    UPDATE Administradores a
    SET aceptados = aceptados + 1
    WHERE a.correo = correo_admin;

    UPDATE Usuarios SET estado=1
    WHERE Usuarios.correo = correo_in;

	SELECT 'La solicitud fue aceptada correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### RECHAZAR LA PETICIÓN DE UNA EMPRESA ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS RechazarEmpresa $$
CREATE PROCEDURE RechazarEmpresa(
	IN correo_admin VARCHAR(200),
	IN correo_in VARCHAR(200)
)
rechazar_empresa:BEGIN

	IF(NOT ExisteUsuario(correo_admin)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_empresa;
    END IF;
    
	IF(NOT UsuarioPendiente(correo_in)) THEN
		SELECT 'El usuario que se intenta rechazar no tiene estado pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_empresa;
    END IF;
    
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_empresa;
    END IF;
    
	IF(NOT ExisteEmpresa(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a una empresa' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_empresa;
    END IF;
    
    UPDATE Administradores a
    SET rechazados = rechazados + 1
    WHERE a.correo = correo_admin;
    
    DELETE FROM Empresas e
    WHERE e.correo = correo_in;
    
    DELETE FROM Usuarios u
    WHERE u.correo = correo_in;
    
	SELECT 'La solicitud fue rechazada correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### ALMACENAR PRODUCTOS ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS AlmacenarProducto $$
CREATE PROCEDURE AlmacenarProducto(
	IN imagen_in VARCHAR(250),
	IN nombre_in VARCHAR(200),
    IN categoria_in VARCHAR(200),
    IN descripcion_in VARCHAR(250),
    IN precio_in DECIMAL(12,2),
    IN disponibilidad_in BOOLEAN,
    IN correo_in VARCHAR(200)
)
almacenar_producto:BEGIN
	DECLARE id_catp_in INTEGER;
    
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_producto;
    END IF;

	IF(NOT ExisteEmpresa(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a una empresa' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_producto;
    END IF;
    
    SELECT ObtenerCategoriaP(categoria_in) INTO id_catp_in;
    
    IF(precio_in < 0) THEN
		SELECT 'El precio de un producto debe ser positivo' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_producto;
    END IF;
    
    IF(NOT UsuarioHabilitado(correo_in)) THEN
		SELECT 'La cuenta debe estar habilitada para poder añadir productos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_producto;
    END IF;
    
    IF(ProductoRepetido(correo_in, nombre_in)) THEN
		SELECT 'El nombre que se le quiere asignar al producto ya se encuentra en uso' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_producto;
    END IF;
    
    INSERT INTO Productos(imagen, id_catp, nombre, descripcion, precio, disponibilidad, correo)
    VALUES (imagen_in, id_catp_in, nombre_in, descripcion_in, precio_in, disponibilidad_in, correo_in);

	SELECT 'El producto se ha añadido exitosamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### ACTUALIZAR UN PRODUCTO EN ESPECIFICO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS ActualizarProducto $$
CREATE PROCEDURE ActualizarProducto(
	IN id_prod_in INTEGER,
	IN imagen_in VARCHAR(250),
	IN nombre_in VARCHAR(200),
    IN categoria_in VARCHAR(200),
    IN descripcion_in VARCHAR(250),
    IN precio_in DECIMAL(12,2),
    IN disponibilidad_in BOOLEAN,
    IN correo_in VARCHAR(200)
)
actualizar_producto:BEGIN
	DECLARE id_catp_in INTEGER;
    
	IF(NOT ExisteEmpresa(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a una empresa' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE actualizar_producto;
    END IF;
    
	IF(NOT ProductoEnEmpresa(correo_in ,id_prod_in)) THEN
		SELECT 'El producto a actualizar no pertenece a la empresa correcta' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE actualizar_producto;
    END IF;

	IF(NOT ExisteProducto(id_prod_in)) THEN
		SELECT 'El producto que desea actualizar no existe' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE actualizar_producto;
    END IF;
    
    SELECT ObtenerCategoriaP(categoria_in) INTO id_catp_in;
    
    IF(precio_in < 0) THEN
		SELECT 'El precio de un producto debe ser positivo' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE actualizar_producto;
    END IF;
    
    IF(NOT UsuarioHabilitado(correo_in)) THEN
		SELECT 'La cuenta debe estar habilitada para poder añadir productos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE actualizar_producto;
    END IF;
    
    IF(imagen_in = null OR imagen_in = '') THEN
        UPDATE Productos
        SET id_catp = id_catp_in, nombre = nombre_in, descripcion = descripcion_in,
        precio = precio_in, disponibilidad = disponibilidad_in, correo = correo_in
        WHERE Productos.id_prod = id_prod_in;
    ELSE
        UPDATE Productos
        SET imagen = imagen_in, id_catp = id_catp_in, nombre = nombre_in, descripcion = descripcion_in,
        precio = precio_in, disponibilidad = disponibilidad_in, correo = correo_in
        WHERE Productos.id_prod = id_prod_in;
    END IF;

	SELECT 'El producto se ha actualizado exitosamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### ELIMINAR UN PRODUCTO EN ESPECIFICO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS EliminarProducto $$
CREATE PROCEDURE EliminarProducto(
	IN correo VARCHAR(200),
	IN id_prod_in INTEGER
)
eliminar_producto:BEGIN

	IF(NOT ProductoEnEmpresa(correo ,id_prod_in)) THEN
		SELECT 'El producto a ingresar no pertenece a la empresa correcta' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE eliminar_producto;
    END IF;

	IF(NOT ExisteProducto(id_prod_in)) THEN
		SELECT 'El producto que desea eliminar no existe' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE eliminar_producto;
    END IF;
    
    IF(ProductoEnUso(correo ,id_prod_in)) THEN
		SELECT 'El producto no se puede eliminar debido a que pertenece a un combo' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
    ELSE	
		DELETE FROM Productos p
        WHERE p.id_prod = id_prod_in;
        
		SELECT 'El producto se ha eliminado exitosamente' AS 'MENSAJE',
        'EXITO' AS 'TIPO';
    END IF;
END $$

-- ########################### ALMACENAR COMBO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS AlmacenarCombo $$
CREATE PROCEDURE AlmacenarCombo(
	IN correo_in VARCHAR(200),
    IN nombre_in VARCHAR(200),
    IN imagen_in VARCHAR(250),
    IN precio_in DECIMAL(12,2),
    IN descripcion_in VARCHAR(250),
    IN disponibilidad_in BOOLEAN
)
almacenar_combo:BEGIN

	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_combo;
    END IF;
    
	IF(ExisteCombo(correo_in, nombre_in)) THEN
		SELECT 'El nombre ingresado para el combo ya se encuentra en uso' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_combo;
    END IF;
    
	IF(NOT ExisteEmpresa(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a una empresa' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_combo;
    END IF;
    
    IF(precio_in < 0) THEN
		SELECT 'El precio de un combo debe ser positivo' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_combo;
    END IF;
    
    IF(NOT UsuarioHabilitado(correo_in)) THEN
		SELECT 'La cuenta debe estar habilitada para poder añadir combos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE almacenar_combo;
    END IF;
    
	INSERT INTO Combos(nombre, imagen, correo, id_catp, descripcion, precio, disponibilidad)
    VALUES (nombre_in, imagen_in, correo_in, 6, descripcion_in, precio_in, disponibilidad_in);
    
	SELECT 'El combo se ha añadido exitosamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### AGREGAR UN PRODUCTO A COMBO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS AgregarProductoCombo $$
CREATE PROCEDURE AgregarProductoCombo(
	IN correo_in VARCHAR(200),
    IN nombre_in VARCHAR(200),
    IN id_prod_in INTEGER
)
agregar_producto_combo:BEGIN
	DECLARE id_combo_in INTEGER;
    
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE agregar_producto_combo;
    END IF;

	IF(NOT ExisteEmpresa(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a una empresa' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE agregar_producto_combo;
    END IF;
    
	IF(NOT ExisteCombo(correo_in, nombre_in)) THEN
		SELECT 'El nombre ingresado para el combo no existe' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE agregar_producto_combo;
    END IF;
    
	IF(NOT ExisteProducto(id_prod_in)) THEN
		SELECT 'El producto ingresado para el combo no existe' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE agregar_producto_combo;
    END IF;
    
    SELECT ObtenerComboId(correo_in, nombre_in) 
    INTO id_combo_in;

	IF(ProductoEnCombo(id_combo_in ,id_prod_in)) THEN
		SELECT 'El producto ingresado ya forma parte del combo' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE agregar_producto_combo;
    END IF;
    
	IF(NOT ProductoEnEmpresa(correo_in ,id_prod_in)) THEN
		SELECT 'El producto a ingresar no pertenece a la empresa correcta' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE agregar_producto_combo;
    END IF;
    
    INSERT INTO Detalle_combos
    VALUES (id_combo_in, id_prod_in);
    
	SELECT 'El producto se ha agregado exitosamente al combo' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### OBTENER TODOS LOS COMBOS CON TODOS SUS PRODUCTOS ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS ObtenerCombosConProductos $$
CREATE PROCEDURE ObtenerCombosConProductos(
	IN correo VARCHAR(200)
)
obtener_combos_con_productos:BEGIN
    SELECT c.id_combo AS id, c.nombre AS title, c.precio AS cost, c.descripcion AS descripcion, c.disponibilidad AS disponible,
    (CASE WHEN (COUNT(p.id_prod) = 0) THEN JSON_ARRAY()
	ELSE
		JSON_ARRAYAGG(
			JSON_OBJECT('id', p.id_prod, 'title', p.nombre, 'image', p.imagen)
		) 
	END) AS productos
    FROM Combos c
    LEFT JOIN Detalle_combos dc ON c.id_combo = dc.id_combo
    LEFT JOIN Productos p ON dc.id_prod = p.id_prod
    WHERE c.correo = correo
    GROUP BY c.id_combo;
END $$

-- ########################### GUARDAR UNA NUEVA FORMA DE PAGO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS CrearFormaPago $$
CREATE PROCEDURE CrearFormaPago (
	IN alias_in VARCHAR(150),
    IN nombre_in VARCHAR(200),
	IN numero_tarjeta_in BIGINT,
    IN vencimiento_in VARCHAR(10),
    IN cvv_in INTEGER,
    IN correo_in VARCHAR(200)
)
crear_forma_pago:BEGIN
	DECLARE id_formap INTEGER;
    
	IF((NOT ExisteUsuario(correo_in)) AND (correo_in IS NOT NULL)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_forma_pago;
    END IF;
    
	IF(FormaPagoExistente(correo_in, alias_in)) THEN
		SELECT 'La forma de pago ingresada ya existe en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_forma_pago;
    END IF;
    
    INSERT INTO Formas_pago (alias, nombre, numero_tarjeta, vencimiento, cvv, correo)
    VALUES (alias_in, nombre_in ,numero_tarjeta_in, vencimiento_in, cvv_in, correo_in);
    
    SELECT fp.id_formap INTO id_formap
    FROM Formas_pago fp
    ORDER BY fp.id_formap DESC
    LIMIT 1;

	SELECT id_formap AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### GUARDAR UNA NUEVA DIRECCION ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS CrearDireccion $$
CREATE PROCEDURE CrearDireccion(
	IN alias_in VARCHAR(150),
    IN direccion_in VARCHAR(200),
    IN correo_in VARCHAR(200)
)	
crear_direccion:BEGIN
	DECLARE id_direccion INTEGER;
    
	IF((NOT ExisteUsuario(correo_in)) AND (correo_in IS NOT NULL)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_direccion;
    END IF;
  
	IF(DireccionExistente(alias_in ,correo_in)) THEN
		SELECT 'La direccion que desea crear ya existe en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_direccion;
    END IF;
    
    INSERT INTO Direcciones (alias, direccion, correo)
    VALUES (alias_in, direccion_in, correo_in);

    SELECT d.id_direccion INTO id_direccion
    FROM Direcciones d
    ORDER BY d.id_direccion DESC
    LIMIT 1;

	SELECT id_direccion AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### ALMACENAR UN NUEVO PEDIDO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS CrearPedido $$
CREATE PROCEDURE CrearPedido(
	IN correo_c_in VARCHAR(200),
    IN id_dep INTEGER,
    IN nombre_res VARCHAR(250),
	IN id_dir_in INTEGER,
    IN id_formap_in INTEGER,
    IN id_cupon_in INTEGER,
    IN total_in DECIMAL(12,2),
    IN descripcion_in VARCHAR(250)
)
crear_pedido:BEGIN
	DECLARE id_pedido INTEGER;
    DECLARE correo_e_in VARCHAR(200);
    
	IF(NOT ExisteCliente(correo_c_in)) THEN
		SELECT 'El correo de cliente ingresado no se encuentra en el sistema' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_pedido;
    END IF;
    
    SELECT CorreoRestaurante(nombre_res, id_dep) INTO correo_e_in;
    
	IF(NOT ExisteDireccion(id_dir_in)) THEN
		SELECT 'La direccion ingresada no existe en el sistema' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_pedido;
    END IF;

	IF(id_formap_in IS NOT NULL) THEN
		IF(NOT ExisteFormaPago(id_formap_in)) THEN
			SELECT 'La forma de pago ingresada no existe en el sistema' AS 'MENSAJE',
			'ERROR' AS 'TIPO';
			LEAVE crear_pedido;
		END IF;
	END IF;
    
    IF(id_cupon_in > 0) THEN
		IF(NOT CuponExiste(id_cupon_in)) THEN
			SELECT 'El cupon indicado no existe' AS 'MENSAJE',
			'ERROR' AS 'TIPO';
			LEAVE crear_pedido;
        END IF;
        
        UPDATE Cupones c
        SET c.canjeado = true
        WHERE c.id_cupon = id_cupon_in;
    END IF;

	INSERT INTO Pedidos(correo_c, correo_r, correo_e, estado, id_direccion, id_formap, calificacion, confirmado, total, descripcion)
    VALUES(correo_c_in, null, correo_e_in, 'PENDIENTE', id_dir_in, id_formap_in, 0, false, total_in, descripcion_in);
    
    SELECT p.id_pedido INTO id_pedido
    FROM Pedidos p
    ORDER BY p.id_pedido DESC
    LIMIT 1;

	SELECT id_pedido AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### ALMACENAR UN NUEVO ELEMENTO EN EL PEDIDO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS AgregarElementoPedido $$
CREATE PROCEDURE AgregarElementoPedido (
	IN id_pedido_in INTEGER,
    IN id_prod_in INTEGER,
    IN id_combo_in INTEGER,
    IN cantidad_in INTEGER,
    IN total_in DECIMAL(12,2)
)
agregar_elemento_pedido:BEGIN
	IF(id_prod_in IS NOT NULL) THEN
		IF(NOT ExisteProducto(id_prod_in)) THEN
			SELECT 'El producto ingresado no existe en el sistema' AS 'MENSAJE',
			'ERROR' AS 'TIPO';
			LEAVE agregar_elemento_pedido;
        END IF;
    END IF;
    
    IF(id_combo_in IS NOT NULL) THEN
		IF(NOT ExisteComboId(id_combo_in)) THEN
			SELECT 'El combo ingresado no existe en el sistema' AS 'MENSAJE',
			'ERROR' AS 'TIPO';
			LEAVE agregar_elemento_pedido;
        END IF;
    END IF;
    
    IF(cantidad_in < 0) THEN
		SELECT 'La cantidad ingresada debe ser positiva' AS 'MENSAJE',
		'ERROR' AS 'TIPO';
		LEAVE agregar_elemento_pedido;
    END IF;

    IF(total_in < 0) THEN
		SELECT 'El total ingresada debe ser positiva' AS 'MENSAJE',
		'ERROR' AS 'TIPO';
		LEAVE agregar_elemento_pedido;
    END IF;
    
    INSERT INTO Detalle_pedidos(id_pedido, id_prod, id_combo, cantidad, total)
    VALUES(id_pedido_in, id_prod_in, id_combo_in, cantidad_in, total_in);
    
	SELECT 'Producto ingresado exitosamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### PROCEDIMIENTO PARA ALMACENAR UNA NUEVA SOLICITUD DE REASIGNACIÓN ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS CrearSolicitudReasignacion $$
CREATE PROCEDURE CrearSolicitudReasignacion(
	IN correo_in VARCHAR(200),
    IN departamento_in VARCHAR(200),
    IN municipio_in VARCHAR(200),
    IN direccion_in VARCHAR(200),
    IN motivo_in VARCHAR(250)
)
crear_solicitud_reasignacion:BEGIN
	DECLARE id_dep_in INTEGER;

	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_solicitud_reasignacion;
    END IF;
    
	IF(NOT ExisteRepartidor(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a un repartidor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_solicitud_reasignacion;
    END IF;
    
    IF(ExisteSolicitudReasignacion(correo_in)) THEN
		SELECT 'No se puede crear la solicitud debido a que ya existe una solicitud pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_solicitud_reasignacion;
    END IF;
    
	SELECT ObtenerDepartamento(departamento_in) INTO id_dep_in;
    
	INSERT INTO Solicitudes_reasignacion(correo, id_dep, municipio, direccion, motivo)
    VALUES(correo_in, id_dep_in, municipio_in, direccion_in, motivo_in);
    
	SELECT 'Solicitud de reasignación realizada exitósamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### PROCEDIMIENTO PARA ACEPTAR SOLICITUD DE REASIGNACIÓN ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS AceptarSolicitudReasignacion $$
CREATE PROCEDURE AceptarSolicitudReasignacion(
	IN correo_in VARCHAR(200)
)
aceptar_solicitud_reasignacion:BEGIN
	DECLARE id_dep INTEGER;
    DECLARE municipio VARCHAR(200);
    DECLARE direccion VARCHAR(200);
    
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_solicitud_reasignacion;
    END IF;
    
	IF(NOT ExisteRepartidor(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a un repartidor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_solicitud_reasignacion;
    END IF;
    
    IF(NOT ExisteSolicitudReasignacion(correo_in)) THEN
		SELECT 'El usuario que ha seleccionado no tiene una solicitud de reasignacion pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_solicitud_reasignacion;
    END IF;
    
    SELECT sr.id_dep, sr.municipio, sr.direccion 
    INTO id_dep, municipio, direccion 
    FROM Solicitudes_reasignacion sr
    WHERE sr.correo = correo_in;
    
    UPDATE Repartidores r
    SET r.id_dep = id_dep, r.municipio = municipio, r.direccion = direccion
    WHERE r.correo = correo_in;
    
    DELETE FROM Solicitudes_reasignacion sr
    WHERE sr.correo = correo_in;
    
	SELECT 'Solicitud de reasignación aceptada exitosamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### PROCEDIMIENTO PARA RECHAZAR SOLICITUD DE REASIGNACIÓN ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS RechazarSolicitudReasignacion $$
CREATE PROCEDURE RechazarSolicitudReasignacion(
	IN correo_in VARCHAR(200)
)
rechazar_solicitud_reasignacion:BEGIN
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_solicitud_reasignacion;
    END IF;
    
	IF(NOT ExisteRepartidor(correo_in)) THEN
		SELECT 'El correo ingresado no pertenece a un repartidor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_solicitud_reasignacion;
    END IF;
    
    IF(NOT ExisteSolicitudReasignacion(correo_in)) THEN
		SELECT 'El usuario que ha seleccionado no tiene una solicitud de reasignacion pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE rechazar_solicitud_reasignacion;
    END IF;
    
    DELETE FROM Solicitudes_reasignacion sr
    WHERE sr.correo = correo_in;
    
	SELECT 'Solicitud de reasignación rechazada exitosamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### PROCEDIMIENTO PARA AGREGAR CUPON A CLIENTE ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS CrearCupon $$
CREATE PROCEDURE CrearCupon(
	IN correo_in VARCHAR(200),
    IN nombre_in VARCHAR(200),
    IN descuento_in DECIMAL(12,2)
)
crear_cupon:BEGIN
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_cupon;
    END IF;
    
	IF(NOT ExisteCliente(correo_in)) THEN
		SELECT 'El correo de cliente ingresado no se encuentra en el sistema' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_cupon;
    END IF;
    
	IF(CuponRepetido(nombre_in, correo_in)) THEN
		SELECT 'Un usuario no puede tener cupones repetidos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_cupon;
    END IF;
    
    IF(descuento_in < 0 OR descuento_in > 1) THEN
		SELECT 'El porcentaje de descuento ingresado no es válido' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE crear_cupon;
    END IF;
    
    INSERT INTO Cupones(correo, nombre, descuento)
    VALUES (correo_in, nombre_in, descuento_in);
    
	SELECT 'El cupón se ha creado y asignado exitósamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### PROCEDIMIENTO PARA ELIMINAR CUPON ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS EliminarCupon $$
CREATE PROCEDURE EliminarCupon(
	IN id_cupon_in INTEGER
)
eliminar_cupon:BEGIN
	IF(NOT CuponExiste(id_cupon_in)) THEN
		SELECT 'El cupón ingresado no existe' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE eliminar_cupon;
    END IF;
    
    DELETE FROM Cupones c
    WHERE c.id_cupon = id_cupon_in;
    
	SELECT 'El cupón se canjeado exitósamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### PROCEDIMIENTO PARA DESHABILITAR USUARIO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS DeshabilitarCliente $$
CREATE PROCEDURE DeshabilitarCliente(
	IN correo_in VARCHAR(200)
)
deshabilitar_cliente:BEGIN
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE deshabilitar_cliente;
    END IF;

	IF(NOT ExisteCliente(correo_in)) THEN
		SELECT 'El correo de cliente ingresado no se encuentra en el sistema' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE deshabilitar_cliente;
    END IF;
    
	IF(UsuarioPendiente(correo_in)) THEN
		SELECT 'El usuario que se intenta deshabilitar no tiene un estado válido' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE deshabilitar_cliente;
    END IF;
    
    
    UPDATE Usuarios
    SET estado = 2
    WHERE correo = correo_in;
    
	SELECT 'El usuario se ha deshabilitado exitosamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### PROCEDIMIENTO PARA ACEPTAR PEDIDO DE EMPRESA ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS AceptarPedidoEmpresa $$
CREATE PROCEDURE AceptarPedidoEmpresa(
	id_pedido_in INTEGER,
    correo_in VARCHAR(200)
)
aceptar_pedido_empresa:BEGIN
	IF(NOT ExisteUsuario(correo_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_pedido_empresa;
    END IF;

	IF(NOT ExisteEmpresa(correo_in)) THEN
		SELECT 'El correo de empresa ingresado no se encuentra en el sistema' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_pedido_empresa;
    END IF;
    
	IF(NOT PedidoExiste(id_pedido_in)) THEN
		SELECT 'El pedido que se envió no existe' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_pedido_empresa;
    END IF;
    
	IF(NOT PedidoPertenece(id_pedido_in, correo_in)) THEN
		SELECT 'El pedido que se envió no pertenece a la empresa enviada' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_pedido_empresa;
    END IF;
    
	IF(PedidoConfirmado(id_pedido_in)) THEN
		SELECT 'El pedido que se envió ya ha sido confirmado' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE aceptar_pedido_empresa;
    END IF;
    
    UPDATE Pedidos p
    SET confirmado = true
    WHERE p.id_pedido = id_pedido_in;
    
	SELECT 'El pedido se confirmó correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$

-- ########################### PROCEDIMIENTO PARA RETORNAR EL DETALLE DE UN PEDIDO EN ESPECÍFICO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS DatosPedido $$
CREATE PROCEDURE DatosPedido(
	IN correo_in VARCHAR(200),
    IN id_pedido_in INTEGER
)
datos_pedido:BEGIN
  SELECT p.id_pedido AS id, e.nombre_entidad AS restaurante, ce.imagen AS img_categoria,
  CONCAT(u.nombre, " ", u.apellidos) AS repartidor, p.calificacion, d.direccion, p.total AS costo, p.fecha_pedido AS fecha,
  p.estado, fp.numero_tarjeta, p.descripcion AS nota, JSON_ARRAYAGG(
    CASE WHEN prod.id_prod IS NOT NULL THEN JSON_OBJECT(
      'id', prod.id_prod, 'Combo', false, 'titulo', prod.nombre, 'imagen', prod.imagen, 'descripcion', prod.descripcion, 
      'cantidad', dp.cantidad, 'precio', prod.precio
    )
    ELSE JSON_OBJECT(
      'id', co.id_combo, 'Combo', true, 'titulo', co.nombre, 'imagen', '', 'descripcion', co.descripcion, 
      'cantidad', dp.cantidad, 'precio', co.precio
    ) END
  ) AS productos
  FROM Pedidos p
  JOIN Empresas e ON p.correo_e = e.correo AND p.id_pedido = id_pedido_in
  JOIN Categorias_empresa ce ON e.id_cat = ce.id_cat
  JOIN Direcciones d ON p.id_direccion = d.id_direccion
  LEFT JOIN Formas_pago fp ON p.id_formap = fp.id_formap
  LEFT JOIN Usuarios u ON p.correo_r = u.correo
  JOIN Detalle_pedidos dp ON p.id_pedido = dp.id_pedido
  LEFT JOIN Productos prod ON dp.id_prod = prod.id_prod
  LEFT JOIN Combos co ON dp.id_combo = co.id_combo
  GROUP BY id;
END $$