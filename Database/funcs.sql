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

-- ########################### FUNCION PARA SABER SI UN USUARIO SE ENCUENTRA HABILITADO ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS UsuarioHabilitado $$
CREATE FUNCTION UsuarioHabilitado(
	correo VARCHAR(150)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE Habilitado BOOLEAN;
    SELECT Usuarios.estado = 1 INTO Habilitado
    FROM Usuarios
    WHERE Usuarios.correo = correo;
    RETURN(Habilitado);
END $$

-- ########################### OBTENER CATEGORÍA DE PRODUCTO EN BASE A SU NOMBRE ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ObtenerCategoriaP $$
CREATE FUNCTION ObtenerCategoriaP(
	categoria VARCHAR(150)
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE id_cat INTEGER;
    SELECT Categorias_productos.id_catp INTO id_cat
    FROM Categorias_productos
    WHERE Categorias_productos.nombre = categoria;
    RETURN(id_cat);
END $$

-- ########################### VERIFICAR SI UN PRODUCTO CON EL MISMO NOMBRE YA EXISTE PARA UNA EMPRESA DETERMINADA ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ProductoRepetido $$
CREATE FUNCTION ProductoRepetido(
	correo VARCHAR(200),
    nombre VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Productos p 
    WHERE p.nombre = nombre 
    AND p.correo = correo) INTO existe;
    RETURN(existe);
END $$

-- ########################### VERIFICAR SI UN PRODUCTO EXISTE ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ExisteProducto $$
CREATE FUNCTION ExisteProducto(
	id_prod_in INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Productos p
    WHERE p.id_prod = id_prod_in) INTO existe;
    RETURN(existe);
END $$

-- ########################### VERIFICAR SI EL NOMBRE DE UN COMBO YA EXISTE ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ExisteCombo $$
CREATE FUNCTION ExisteCombo(
	correo VARCHAR(200),
	nombre VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Combos c
    WHERE c.nombre = nombre
    AND c.correo = correo) INTO existe;
    RETURN(existe);
END $$

-- ########################### DEVUELVE EL ID DE UN COMBO DEPENDIENDO DE SU NOMBRE Y EMPRESA ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ObtenerComboId $$
CREATE FUNCTION ObtenerComboId(
	correo VARCHAR(200),
	nombre VARCHAR(200)
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE id_combo INTEGER;
    SELECT c.id_combo INTO id_combo 
    FROM Combos c
    WHERE c.nombre = nombre
    AND c.correo = correo;
    RETURN(id_combo);
END $$

-- ########################### VERIFICA SI UN PRODUCTO YA ES PARTE DE UN COMBO ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ProductoEnCombo $$
CREATE FUNCTION ProductoEnCombo(
	id_combo INTEGER,
    id_prod INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	Declare existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Detalle_combos dc
    WHERE dc.id_combo = id_combo 
    AND dc.id_prod = id_prod) INTO existe;
    RETURN(existe);
END $$

-- ########################### VERIFICA SI UN PRODUCTO ES DE LA EMPRESA CORRECTA ###########################
DELIMITER $$
DROP FUNCTION IF EXISTS ProductoEnEmpresa $$
CREATE FUNCTION ProductoEnEmpresa (
	correo_in VARCHAR(200),
    id_prod INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE pertenece BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Productos p
    WHERE p.correo = correo_in 
    AND p.id_prod = id_prod) INTO pertenece;
    RETURN(pertenece);
END $$