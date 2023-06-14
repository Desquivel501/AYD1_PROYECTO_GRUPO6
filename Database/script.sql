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
    PRIMARY KEY(id_cat)
);

INSERT INTO Categorias_empresa(id_cat, nombre) VALUES (1, 'Restaurante');
INSERT INTO Categorias_empresa(id_cat, nombre) VALUES (2, 'Tienda de conveniencia');
INSERT INTO Categorias_empresa(id_cat, nombre) VALUES (3, 'Supermercado');

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR DEPARTAMENTOS ###########################
DROP TABLE IF EXISTS Departamentos;
CREATE TABLE Departamentos (
	id_dep INTEGER NOT NULL,
    nombre VARCHAR(200),
    PRIMARY KEY(id_dep)
);

INSERT INTO Departamentos VALUES (1, 'Alta Verapaz');
INSERT INTO Departamentos VALUES (2, 'Baja Verapaz');
INSERT INTO Departamentos VALUES (3, 'Chimaltenango');
INSERT INTO Departamentos VALUES (4, 'Chiquimula');
INSERT INTO Departamentos VALUES (5, 'El Progreso');
INSERT INTO Departamentos VALUES (6, 'Escuintla');
INSERT INTO Departamentos VALUES (7, 'Guatemala');
INSERT INTO Departamentos VALUES (8, 'Huehuetenango');
INSERT INTO Departamentos VALUES (9, 'Izabal');
INSERT INTO Departamentos VALUES (10, 'Jalapa');
INSERT INTO Departamentos VALUES (11, 'Jutiapa');
INSERT INTO Departamentos VALUES (12, 'Petén');
INSERT INTO Departamentos VALUES (13, 'Quetzaltenango');
INSERT INTO Departamentos VALUES (14, 'Quiché');
INSERT INTO Departamentos VALUES (15, 'Retalhuleu');
INSERT INTO Departamentos VALUES (16, 'Sacatepéquez');
INSERT INTO Departamentos VALUES (17, 'San Marcos');
INSERT INTO Departamentos VALUES (18, 'Santa Rosa');
INSERT INTO Departamentos VALUES (19, 'Solola');
INSERT INTO Departamentos VALUES (20, 'Suchitepéquez');
INSERT INTO Departamentos VALUES (21, 'Totonicapán');
INSERT INTO Departamentos VALUES (22, 'Zacapa');

-- ########################### CREACIÓN DE LA TABLA DE USUARIOS ###########################

DROP TABLE IF EXISTS Usuarios;
CREATE TABLE Usuarios (
	correo VARCHAR(200) NOT NULL,
    nombre VARCHAR(150),
    apellidos VARCHAR(150),
    contrasenia VARCHAR(100) NOT NULL,
    rol INTEGER NOT NULL,
    fecha_registro DATETIME DEFAULT current_timestamp,
    estado INTEGER NOT NULL,
    PRIMARY KEY(correo)
);

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR ADMINISTRADORES ###########################
DROP TABLE IF EXISTS Administradores;
CREATE TABLE Administradores (
	correo VARCHAR(200) NOT NULL,
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