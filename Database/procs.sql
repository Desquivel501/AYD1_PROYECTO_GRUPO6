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
	IN correo_in VARCHAR(200)
)
aceptar_repartidor:BEGIN
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
    
    UPDATE Usuarios SET estado=1
    WHERE Usuarios.correo = correo_in;
    
	SELECT 'La solicitud fue aceptada correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### RECHAZAR LA PETICIÓN DE UN REPARTIDOR ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS RechazarRepartidor $$
CREATE PROCEDURE RechazarRepartidor(
	IN correo_in VARCHAR(200)
)
rechazar_repartidor:BEGIN
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
	IN correo_in VARCHAR(200)
)
aceptar_empresa:BEGIN

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
    
    UPDATE Usuarios SET estado=1
    WHERE Usuarios.correo = correo_in;

	SELECT 'La solicitud fue aceptada correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$


-- ########################### RECHAZAR LA PETICIÓN DE UNA EMPRESA ###########################
DELIMITER $$
DROP PROCEDURE IF EXISTS RechazarEmpresa $$
CREATE PROCEDURE RechazarEmpresa(
	IN correo_in VARCHAR(200)
)
rechazar_empresa:BEGIN

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
    
    DELETE FROM Empresas e
    WHERE e.correo = correo_in;
    
    DELETE FROM Usuarios u
    WHERE u.correo = correo_in;
    
	SELECT 'La solicitud fue rechazada correctamente' AS 'MENSAJE',
	'EXITO' AS 'TIPO';
END $$