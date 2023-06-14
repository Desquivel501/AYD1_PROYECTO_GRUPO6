-- ########################### VALIDAR QUE UN USUARIO YA EXISTA ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ExisteUsuario $$
CREATE FUNCTION ExisteUsuario(
	correo_in VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN 
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Usuarios u WHERE u.correo = correo_in) INTO existe;
    RETURN(existe);
END $$

-- ########################### OBTENER DEPARTAMENTO EN BASE A SU NOMBRE ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ObtenerDepartamento $$
CREATE FUNCTION ObtenerDepartamento(
	departamento VARCHAR(200)
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE id_dep INTEGER;
    SELECT Departamentos.id_dep INTO id_dep
    FROM Departamentos
    WHERE Departamentos.nombre = departamento;
    RETURN(id_dep);
END $$

-- ########################### OBTENER CATEGORÍA DE EMPRESA EN BASE A SU NOMBRE ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ObtenerCategoria $$
CREATE FUNCTION ObtenerCategoria(
	categoria VARCHAR(150)
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE id_cat INTEGER;
    SELECT Categorias_empresa.id_cat INTO id_cat
    FROM Categorias_empresa
    WHERE Categorias_empresa.nombre = categoria;
    RETURN(id_cat);
END $$

-- ########################### COMPROBAR SI SE ENCUENTRA UN RESTAURANTE REPETIDO ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS RestauranteRepetido $$
CREATE FUNCTION RestauranteRepetido(
	nombre VARCHAR(250),
    departamento INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( 
    SELECT 1 FROM Empresas e
	WHERE e.nombre_entidad = nombre 
    AND id_dep = departamento) INTO existe;
    RETURN(existe);
END $$

-- ########################### COMPROBAR SI EXISTE UN RESTAURANTE ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ExisteEmpresa $$
CREATE FUNCTION ExisteEmpresa(
	correo VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Empresas e
    WHERE e.correo = correo) INTO existe;
    RETURN(existe);
END $$

-- ########################### COMPROBAR SI EXISTE UN REPARTIDOR ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ExisteRepartidor $$
CREATE FUNCTION ExisteRepartidor(
	correo VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Repartidores r
    WHERE r.correo = correo) INTO existe;
    RETURN(existe);
END $$

-- ########################### FUNCION PARA SABER SI UN USUARIO TIENE ESTADO PENDIENTE ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS UsuarioPendiente $$
CREATE FUNCTION UsuarioPendiente(
	correo VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE pendiente BOOLEAN;
    SELECT Usuarios.estado = 0 INTO pendiente
    FROM Usuarios
	WHERE Usuarios.correo = correo;
    RETURN(pendiente);
END $$