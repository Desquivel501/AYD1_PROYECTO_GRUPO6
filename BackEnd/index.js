const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');
// Importa tu archivo de conexión
const mysql = require('./conexion');

/*Habilitar los cors para todos los accesos*/
app.use(cors())

/*Configuración de de express*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// ########################### INSERTAR UN CLIENTE NUEVO A TABLA USUARIOS ###########################

app.post('/RegistrarCliente',upload.single('document'), cors(), (req, res) => {
    const parametro1 = req.body.email;
    const parametro2 = req.body.name;
    const parametro3 = req.body.lastname;
    const parametro4 = req.body.password;

    mysql.query('CALL RegistrarCliente(?,?,?,?)', [parametro1, parametro2, parametro3, parametro4], (err, results) => {
        if (err) {
          console.error('Error al ejecutar el procedimiento almacenado RegistrarCliente:', err);
          return;
        }
        console.log('Procedimiento almacenado ejecutado exitosamente RegistrarCliente');
        
        const formattedResult = results[0].map(row => ({
          MENSAJE: row.MENSAJE,
          TIPO: row.TIPO
        }));
        
        res.json(formattedResult);
        console.log(formattedResult);

      });
      
});



// ########################### INICIAR SESIÓN ###########################

app.post('/InicioSesion',upload.single('document'), cors(), (req, res) => {
  const parametro1 = req.body.email;
  const parametro2 = req.body.password;

  mysql.query('CALL InicioSesion(?,?)', [parametro1, parametro2], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado InicioSesion:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente InicioSesion');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      res.json(formattedResult);
      console.log(parametro1);
      console.log(parametro2);

    });
});



// -- ########################### INSERTAR UN REPARTIDOR NUEVO A TABLA USUARIOS ###########################


app.post('/RegistrarRepartidor',upload.single('document'), cors(), (req, res) => {
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
    const parametro11 = req.file;

  mysql.query('CALL RegistrarRepartidor(?,?,?,?,?,?,?,?,?,?,?)', [parametro1, parametro2, parametro3, parametro4, 
    parametro5, parametro6, parametro7, parametro8, parametro9, parametro10 + parametro9 + parametro8, parametro11], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado RegistrarRepartidor:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente RegistrarRepartidor');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });

});


// -- ########################### ACEPTAR LA PETICIÓN DE UN REPARTIDOR ###########################

app.post('/AceptarRepartidor', cors(), (req, res) => {

  const parametro1 = req.body.admin;
  const parametro2 = req.body.email;
  const parametro3 = req.body.aceptado;

  let procedimeinto= parametro3? 'AceptarRepartidor': 'RechazarRepartidor'

  mysql.query(`CALL ${procedimeinto}(?,?)`, [parametro1, parametro2,], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado AceptarRepartidor:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente AceptarRepartidor');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});


// -- ########################### RECHAZAR LA PETICIÓN DE UN REPARTIDOR ###########################

app.post('/RechazarRepartidor', cors(), (req, res) => {

  const parametro1 = req.body.correo_admin;
  const parametro2 = req.body.correo;

  mysql.query('CALL RechazarRepartidor(?,?)', [parametro1, parametro2,], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado RechazarRepartidor:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente RechazarRepartidor');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});


//-- ########################### INSERTAR UNA EMPRESA NUEVA A LA BASE DE DATOS ###########################

app.post('/RegistrarEmpresa',upload.single('document'), cors(), (req, res) => {

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
    const parametro1 = req.body.email;
    const parametro2 = req.body.password;
    const parametro3 = req.body.description;
    const parametro4 = req.body.name;
    const parametro5 = req.body.categoria;
    const parametro6 = req.body.Departamento;
    const parametro7 = req.body.Municipio;
    const parametro8 = req.body.zona +" " + parametro6+ " " + parametro7;
    const parametro9 = req.file;

  mysql.query('CALL RegistrarEmpresa(?,?,?,?,?,?,?,?,?)', [parametro1, parametro2, parametro3, parametro4, parametro5, parametro6, parametro7, parametro8, parametro9], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado RegistrarEmpresa:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente RegistrarEmpresa');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});



//-- ########################### ACEPTAR LA PETICIÓN DE UNA EMPRESA ###########################

app.post('/AceptarEmpresa', cors(), (req, res) => {

  const parametro1 = req.body.admin;
  const parametro2 = req.body.email;
  const parametro3 = req.body.aceptado;

  let procedimeinto= parametro3? 'AceptarEmpresa': 'RechazarEmpresa'

  mysql.query(`CALL ${procedimeinto}(?,?)`, [parametro1, parametro2,], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado AceptarEmpresa:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente AceptarEmpresa');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});


//-- ########################### RECHAZAR LA PETICIÓN DE UNA EMPRESA ###########################


app.post('/RechazarEmpresa', cors(), (req, res) => {

  const parametro1 = req.body.correo_admin;
  const parametro2 = req.body.correo;

  mysql.query('CALL RechazarEmpresa(?,?)', [parametro1, parametro2,], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado RechazarEmpresa:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente RechazarEmpresa');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});


//-- ########################### ALMACENAR PRODUCTOS ###########################


app.post('/CrearProducto',upload.single('imagen'), cors(), (req, res) => {

    const parametro1 = req.file;
    const parametro2 = req.body.nombre;
    const parametro3 = req.body.categoria;
    const parametro4 = req.body.descripcion;
    const parametro5 = req.body.costo;
    const parametro6 = req.body.disponible;
    const parametro7 = req.body.empresa;

  mysql.query('CALL AlmacenarProducto(?,?,?,?,?,?,?)', [parametro1, parametro2, parametro3, parametro4, parametro5, parametro6, parametro7], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado AlmacenarProducto:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente AlmacenarProducto');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});


//-- ########################### ACTUALIZAR UN PRODUCTO EN ESPECIFICO ###########################

app.post('/EditarProducto',upload.single('imagen'), cors(), (req, res) => {

  /// estas se colocan en lugar de parametro1, parametro2; etc...
    const parametro0 = req.body.id;
    const parametro1 = req.file;
    const parametro2 = req.body.nombre;
    const parametro3 = req.body.categoria;
    const parametro4 = req.body.descripcion;
    const parametro5 = req.body.costo;
    const parametro6 = req.body.disponible;
    const parametro7 = req.body.empresa;

  mysql.query('CALL ActualizarProducto(?,?,?,?,?,?,?,?)', [parametro0, parametro1, parametro2, parametro3, parametro4, parametro5, parametro6, parametro7], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado ActualizarProducto:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente ActualizarProducto');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});


//-- ########################### ELIMINAR UN PRODUCTO EN ESPECIFICO ###########################

app.post('/EliminarProducto', cors(), (req, res) => {

  const parametro1 = req.body.correo;
  const parametro2 = re1.body.producto;;

  mysql.query('CALL EliminarProducto(?,?)', [parametro1, parametro2,], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado EliminarProducto:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente EliminarProducto');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});



// -- ########################### ALMACENAR COMBO ###########################

app.post('/CrearCombo', cors(), (req, res) => {

  const parametro1 = req.body.empresa;
  const parametro2 = req.body.name;
  const parametro3 = "";
  const parametro4 = req.body.costo;
  const parametro5 = req.body.descripcion;
  const parametro6 = req.body.disponible;
  const parametro7 = req.body.productos;

  let formattedResult2 = {"MENSAJE": null, "TIPO": null};

  mysql.query('CALL AlmacenarCombo(?,?,?,?,?,?)', [parametro1, parametro2, parametro3, parametro4, parametro5, parametro6], (err, results) => {
    if (err) {
      console.error('Error al ejecutar el procedimiento almacenado AlmacenarCombo:', err);
      return;
    }
    console.log('Procedimiento almacenado ejecutado exitosamente AlmacenarCombo');

    formattedResult2 = results[0].map(row => ({
      MENSAJE: row.MENSAJE,
      TIPO: row.TIPO
    }));

    console.log("1111111111111111111111111111111111111111111111111111111111111111111")

    console.log(formattedResult2);

    if (formattedResult2.TIPO == "ERROR") {
      res.json(formattedResult2);
      return
    }

    console.log("22222222222222222222222222222222222222222222222222222222222222222")

    parametro7.forEach((elemento) => {
      mysql.query('CALL AgregarProductoCombo(?,?,?)', [parametro1, parametro2, elemento], (err, results) => {
        if (err) {
          console.error('Error al ejecutar el procedimiento almacenado AgregarProductoCombo:', err);
          return;
        }
        console.log('Procedimiento almacenado ejecutado exitosamente AgregarProductoCombo');

        
      });
    });

    // Mover la respuesta aquí dentro del callback de la consulta a la base de datos
    res.json(formattedResult2);
    console.log(formattedResult2);

  });

});



//-- ##################################### Retornar todos los combos #####################################

app.post('/ObtenerCombos', cors(), (req, res) => {

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  const parametro1 = req.body.correo;

  mysql.query('Call ObtenerCombosConProductos(?)',[parametro1], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado ObtenerProductosCombo:', err);
        return;
      }

      const resultadosParseados = results[0].map((resultado) => {
        resultado.productos = JSON.parse(resultado.productos);
        return resultado;
      });
      
      res.json(resultadosParseados[0]);
      console.log(resultadosParseados);

    });
    
});



//-- ##################################### Retornar todos los Productos #####################################

app.post('/ObtenerProductos', cors(), (req, res) => {



  mysql.query('select p.id_prod as id, p.nombre as title, p.precio as cost, p.imagen as image, p.descripcion as descripcion, cp.nombre as categoria, p.disponibilidad as disponible from Categorias_productos cp join Productos p on p.id_catp = cp.id_catp', (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado ObtenerTodosLosProductos:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente ObtenerTodosLosProductos');

      // Supongamos que 'results' contiene el arreglo con los resultados

      res.json(results);
      console.log(results);
      

    });
    
});




//-- ##################################### Obtener datos de un repartidor #####################################

app.post('/ObtenerDatosRepartidor', cors(), (req, res) => {

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  const parametro1 = req.body.email;

  mysql.query('select u.correo as id, u.nombre, apellidos, contrasenia, tipo_licencia, municipio, d.nombre as departamento, direccion, celular, cv  from Usuarios u join Repartidores r on u.correo = r.correo and u.correo = ? join Departamentos d on r.id_dep = d.id_dep',[parametro1], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado ObtenerProductosCombo:', err);
        return;
      }

      
      res.json(results);
      console.log(results);

    });
    
});



//-- ##################################### Obtener datos de un repartidor #####################################

app.get('/ObtenerUsuarios', cors(), (req, res) => {

  mysql.query('select correo as id, nombre, apellidos, rol, fecha_registro, estado from Usuarios ', (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado ObtenerProductosCombo:', err);
        return;
      }

      
      res.json(results);
      console.log(results);

    });
    
});


//-- ##################################### Obtener las solicitudes de repartidores #####################################

app.get('/SolicitudesRepartidores', cors(), (req, res) => {

  mysql.query('select * from Usuarios where rol = 2 and estado = 0', (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado ObtenerProductosCombo:', err);
        return;
      }

      
      res.json(results);
      console.log(results);

    });
    
});


//-- ##################################### Obtener las solicitudes de empresas #####################################

app.get('/SolicitudesEmpresas', cors(), (req, res) => {

  mysql.query('select * from Usuarios where rol = 3 and estado = 0', (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado ObtenerProductosCombo:', err);
        return;
      }

      
      res.json(results);
      console.log(results);

    });
    
});


// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
