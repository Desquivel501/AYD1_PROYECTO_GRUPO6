const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');
// Importa tu archivo de conexión
const mysql = require('./conexion');

/*Habilitar los cors para todos los accesos*/
app.options('*', cors())

/*Configuración de de express*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// ########################### INSERTAR UN CLIENTE NUEVO A TABLA USUARIOS ###########################

app.post('/RegistrarCliente', cors(), (req, res) => {

    const parametro1 = "carlosquixtan78@gmail.com";
    const parametro2 = "carlos";
    const parametro3 = "apellidos";
    const parametro4 = "contraseñaaaaaa";

    ///// estas se colocan en lugar de parametro1, parametro2; etc...
    //const correo = req.body.correo;
    //const nombre = req.body.correo;
    //const apellido = req.body.correo;

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

app.post('/InicioSesion', cors(), (req, res) => {

  const parametro1 = "carlosquixtan78@gmail.com";
  const parametro2 = "contraseñaaaaaa";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  //const parametro1 = req.body.correo;
  //const parametro2 = req.body.contrasenia;

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
      console.log(formattedResult);

    });
    
});



// -- ########################### INSERTAR UN REPARTIDOR NUEVO A TABLA USUARIOS ###########################


app.post('/RegistrarRepartidor', cors(), (req, res) => {

  const parametro1 = "carlos";
  const parametro2 = "perez";
  const parametro3 = "patitoQuixtan3@gmail.com";
  const parametro4 = "contraseñaaaa";
  const parametro5 = 54163447;
  const parametro6 = "c";
  const parametro7 = 1;
  const parametro8 = "Xela";
  const parametro9 = "Chimaltenango";
  const parametro10 = "patito 123";
  const parametro11 = "curriculumn";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
    // const parametro1 = req.body.nombre;
    // const parametro2 = req.body.apellido;
    // const parametro3 = req.body.correo;
    // const parametro4 = req.body.contrasenia;
    // const parametro5 = req.body.celular;
    // const parametro6 = req.body.tipo_licencia;
    // const parametro7 = req.body.existe_moto;
    // const parametro8 = req.body.municipio;
    // const parametro9 = req.body.departamento;
    // const parametro10 = req.body.direccion;
    // const parametro11 = req.body.cv;

  mysql.query('CALL RegistrarRepartidor(?,?,?,?,?,?,?,?,?,?,?)', [parametro1, parametro2, parametro3, parametro4, parametro5, parametro6, parametro7, parametro8, parametro9, parametro10, parametro11], (err, results) => {
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

  const parametro1 = "admin@gmail.com";
  const parametro2 = "patitoQuixtan@gmail.com";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  //const parametro1 = req.body.correo_admin;
  //const parametro2 = req.body.correo;

  mysql.query('CALL AceptarRepartidor(?,?)', [parametro1, parametro2,], (err, results) => {
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

  const parametro1 = "admin@gmail.com";
  const parametro2 = "patitoQuixtan3@gmail.com";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  //const parametro1 = req.body.correo_admin;
  //const parametro2 = req.body.correo;

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

app.post('/RegistrarEmpresa', cors(), (req, res) => {

  const parametro1 = "Quixtan4@gmail.com";
  const parametro2 = "contraseñaaa";
  const parametro3 = "venta de nike";
  const parametro4 = "nike";
  const parametro5 = "Postres";
  const parametro6 = "Alta Verapaz";
  const parametro7 = "Xela";
  const parametro8 = "patito 123";
  const parametro9 = "curriculumn";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
    // const parametro1 = req.body.correo_in;
    // const parametro2 = req.body.contrasenia_in;
    // const parametro3 = req.body.descripcion_in;
    // const parametro4 = req.body.nombre_entidad_in;
    // const parametro5 = req.body.categoria_in;
    // const parametro6 = req.body.departamento_in;
    // const parametro7 = req.body.ciudad_in;
    // const parametro8 = req.body.direccion_in;
    // const parametro9 = req.body.doc_in;

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

  const parametro1 = "admin@gmail.com";
  const parametro2 = "Quixtan4@gmail.com";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  //const parametro1 = req.body.correo_admin;
  //const parametro2 = req.body.correo_in;

  mysql.query('CALL AceptarEmpresa(?,?)', [parametro1, parametro2,], (err, results) => {
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

  const parametro1 = "admin@gmail.com";
  const parametro2 = "Quixtan4@gmail.com";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  //const parametro1 = req.body.correo_admin;
  //const parametro2 = req.body.correo_in;

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


app.post('/AlmacenarProducto', cors(), (req, res) => {

  const parametro1 = "link imagen";
  const parametro2 = "nombreee3e2";
  const parametro3 = "Postres";
  const parametro4 = "kakakakka";
  const parametro5 = 13.0;
  const parametro6 = 1;
  const parametro7 = "Quixtan4@gmail.com";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
    // const parametro1 = req.body.imagen_in;
    // const parametro2 = req.body.nombre_in;
    // const parametro3 = req.body.categoria_in;
    // const parametro4 = req.body.descripcion_in;
    // const parametro5 = req.body.precio_in;
    // const parametro6 = req.body.disponibilidad_in;
    // const parametro7 = req.body.correo_in;

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

app.post('/ActualizarProducto', cors(), (req, res) => {

  const parametro0 = 1;
  const parametro1 = "link imagen";
  const parametro2 = "nammmmmmmeeee";
  const parametro3 = "Postres";
  const parametro4 = "jajajajja";
  const parametro5 = 18.0;
  const parametro6 = 1;
  const parametro7 = "Quixtan4@gmail.com";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
    // const parametro0 = req.body.id_prod_in;
    // const parametro1 = req.body.imagen_in;
    // const parametro2 = req.body.nombre_in;
    // const parametro3 = req.body.categoria_in;
    // const parametro4 = req.body.descripcion_in;
    // const parametro5 = req.body.precio_in;
    // const parametro6 = req.body.disponibilidad_in;
    // const parametro7 = req.body.correo_in;

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

  const parametro1 = "Quixtan4@gmail.com";
  const parametro2 = "1";

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  //const parametro1 = req.body.correo;
  //const parametro2 = req.body.id_prod_in;

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

app.post('/AlmacenarCombo', cors(), (req, res) => {

  const parametro1 = "Quixtan4@gmail.com";
  const parametro2 = "combo1";
  const parametro3 = "imagennnnn";
  const parametro4 = 57.25;
  const parametro5 = "muy buen combo siuuuuu";
  const parametro6 = 1;

  ///// estas se colocan en lugar de parametro1, parametro2; etc...

    // const parametro1 = req.body.correo_in;
    // const parametro2 = req.body.nombre_in;
    // const parametro3 = req.body.imagen_in;
    // const parametro4 = req.body.precio_in;
    // const parametro5 = req.body.descripcion_in;
    // const parametro6 = req.body.disponibilidad_in;

  mysql.query('CALL AlmacenarCombo(?,?,?,?,?,?)', [parametro1, parametro2, parametro3, parametro4, parametro5, parametro6], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado AlmacenarCombo:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente AlmacenarCombo');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});



//-- ########################### AGREGAR UN PRODUCTO A COMBO ###########################

app.post('/AgregarProductoCombo', cors(), (req, res) => {

  const parametro1 = "Quixtan4@gmail.com";
  const parametro2 = "combo1";
  const parametro3 = 3;

  ///// estas se colocan en lugar de parametro1, parametro2; etc...

    // const parametro1 = req.body.correo_in;
    // const parametro2 = req.body.nombre_in;
    // const parametro3 = req.body.id_prod_in;

  mysql.query('CALL AgregarProductoCombo(?,?,?)', [parametro1, parametro2, parametro3], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado AgregarProductoCombo:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente AgregarProductoCombo');
      
      const formattedResult = results[0].map(row => ({
        MENSAJE: row.MENSAJE,
        TIPO: row.TIPO
      }));
      
      res.json(formattedResult);
      console.log(formattedResult);

    });
    
});


//-- ##################################### Retornar todos los combos #####################################

app.post('/ObtenerProductosCombo', cors(), (req, res) => {

  const parametro1 = 1;

  ///// estas se colocan en lugar de parametro1, parametro2; etc...
  //const parametro1 = req.body.id_combo_in;

  mysql.query('CALL ObtenerProductosCombo(?)', [parametro1], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el procedimiento almacenado ObtenerProductosCombo:', err);
        return;
      }
      console.log('Procedimiento almacenado ejecutado exitosamente ObtenerProductosCombo');
      
      // const formattedResult = results[0].map(row => ({
      //   MENSAJE: row.MENSAJE,
      //   TIPO: row.TIPO
      // }));

      // Supongamos que 'results' contiene el arreglo con los resultados
      const formattedResults = results.slice(0, -1);

      res.json(formattedResults);
      console.log(formattedResults);
      

    });
    
});



//-- ##################################### Retornar todos los Productos #####################################

app.post('/ObtenerTodosLosProductos', cors(), (req, res) => {



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



// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

