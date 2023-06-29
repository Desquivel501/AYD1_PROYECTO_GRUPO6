const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
// Importa tu archivo de conexión
const mysql = require("./conexion");
require("dotenv").config();

/*Habilitar los cors para todos los accesos*/
app.use(cors());

/*Configuración de de express*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

// const upload = multer({ dest: 'uploads/' });

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCES_KEY,
  },
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = Date.now() + "_" + file.fieldname + "_" +
        file.originalname;
      cb(null, fileName);
    },
  }),
});
const roles = {
  "admin": 0,
  "cliente": 1,
  "repartidor": 2,
  "empresa": 3,
};
// Token
function getToken(datos, res) {
  const encoded = jwt.sign(datos, process.env.JWT_PASSWORD, {
    expiresIn: "24h",
  });
  //res.cookie("x-token", encoded, { httpOnly: true,secure:true,sameSite:"lax"});
  res.cookie("x-token", encoded, { httpOnly: true });
}
function verificartoken(rol) {
  return (req, res, next) => {
    console.log(req.path);
    try {
      const cookie = req.headers.cookie;
      const decoded = jwt.verify(
        cookie.split("=")[1],
        process.env.JWT_PASSWORD,
      );
      if (roles[rol] != decoded.rol) {
        res.status(401).json({
          "TIPO": "ERROR",
          "MENSAJE": "No tiene autorización para hacer esta acción",
        });
        return;
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        "TIPO": "ERROR",
        "MENSAJE": "No tiene autorización para hacer esta acción",
      });
    }
  };
}

// ########################### INSERTAR UN CLIENTE NUEVO A TABLA USUARIOS ###########################
app.post("/RegistrarCliente", upload.single("document"), cors(), (req, res) => {
  const parametro1 = req.body.email;
  const parametro2 = req.body.name;
  const parametro3 = req.body.lastname;
  const parametro4 = req.body.password;

  mysql.query("CALL RegistrarCliente(?,?,?,?)", [
    parametro1,
    parametro2,
    parametro3,
    parametro4,
  ], (err, results) => {
    if (err) {
      console.error(
        "Error al ejecutar el procedimiento almacenado RegistrarCliente:",
        err,
      );
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
      return;
    }

    const formattedResult = results[0].map((row) => ({
      MENSAJE: row.MENSAJE,
      TIPO: row.TIPO,
    }));
    res.status(200).json(formattedResult);
  });
});

// ########################### INICIAR SESIÓN ###########################
app.post("/InicioSesion", upload.single("document"), cors(), (req, res) => {
  const parametro1 = req.body.email;
  const parametro2 = req.body.password;

  mysql.query(
    "CALL InicioSesion(?,?)",
    [parametro1, parametro2],
    (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado InicioSesion:",
          err,
        );
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }

      const formattedResult = results[0].map((row) => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO,
      }));

      getToken({ rol: formattedResult[0].MENSAJE }, res);
      res.status(200).json(formattedResult);
    },
  );
});

// -- ########################### INSERTAR UN REPARTIDOR NUEVO A TABLA USUARIOS ###########################
app.post(
  "/RegistrarRepartidor",
  upload.single("document"),
  cors(),
  (req, res) => {
    const parametro1 = req.body.name;
    const parametro2 = req.body.lastname;
    const parametro3 = req.body.email;
    const parametro4 = req.body.password;
    const parametro5 = req.body.phone;
    const parametro6 = req.body.Licencia;
    const parametro7 = req.body.Vehiculo;
    const parametro8 = req.body.Municipio;
    const parametro9 = req.body.Departamento;
    const parametro10 = req.body.zona;
    const parametro11 = (req.file === undefined) ? null : req.file.location;

    mysql.query("CALL RegistrarRepartidor(?,?,?,?,?,?,?,?,?,?,?)", [
      parametro1,
      parametro2,
      parametro3,
      parametro4,
      parametro5,
      parametro6,
      parametro7,
      parametro8,
      parametro9,
      parametro9 + ", " + parametro8 + ", Zona " + parametro10,
      parametro11,
    ], (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado RegistrarRepartidor:",
          err,
        );
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }

      const formattedResult = results[0].map((row) => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO,
      }));

      res.status(200).json(formattedResult);
    });
  },
);

// -- ########################### ACEPTAR LA PETICIÓN DE UN REPARTIDOR ###########################
app.post("/AceptarRepartidor", cors(), verificartoken("admin"), (req, res) => {
  const parametro1 = req.body.admin;
  const parametro2 = req.body.email;
  const parametro3 = req.body.aceptado;

  let procedimeinto = parametro3 ? "AceptarRepartidor" : "RechazarRepartidor";

  mysql.query(
    `CALL ${procedimeinto}(?,?)`,
    [parametro1, parametro2],
    (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado AceptarRepartidor:",
          err,
        );
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }

      const formattedResult = results[0].map((row) => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO,
      }));

      res.status(200).json(formattedResult);
    },
  );
});

//-- ########################### INSERTAR UNA EMPRESA NUEVA A LA BASE DE DATOS ###########################
app.post("/RegistrarEmpresa", upload.single("document"), cors(), (req, res) => {
  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  const parametro1 = req.body.email;
  const parametro2 = req.body.password;
  const parametro3 = req.body.description;
  const parametro4 = req.body.name;
  const parametro5 = req.body.categoria;
  const parametro6 = req.body.Departamento;
  const parametro7 = req.body.Municipio;
  const parametro8 = parametro6 + ", " + parametro7 + ", Zona " + req.body.zona;
  const parametro9 = (req.file === undefined) ? null : req.file.location;

  mysql.query("CALL RegistrarEmpresa(?,?,?,?,?,?,?,?,?)", [
    parametro1,
    parametro2,
    parametro3,
    parametro4,
    parametro5,
    parametro6,
    parametro7,
    parametro8,
    parametro9,
  ], (err, results) => {
    if (err) {
      console.error(
        "Error al ejecutar el procedimiento almacenado RegistrarEmpresa:",
        err,
      );
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
      return;
    }

    const formattedResult = results[0].map((row) => ({
      MENSAJE: row.MENSAJE,
      TIPO: row.TIPO,
    }));

    res.status(200).json(formattedResult);
  });
});

//-- ########################### ACEPTAR LA PETICIÓN DE UNA EMPRESA ###########################
app.post("/AceptarEmpresa", cors(), verificartoken("admin"), (req, res) => {
  const parametro1 = req.body.admin;
  const parametro2 = req.body.email;
  const parametro3 = req.body.aceptado;

  let procedimeinto = parametro3 ? "AceptarEmpresa" : "RechazarEmpresa";

  mysql.query(
    `CALL ${procedimeinto}(?,?)`,
    [parametro1, parametro2],
    (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado AceptarEmpresa:",
          err,
        );
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }

      const formattedResult = results[0].map((row) => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO,
      }));

      res.status(200).json(formattedResult);
    },
  );
});

//-- ########################### ALMACENAR PRODUCTOS ###########################
app.post(
  "/CrearProducto",
  upload.single("imagen"),
  verificartoken("empresa"),
  cors(),
  (req, res) => {
    const parametro1 = (req.file === undefined) ? "" : req.file.location;
    const parametro2 = req.body.nombre;
    const parametro3 = req.body.categoria;
    const parametro4 = req.body.descripcion;
    const parametro5 = req.body.costo;
    const parametro6 = req.body.disponible == "true" ? 1 : 0;
    const parametro7 = req.body.empresa;

    mysql.query("CALL AlmacenarProducto(?,?,?,?,?,?,?)", [
      parametro1,
      parametro2,
      parametro3,
      parametro4,
      parametro5,
      parametro6,
      parametro7,
    ], (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado AlmacenarProducto:",
          err,
        );
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }

      const formattedResult = results[0].map((row) => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO,
      }));

      res.status(200).json(formattedResult);
    });
  },
);

//-- ########################### ACTUALIZAR UN PRODUCTO EN ESPECIFICO ###########################
app.post(
  "/EditarProducto",
  upload.single("imagen"),
  cors(),
  verificartoken("empresa"),
  (req, res) => {
    /// estas se colocan en lugar de parametro1, parametro2; etc...
    const parametro0 = req.body.id;
    const parametro1 = (req.file === undefined) ? "" : req.file.location;
    const parametro2 = req.body.nombre;
    const parametro3 = req.body.categoria;
    const parametro4 = req.body.descripcion;
    const parametro5 = req.body.costo;
    const parametro6 = req.body.disponible == "true" ? 1 : 0;
    const parametro7 = req.body.empresa;

    mysql.query("CALL ActualizarProducto(?,?,?,?,?,?,?,?)", [
      parametro0,
      parametro1,
      parametro2,
      parametro3,
      parametro4,
      parametro5,
      parametro6,
      parametro7,
    ], (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado ActualizarProducto:",
          err,
        );
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }

      const formattedResult = results[0].map((row) => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO,
      }));

      res.status(200).json(formattedResult);
    });
  },
);

//-- ########################### ELIMINAR UN PRODUCTO EN ESPECIFICO ###########################
app.post("/EliminarProducto", cors(), verificartoken("empresa"), (req, res) => {
  const parametro1 = req.body.correo;
  const parametro2 = req.body.producto;

  mysql.query(
    "CALL EliminarProducto(?,?)",
    [parametro1, parametro2],
    (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado EliminarProducto:",
          err,
        );
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }

      const formattedResult = results[0].map((row) => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO,
      }));

      res.status(200).json(formattedResult);
    },
  );
});

// -- ########################### ALMACENAR COMBO ###########################
app.post("/CrearCombo", cors(), verificartoken("empresa"), (req, res) => {
  const parametro1 = req.body.empresa;
  const parametro2 = req.body.nombre;
  const parametro3 = "";
  const parametro4 = req.body.costo;
  const parametro5 = req.body.descripcion;
  const parametro6 = req.body.disponible;
  const parametro7 = req.body.productos;

  let formattedResult2 = { "MENSAJE": null, "TIPO": null };

  mysql.query("CALL AlmacenarCombo(?,?,?,?,?,?)", [
    parametro1,
    parametro2,
    parametro3,
    parametro4,
    parametro5,
    parametro6,
  ], (err, results) => {
    if (err) {
      console.error(
        "Error al ejecutar el procedimiento almacenado AlmacenarCombo:",
        err,
      );
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
      return;
    }

    formattedResult2 = results[0].map((row) => ({
      MENSAJE: row.MENSAJE,
      TIPO: row.TIPO,
    }));

    if (formattedResult2.TIPO == "ERROR") {
      res.status(500).json(formattedResult2);
      return;
    }

    parametro7.forEach((elemento) => {
      mysql.query("CALL AgregarProductoCombo(?,?,?)", [
        parametro1,
        parametro2,
        elemento,
      ], (err, results) => {
        if (err) {
          console.error(
            "Error al ejecutar el procedimiento almacenado AgregarProductoCombo:",
            err,
          );
          res.status(500).json({
            "TIPO": "ERROR",
            "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
          });
          return;
        }
      });
    });
    res.json(formattedResult2);
  });
});

//-- ##################################### Retornar todos los combos #####################################
app.post("/ObtenerCombos", cors(), (req, res) => {
  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  const parametro1 = req.body.correo;

  mysql.query(
    "Call ObtenerCombosConProductos(?)",
    [parametro1],
    (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado ObtenerProductosCombo:",
          err,
        );
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }

      const resultadosParseados = results[0].map((resultado) => {
        resultado.productos = JSON.parse(resultado.productos);
        return resultado;
      });

      res.json(resultadosParseados);
    },
  );
});

//-- ##################################### Retornar todos los Productos #####################################
app.post("/ObtenerProductos", cors(), (req, res) => {
  const parametro1 = req.body.correo;

  let query =
    `SELECT p.id_prod as id, p.nombre as title, p.precio as cost, p.imagen as image, p.descripcion as descripcion, 
  cp.nombre as categoria, p.disponibilidad as disponible 
  FROM Categorias_productos cp 
  JOIN Productos p 
  ON p.id_catp = cp.id_catp
  AND p.correo = ?`;

  mysql.query(query, [parametro1], (err, results) => {
    if (err) {
      console.error(
        "Error al ejecutar el procedimiento almacenado ObtenerTodosLosProductos:",
        err,
      );
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
      return;
    }
    res.json(results);
  });
});

//-- ##################################### Obtener datos de un repartidor #####################################
app.post(
  "/ObtenerDatosRepartidor",
  cors(),
  verificartoken("repartidor"),
  (req, res) => {
    const correo = req.body.correo;

    mysql.query("CALL ObtenerDatosRepartidor(?)", [correo], (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado ObtenerProductosCombo:",
          err,
        );
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }

      res.json(results);
    });
  },
);

//-- ##################################### Obtener los datos de una empresa #####################################
app.post("/ObtenerDatosEmpresa", cors(), (req, res) => {
  const parametro1 = req.body.correo;
  let query = `SELECT * 
  FROM Usuarios u 
  JOIN Empresas e 
  ON u.correo = e.correo 
  AND u.correo = ? 
  JOIN Departamentos d 
  ON e.id_dep = d.id_dep
  JOIN Categorias_empresa ce
  ON ce.id_cat = e.id_cat`;

  mysql.query(query, [parametro1], (err, results) => {
    if (err) {
      console.error(
        "Error al ejecutar el procedimiento almacenado ObtenerProductosCombo:",
        err,
      );
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
      return;
    }
    res.json(results);
  });
});

//-- ##################################### Obtener los datos de una empresa en base a su departamento y nombre #####################################
app.post("/ObtenerDatosEmpresa2", cors(), (req, res) => {
  const nombre = req.body.nombre;
  const departamento = req.body.departamento;

  let query = `SELECT * 
  FROM Usuarios u 
  JOIN Empresas e 
  ON u.correo = e.correo 
  AND u.nombre = ? 
  JOIN Departamentos d 
  ON e.id_dep = d.id_dep
  AND e.id_dep = ? 
  JOIN Categorias_empresa ce
  ON ce.id_cat = e.id_cat`;

  mysql.query(query, [nombre, departamento], (err, results) => {
    if (err) {
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
      return;
    }
    res.json(results);
  });
});

//-- ##################################### Obtener los datos de todas las empresas #####################################
app.get(
  "/ObtenerDatosEmpresas",
  cors(),
  verificartoken("empresa"),
  (req, res) => {
    let query = `SELECT * 
  FROM Usuarios u 
  JOIN Empresas e 
  ON u.correo = e.correo 
  JOIN Departamentos d 
  ON e.id_dep = d.id_dep
  JOIN Categorias_empresa ce
  ON ce.id_cat = e.id_cat`;

    mysql.query(query, (err, results) => {
      res.json(results);
    });
  },
);

//-- ##################################### Obtener listado de usuarios#####################################
app.get("/ObtenerUsuarios", cors(), verificartoken("admin"), (req, res) => {
  query = `SELECT correo AS id, nombre, apellidos, rol, fecha_registro, estado 
  FROM Usuarios 
  WHERE Usuarios.rol != 0`;

  mysql.query(query, (err, results) => {
    res.json(results);
  });
});

//-- ##################################### Obtener listado de usuarios#####################################
app.get("/ObtenerHabilitados", cors(), verificartoken("admin"), (req, res) => {
  query =
    `SELECT correo AS id, nombre, apellidos, rol, fecha_registro AS fecha,contrasenia, estado 
  FROM Usuarios 
  WHERE Usuarios.rol != 0 AND Usuarios.estado=1`;

  mysql.query(query, (err, results) => {
    res.json(results);
  });
});

//-- ##################################### Obtener las solicitudes de repartidores #####################################
app.get(
  "/SolicitudesRepartidores",
  cors(),
  verificartoken("admin"),
  (req, res) => {
    let query = `SELECT * FROM Usuarios
  JOIN Repartidores
  ON Usuarios.correo = Repartidores.correo AND estado = 0
  JOIN Departamentos
  ON Repartidores.id_dep = Departamentos.id_dep`;

    mysql.query(query, (err, results) => {
      res.json(results);
    });
  },
);

//-- ##################################### Obtener las solicitudes de empresas #####################################
app.get("/SolicitudesEmpresas", cors(), verificartoken("admin"), (req, res) => {
  let query = `SELECT * FROM Usuarios
  JOIN Empresas
  ON Usuarios.correo = Empresas.correo 
  AND estado = 0`;

  mysql.query(query, (err, results) => {
    res.json(results);
  });
});

//-- ##################################### Obtener las categorias de empresa #####################################
app.get("/CategoriasEmpresa", cors(), (req, res) => {
  let query =
    `SELECT id_cat AS id, nombre AS categoria, imagen FROM Categorias_empresa`;

  mysql.query(query, (err, results) => {
    res.json(results);
  });
});

//-- ##################################### Deshabilitar cliente #####################################
app.post("/deshabilitar", cors(), verificartoken("admin"), (req, res) => {
  const correo = req.body.correo;
  //const motivo = req.body.motivo;

  mysql.query("CALL DeshabilitarCliente(?)", [correo], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
    }
    res.status(200).json(results);
  });
});

//-- ##################################### Solicitar nueva dirección #####################################
app.post(
  "/nuevaDireccion",
  upload.single("document"),
  cors(),
  verificartoken("repartidor"),
  (req, res) => {
    const correo = req.body.correo;
    const departamento = req.body.Departamento;
    const municipio = req.body.Municipio;
    const zona = req.body.zona;
    const motivo = req.body.Motivo;

    const direccion = `${departamento} ${municipio} ${zona}`;

    mysql.query("CALL CrearSolicitudReasignacion(?,?,?,?,?)", [
      correo,
      departamento,
      municipio,
      direccion,
      motivo,
    ], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Retornar solicitudes de reasignación #####################################
app.get(
  "/obtenerReasignaciones",
  cors(),
  verificartoken("admin"),
  (req, res) => {
    const query =
      `SELECT correo, d.nombre as departamento, municipio, direccion, motivo 
  FROM Solicitudes_reasignacion sr
  JOIN Departamentos d
  ON d.id_dep = sr.id_dep
  `;
    mysql.query(query, (err, results) => {
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Aceptar solicitud de reasignación #####################################
app.post(
  "/aceptarReasignacion",
  cors(),
  verificartoken("admin"),
  (req, res) => {
    const correo = req.body.correo;

    mysql.query(
      "CALL AceptarSolicitudReasignacion(?)",
      [correo],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            "TIPO": "ERROR",
            "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
          });
        }
        res.status(200).json(results);
      },
    );
  },
);

//-- ##################################### Guardar una nueva dirección #####################################
app.post("/guardarDireccion", cors(), verificartoken("cliente"), (req, res) => {
  const correo = req.body.correo;
  let alias = req.body.alias;
  const direccion = req.body.direccion;

  if (correo == null) alias = `${Date.now()}`;

  mysql.query(
    "CALL CrearDireccion(?,?,?)",
    [alias, direccion, correo],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    },
  );
});

//-- ##################################### Guardar una nueva dirección #####################################
app.post("/guardarTarjeta", cors(), verificartoken("cliente"), (req, res) => {
  const correo = req.body.correo;
  let alias = req.body.alias;
  const name = req.body.name;
  const cc = req.body.cc;
  const vencimiento = req.body.vencimiento;
  const cvv = req.body.cvv;

  if (correo == null) alias = `${Date.now()}`;

  mysql.query("CALL CrearFormaPago(?,?,?,?,?,?)", [
    alias,
    name,
    cc,
    vencimiento,
    cvv,
    correo,
  ], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
    }
    res.status(200).json(results);
  });
});

//-- ##################################### Obtener listado de las tarjetas registradas #####################################
app.post("/obtenerTarjetas", cors(), verificartoken("cliente"), (req, res) => {
  const correo = req.body.correo;
  const query =
    `SELECT id_formap AS id, alias, nombre AS name, numero_tarjeta AS cc
  FROM Formas_pago
  WHERE correo = ?`;

  mysql.query(query, [correo], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
    }
    res.status(200).json(results);
  });
});

//-- ##################################### Obtener listado de las direcciones registradas #####################################
app.post(
  "/obtenerDirecciones",
  cors(),
  verificartoken("cliente"),
  (req, res) => {
    const correo = req.body.correo;
    const query = `SELECT id_direccion AS id, alias AS name, direccion
  FROM Direcciones 
  WHERE correo = ?`;

    mysql.query(query, [correo], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Obtener listado de los cupones registrados #####################################
app.post("/obtenerCupones", cors("cliente"), (req, res) => {
  const correo = req.body.correo;
  const query = `SELECT id_cupon AS id, nombre AS alias, descuento, canjeado 
  FROM Cupones c
  WHERE c.canjeado = false;`;

  mysql.query(query, [correo], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
    }
    res.status(200).json(results);
  });
});

//-- ##################################### Rechazar solicitud de reasignación #####################################
app.post(
  "/rechazarReasignacion",
  cors(),
  verificartoken("admin"),
  (req, res) => {
    const correo = req.body.correo;

    mysql.query(
      "CALL RechazarSolicitudReasignacion(?)",
      [correo],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            "TIPO": "ERROR",
            "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
          });
        }
        res.status(200).json(results);
      },
    );
  },
);

//-- ##################################### Crear nuevo pedido #####################################
app.post("/crearPedido", cors(), verificartoken("cliente"), (req, res) => {
  const departamento = req.body.departamento;
  const restaurante = req.body.restaurante;
  const cliente = req.body.usuario;
  const productos = req.body.productos;
  const direccion = req.body.direccion;
  let forma_pago = req.body.forma_pago;
  let cupon = req.body.cupon;
  const total = req.body.total;
  const descripcion = req.body.descripcion;

  if (cupon == 0) cupon = null;
  if (forma_pago == 0) forma_pago = null;

  mysql.query("CALL CrearPedido(?,?,?,?,?,?,?,?)", [
    cliente,
    departamento,
    restaurante,
    direccion,
    forma_pago,
    cupon,
    total,
    descripcion,
  ], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
      return;
    }
    if (results[0][0].TIPO == "EXITO") {
      let id_pedido = results[0][0].MENSAJE;
      productos.forEach((producto, index) => {
        let query = producto.combo
          ? `CALL AgregarElementoPedido(?,null,${producto.id},?,?)`
          : `CALL AgregarElementoPedido(?,${producto.id},null,?,?)`;
        mysql.query(
          query,
          [id_pedido, producto.cantidad, producto.subtotal],
          (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                "TIPO": "ERROR",
                "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
              });
              return;
            }
          },
        );
      });
      res.status(200).json({
        "TIPO": "EXITO",
        "MENSAJE": "El pedido se ha realizado exitósamente",
      });
    } else {
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
    }
  });
});

//-- ##################################### Obtener los pedidos de un repartidor #####################################
app.post(
  "/obtenerPedidosRepartidor",
  cors(),
  verificartoken("repartidor"),
  (req, res) => {
    const correo = req.body.correo;
    const query =
      `SELECT p.id_pedido AS id, e.nombre_entidad AS restaurante, correo_c AS cliente, 
  total AS costo, fecha_pedido AS fecha, p.estado AS estado
  FROM Pedidos p
  JOIN Empresas e
  ON  p.correo_e = e.correo
  AND p.correo_r = ?
  `;
    mysql.query(query, [correo], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Obtener los pedidos de una empresa #####################################
app.post(
  "/obtenerPedidosEmpresa",
  cors(),
  verificartoken("empresa"),
  (req, res) => {
    const correo = req.body.correo;
    const query =
      `SELECT id_pedido AS id, correo_c AS cliente, fecha_pedido AS fecha, total AS costo
  FROM Pedidos p
  WHERE p.correo_e = ?
  AND confirmado = false`;
    mysql.query(query, [correo], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
        return;
      }
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Aceptar el pedido de una empresa #####################################
app.post(
  "/aceptarPedidoEmpresa",
  cors(),
  verificartoken("empresa"),
  (req, res) => {
    const id_pedido = req.body.id;
    const correo = req.body.correo;
    mysql.query(
      "CALL AceptarPedidoEmpresa(?,?)",
      [id_pedido, correo],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            "TIPO": "ERROR",
            "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
          });
          return;
        }
        res.status(200).json(results);
      },
    );
  },
);

//-- ##################################### Obtener los pedidos de un cliente #####################################
app.post("/pedidosCliente", cors(), verificartoken("cliente"), (req, res) => {
  const correo = req.body.correo;
  const query =
    `SELECT p.id_pedido AS id, e.nombre_entidad AS restaurante, CONCAT(u.nombre, " ", u.apellidos) AS repartidor, 
  d.direccion, p.total AS costo, p.fecha_pedido AS fecha, p.estado
  FROM Pedidos p
  JOIN Empresas e
  ON p.correo_e = e.correo
  AND p.correo_c = ?
  LEFT JOIN Usuarios u
  ON p.correo_r = u.correo
  JOIN Direcciones d
  ON d.id_direccion = p.id_direccion`;

  mysql.query(query, [correo], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
      return;
    }
    res.status(200).json(results);
  });
});

//-- ##################################### Obtener datos de un pedido específico #####################################
app.post("/datosPedido", cors(), (req, res) => {
  const correo = req.body.correo;
  const id_pedido = req.body.id;

  mysql.query("CALL DatosPedido(?,?)", [correo, id_pedido], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
      return;
    }

    if (results[0][0].TIPO == "ERROR") {
      res.json(results[0][0]);
      return;
    }

    results[0][0].productos = JSON.parse(results[0][0].productos);
    results[0][0].cupon = JSON.parse(results[0][0].cupon);
    res.status(200).json(results[0][0]);
  });
});

//-- ##################################### Obtener los pedidos disponibles para aceptar #####################################
app.post(
  "/pedidosDisponibles",
  cors(),
  verificartoken("empresa"),
  (req, res) => {
    const correo = req.body.correo;
    mysql.query("CALL PedidosDisponibles(?)", [correo], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Calificar un pedido específico #####################################
app.post("/calificarPedido", cors(), verificartoken("cliente"), (req, res) => {
  const id_pedido = req.body.id;
  const calificacion = req.body.calificacion;
  mysql.query(
    "CALL CalificarPedido(?,?)",
    [id_pedido, calificacion],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    },
  );
});

//-- ##################################### Aceptar un pedido #####################################
app.post(
  "/aceptarPedidoRepartidor",
  cors(),
  verificartoken("repartidor"),
  (req, res) => {
    const id_pedido = req.body.id;
    const correo = req.body.correo;

    mysql.query(
      "CALL AceptarPedidoRepartidor(?,?)",
      [correo, id_pedido],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            "TIPO": "ERROR",
            "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
          });
        }
        res.status(200).json(results);
      },
    );
  },
);

//-- ##################################### Entregar un pedido #####################################
app.post(
  "/entregarPedido",
  cors(),
  verificartoken("repartidor"),
  (req, res) => {
    const id_pedido = req.body.id;

    mysql.query("CALL EntregarPedido(?)", [id_pedido], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Obtener todos los pedidos #####################################
app.get("/obtenerPedidos", cors(), (req, res) => {
  const query =
    `SELECT id_pedido AS id, correo_c AS cliente, fecha_pedido AS fecha, total AS costo
  FROM Pedidos p`;
  mysql.query(query, (err, results) => {
    res.status(200).json(results);
  });
});

//-- ##################################### Top de las empresas que más pedidos generan #####################################
app.get("/topPedidosEmpresas", cors(), verificartoken("admin"), (req, res) => {
  mysql.query("CALL TopPedidosEmpresas()", (err, results) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
    }
    res.status(200).json(results);
  });
});

//-- ##################################### Historial de pedidos de una empresa específica #####################################
app.post(
  "/historialPedidosEmpresa",
  cors(),
  verificartoken("empresa"),
  (req, res) => {
    const correo = req.body.correo;
    mysql.query("CALL HistorialPedidosEmpresa(?)", [correo], (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Historial de pedidos de un cliente específico #####################################
app.post(
  "/historialPedidosCliente",
  cors(),
  verificartoken("cliente"),
  (req, res) => {
    const correo = req.body.correo;
    mysql.query("CALL HistorialPedidosCliente(?)", [correo], (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Top de los mejores repartidores #####################################
app.get(
  "/topMejoresRepartidores",
  cors(),
  verificartoken("admin"),
  (req, res) => {
    mysql.query("CALL TopMejoresRepartidores()", (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    });
  },
);

//-- ##################################### Top global de productos #####################################
app.get("/topProductosGlobal", cors(), verificartoken("admin"), (req, res) => {
  mysql.query("CALL TopProductosGlobal()", (err, results) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        "TIPO": "ERROR",
        "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
      });
    }
    res.status(200).json(results);
  });
});

//-- ##################################### Top producto de cada empresa #####################################
app.post(
  "/topProductoEmpresa",
  cors(),
  verificartoken("empresa"),
  (req, res) => {
    const correo = req.body.correo;
    console.log(correo);
    mysql.query("CALL TopProductoEmpresa(?)", [correo], (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).json({
          "TIPO": "ERROR",
          "MENSAJE": "ERROR INTERNO DEL SERVIDOR",
        });
      }
      res.status(200).json(results);
    });
  },
);
app.get("/logout", cors(), (req, res) => {
  res.cookie("x-token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
});
/*
// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});*/
module.exports = app;
