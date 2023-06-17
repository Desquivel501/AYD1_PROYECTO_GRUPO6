USE PROY1;

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
    VALUES(correo_in, municipio_in, tipo_licencia_in, existe_moto, id_dep_in, celular_in, direccion_in, cv_in);

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

-- ########################### OBTENER LOS PRODUCTOS DE UN COMBO ESPECIFICO ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS ObtenerProductosCombo $$
CREATE PROCEDURE ObtenerProductosCombo(
	IN id_combo_in INTEGER
)
obtener_producto_combo:BEGIN
	SELECT * FROM Detalle_combos dc
    JOIN Productos p
    ON dc.id_prod = p.id_prod
    AND dc.id_combo = id_combo_in;
END $$