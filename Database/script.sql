-- SCRIPT DE CREACIÓN DE BASE DE DATOS
/*
	ROLES:
    0- ADMINISTRADOR
    1- CLIENTE
    2- REPARTIDOR
    3- EMPRESA
*/

/*
	ESTADOS DE CUENTA:
    0- PENDIENTE
    1- HABILITADA
    2- DESHABILITADA
*/

DROP DATABASE IF EXISTS PROY1;
CREATE DATABASE PROY1;
USE PROY1;

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR CATEGORÍAS DE EMPRESA ###########################
DROP TABLE IF EXISTS Categorias_empresa;
CREATE TABLE Categorias_empresa (
	id_cat INTEGER NOT NULL,
    nombre VARCHAR(150),
    imagen VARCHAR(200),
    PRIMARY KEY(id_cat)
);

INSERT INTO Categorias_empresa(id_cat, nombre, imagen) VALUES 
(1, 'Pizza', 'https://shorturl.at/muF09'),
(2, 'Postres', 'https://shorturl.at/hwHKU'),
(3, 'Hamburguesas', 'https://shorturl.at/fAD34'),
(4, 'Sandwiches', 'https://shorturl.at/npDY0'),
(5, 'Cafeteria', 'https://shorturl.at/lzLY7'),
(6, 'Hot Dogs', 'https://shorturl.at/koyEZ'),
(7, 'Comida China', 'https://shorturl.at/atEFM'),
(8, 'Comida Mexicana', 'https://rb.gy/2mwnq'),
(9, 'Comida Italiana', 'https://rb.gy/fqb2c'),
(10, 'Comida Japonesa', 'https://shorturl.at/cfjS7'),
(11, 'Comida India', 'https://shorturl.at/qKPU7'),
(12, 'Vegetariano', 'https://shorturl.at/imrw7'),
(13, 'Mariscos', 'https://shorturl.at/fvyGR'),
(14, 'Churrascos', 'https://shorturl.at/uEO39'),
(15, 'Farmacia', 'https://shorturl.at/eqF18'),
(16, 'Tienda de Conveniencia', 'https://shorturl.at/prsuW'),
(17, 'Libreria', 'https://rb.gy/jn507'),
(18, 'Bar', 'https://rb.gy/tmsap'),
(19, 'Supermercado', 'https://rb.gy/i9zvs'),
(20, 'Otro', 'https://rb.gy/1jtm6');

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR DEPARTAMENTOS ###########################
DROP TABLE IF EXISTS Departamentos;
CREATE TABLE Departamentos (
	id_dep INTEGER NOT NULL,
    nombre VARCHAR(200),
    PRIMARY KEY(id_dep)
);

INSERT INTO Departamentos VALUES 
(1, 'Alta Verapaz'),
(2, 'Baja Verapaz'),
(3, 'Chimaltenango'),
(4, 'Chiquimula'),
(5, 'El Progreso'),
(6, 'Escuintla'),
(7, 'Guatemala'),
(8, 'Huehuetenango'),
(9, 'Izabal'),
(10, 'Jalapa'),
(11, 'Jutiapa'),
(12, 'Petén'),
(13, 'Quetzaltenango'),
(14, 'Quiché'),
(15, 'Retalhuleu'),
(16, 'Sacatepéquez'),
(17, 'San Marcos'),
(18, 'Santa Rosa'),
(19, 'Sololá'),
(20, 'Suchitepéquez'),
(21, 'Totonicapán'),
(22, 'Zacapa');

-- ########################### CREACIÓN DE LA TABLA DE USUARIOS ###########################

DROP TABLE IF EXISTS Usuarios;
CREATE TABLE Usuarios (
	correo VARCHAR(200) NOT NULL,
    nombre VARCHAR(150),
    apellidos VARCHAR(150),
    contrasenia VARCHAR(100) NOT NULL,
    rol INTEGER NOT NULL,
    fecha_registro DATETIME,
    estado INTEGER NOT NULL,
    PRIMARY KEY(correo)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR ADMINISTRADORES ###########################
DROP TABLE IF EXISTS Administradores;
CREATE TABLE Administradores (
	correo VARCHAR(200) NOT NULL,
    aceptados INTEGER DEFAULT 0,
    rechazados INTEGER DEFAULT 0,
    PRIMARY KEY(correo),
    FOREIGN KEY(correo) REFERENCES Usuarios(correo)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR CLIENTES ###########################
DROP TABLE IF EXISTS Clientes;
CREATE TABLE Clientes (
	correo VARCHAR(200) NOT NULL,
    PRIMARY KEY(correo),
    FOREIGN KEY(correo) REFERENCES Usuarios(correo)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR REPARTIDORES ###########################
DROP TABLE IF EXISTS Repartidores;
CREATE TABLE Repartidores (
	correo VARCHAR(200) NOT NULL,
    municipio VARCHAR(200),
    tipo_licencia VARCHAR(10),
    motocicleta BOOLEAN,
    id_dep INTEGER NOT NULL,
    direccion VARCHAR(200),
    celular INTEGER,
    cv VARCHAR(250),
    PRIMARY KEY(correo),
    FOREIGN KEY(correo) REFERENCES Usuarios(correo),
    FOREIGN KEY(id_dep) REFERENCES Departamentos(id_dep)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR EMPRESAS ###########################
DROP TABLE IF EXISTS Empresas;
CREATE TABLE Empresas (
	correo VARCHAR(200) NOT NULL,
    descripcion VARCHAR(250),
    nombre_entidad VARCHAR(250),
    direccion VARCHAR(200),
    ciudad VARCHAR(200),
    id_dep INTEGER NOT NULL,
    id_cat INTEGER NOT NULL,
    doc VARCHAR(250),
    PRIMARY KEY(correo),
    UNIQUE(id_dep, nombre_entidad),
    FOREIGN KEY(correo) REFERENCES Usuarios(correo),
    FOREIGN KEY(id_dep) REFERENCES Departamentos(id_dep),
    FOREIGN KEY(id_cat) REFERENCES Categorias_empresa(id_cat)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR LAS CATEGORÍAS DE LOS PRODUCTOS ###########################
DROP TABLE IF EXISTS Categorias_productos;
CREATE TABLE Categorias_productos (
	id_catp INTEGER NOT NULL,
    nombre VARCHAR(200),
	PRIMARY KEY(id_catp)
);

INSERT INTO Categorias_productos(id_catp, nombre) VALUES (1, 'Entradas');
INSERT INTO Categorias_productos(id_catp, nombre) VALUES (2, 'Platos Fuertes');
INSERT INTO Categorias_productos(id_catp, nombre) VALUES (3, 'Postres');
INSERT INTO Categorias_productos(id_catp, nombre) VALUES (4, 'Bebidas');
INSERT INTO Categorias_productos(id_catp, nombre) VALUES (5, 'Niños');
INSERT INTO Categorias_productos(id_catp, nombre) VALUES (6, 'Combos');

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR PRODUCTOS ###########################
DROP TABLE IF EXISTS Productos;
CREATE TABLE Productos (
	id_prod INTEGER AUTO_INCREMENT NOT NULL,
	imagen VARCHAR(250),
	id_catp INTEGER,
    nombre VARCHAR(200),
    descripcion VARCHAR(250),
    precio DECIMAL(12,2),
    disponibilidad BOOLEAN,
    correo VARCHAR(200),
    PRIMARY KEY(id_prod),
    FOREIGN KEY(correo) REFERENCES Empresas(correo),
    FOREIGN KEY(id_catp) REFERENCES Categorias_productos(id_catp)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR COMBOS ###########################
DROP TABLE IF EXISTS Combos;
CREATE TABLE Combos (
	id_combo INTEGER AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(200),
    imagen VARCHAR(250),
    correo VARCHAR(200) NOT NULL,
    id_catp INTEGER,
    descripcion VARCHAR(250),
    precio DECIMAL(12,2),
    disponibilidad BOOLEAN,
    PRIMARY KEY(id_combo),
    FOREIGN KEY(correo) REFERENCES Empresas(correo),
    FOREIGN KEY(id_catp) REFERENCES Categorias_productos(id_catp)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR DETALLES COMBO ###########################
DROP TABLE IF EXISTS Detalle_combos;
CREATE TABLE Detalle_combos(
	id_combo INTEGER NOT NULL,
    id_prod INTEGER NOT NULL,
    PRIMARY KEY(id_combo, id_prod),
    FOREIGN KEY(id_combo) REFERENCES Combos(id_combo),
    FOREIGN KEY(id_prod) REFERENCES Productos(id_prod)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR DIRECCIONES ###########################
DROP TABLE IF EXISTS Direcciones;
CREATE TABLE Direcciones(
	id_direccion INTEGER AUTO_INCREMENT NOT NULL,
	alias VARCHAR(150),
    direccion VARCHAR(200),
    correo VARCHAR(200),
    PRIMARY KEY(id_direccion),
    FOREIGN KEY(correo) REFERENCES Clientes(correo),
    UNIQUE(alias, correo)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR FORMAS DE PAGO ###########################
DROP TABLE IF EXISTS Formas_pago;
CREATE TABLE Formas_pago(
	id_formap INTEGER AUTO_INCREMENT NOT NULL,
	alias VARCHAR(150),
    nombre VARCHAR(200),
	numero_tarjeta BIGINT,
    vencimiento VARCHAR(10),
    cvv INTEGER,
    correo VARCHAR(200),
    PRIMARY KEY(id_formap),
    FOREIGN KEY(correo) REFERENCES Clientes(correo)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR PEDIDOS ###########################
DROP TABLE IF EXISTS Pedidos;
CREATE TABLE Pedidos(
	id_pedido INTEGER AUTO_INCREMENT NOT NULL,
    correo_c VARCHAR(200),
    correo_r VARCHAR(200),
    correo_e VARCHAR(200),
    descripcion VARCHAR(250),
    estado VARCHAR(50),
    id_direccion INTEGER,
    fecha_pedido DATETIME,
	id_formap INTEGER,
    id_cupon INTEGER,
    calificacion INTEGER,
    confirmado BOOLEAN,
    total DECIMAL(12,2),
    
    PRIMARY KEY(id_pedido),
    FOREIGN KEY(id_formap) REFERENCES Formas_pago(id_formap),
    FOREIGN KEY(id_direccion) REFERENCES Direcciones(id_direccion),
    FOREIGN KEY(correo_c) REFERENCES Clientes(correo),
    FOREIGN KEY(correo_r) REFERENCES Repartidores(correo),
    FOREIGN KEY(correo_e) REFERENCES Empresas(correo)
);

-- ########################### CREACIÓN DE LA TABLA PARA GUARDAR EL DETALLE DE LOS PEDIDOS ###########################
DROP TABLE IF EXISTS Detalle_pedidos;
CREATE TABLE Detalle_pedidos(
	id_pedido INTEGER,
    id_prod INTEGER,
    id_combo INTEGER,
    cantidad INTEGER,
    total DECIMAL(12,2),
    FOREIGN KEY(id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY(id_prod) REFERENCES Productos(id_prod),
    FOREIGN KEY(id_combo) REFERENCES Combos(id_combo),
    CHECK (((id_prod IS NOT NULL) AND (id_combo IS NULL)) OR ((id_prod IS NULL) AND (id_combo IS NOT NULL)))
);

-- ########################### CREACIÓN DE LA TABLA PARA GUARDAR SOLICITUDES DE REASIGNACION ###########################
DROP TABLE IF EXISTS Solicitudes_reasignacion;
CREATE TABLE Solicitudes_reasignacion(
	correo VARCHAR(200),
    id_dep INTEGER,
    municipio VARCHAR(200),
    direccion VARCHAR(200),
    motivo VARCHAR(250),
    PRIMARY KEY(correo),
    FOREIGN KEY(correo) REFERENCES Repartidores(correo)
);

-- ########################### CREACIÓN DE LA TABLA PARA GUARDAR CUPONES ###########################
DROP TABLE IF EXISTS Cupones;
CREATE TABLE Cupones(
	id_cupon INTEGER AUTO_INCREMENT NOT NULL,
	correo VARCHAR(200),
    nombre VARCHAR(200),
    descuento DECIMAL(12,2),
    canjeado BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id_cupon),
    FOREIGN KEY(correo) REFERENCES Clientes(correo)
);