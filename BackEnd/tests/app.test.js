
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const fs = require('fs');

describe('POST /RegistrarCliente', () => {
    it('Deberia retornar una respuesta de 200 si se creo el usuario del cliente', async () =>{
        const response = await api.post('/RegistrarCliente')
            .field("email", "test" + Date.now() + "@gmail.com")
            .field("name", "test")
            .field("lastname", "user")
            .field("password", "1234")
        expect(response.status).toBe(200);
    });
});

describe('POST /RegistrarCliente', () => {
    it('Deberia retornar una respuesta de 500 si no se puedo crear el cliente', async () =>{
        const response = await api.post('/RegistrarCliente')
        expect(response.status).toBe(500);
    });
});

describe('POST /RegistrarRepartidor', () => {
    it('Deberia retornar una respuesta de 200 si se creo el usuario del repartidor', async () =>{
        const response = await api.post('/RegistrarRepartidor')
            .field("email", "test" + Date.now() + "@gmail.com")
            .field("name", "test")
            .field("lastname", "user")
            .field("password", "1234")
            .field("phone", "55253610")
            .field("Licencia", "A")
            .field("Vehiculo", 0)
            .field("Municipio", "Mixco")
            .field("Departamento", 'Guatemala')
            .field("zona", "3")
        expect(response.status).toBe(200);
    });
});

describe('POST /RegistrarRepartidor', () => {
    it('Deberia retornar una respuesta de 500 si no se puedo crear el repartidor', async () =>{
        const response = await api.post('/RegistrarCliente')
        expect(response.status).toBe(500);
    });
});

describe('POST /AceptarRepartidor', () => {
    it('Deberia retornar una respuesta de 200 si se acepto la solicitud del repartidor', async () =>{
        const response = await api.post('/AceptarRepartidor')
            .send({
                admin: "admin@gmail.com",
                email: "postman@gmail.com",
                aceptado: true
            })
        expect(response.status).toBe(200);
    });
});


describe('POST /RegistrarEmpresa', () => {
    it('Deberia retornar una respuesta de 200 si se creo el usuario de la empresa', async () =>{
        const response = await api.post('/RegistrarEmpresa')
            .field("email", "test" + Date.now() + "@gmail.com")
            .field("password", "1234")
            .field("description", " ")
            .field("name", "Test Company")
            .field("categoria", "Otro")
            .field("Municipio", "Mixco")
            .field("Departamento", 'Guatemala')
            .field("zona", "3")
        expect(response.status).toBe(200);
    });
});

describe('POST /RegistrarEmpresa', () => {
    it('Deberia retornar una respuesta de 500 si no se puedo crear la empresa', async () =>{
        const response = await api.post('/RegistrarEmpresa')
        expect(response.status).toBe(500);
    });
});


describe('POST /AceptarEmpresa', () => {
    it('Deberia retornar una respuesta de 200 si se acepto la solicitud de la empresa', async () =>{
        const response = await api.post('/AceptarEmpresa')
            .send({
                admin: "admin@gmail.com",
                email: "postman@gmail.com",
                aceptado: true
            })
        expect(response.status).toBe(200);
    });
});

describe('POST /InicioSesion', () => {
    it('Deberia retornar una respuesta de 200 si las credenciales de usuario son validas', async () =>{
        const response = await api.post('/InicioSesion')
            .field("email", "admin@gmail.com")
            .field("password", "246810")
        expect(response.status).toBe(200);
    });
});

describe('POST /CrearProducto', () => {
    it('Deberia retornar una respuesta de 200 si se creo el producto', async () =>{
        const response = await api.post('/CrearProducto')
            .field("empresa", "test" + Date.now() + "@gmail.com")
            .field("nombre", "Test Product")
            .field("categoria", "Postre")
            .field("descripcion", " ")
            .field("costo", 123)
            .field("disponible", true)  
        expect(response.status).toBe(200);
    });
});


// describe('POST /CrearProducto', () => {
//     it('Deberia retornar una respuesta de 500 si no se pudo crear el producto', async () =>{
//         const response = await api.post('/InicioSesion')
//             .field("costo", "ajdhajk")
//             expect(response.status).toBe(500);
//     });
// });


describe('POST /EditarProducto', () => {
    it('Deberia retornar una respuesta de 200 si se puedo editar el producto', async () =>{
        const response = await api.post('/EditarProducto')
            .field("empresa", "test" + Date.now() + "@gmail.com")
            .field("id", 0)
            .field("nombre", "Test Product")
            .field("categoria", "Postre")
            .field("descripcion", " ")
            .field("costo", 123)
            .field("disponible", true) 
        expect(response.status).toBe(200);
    });
});

describe('POST /EditarProducto', () => {
    it('Deberia retornar una respuesta de 500 si no se pudo editar el producto', async () =>{
        const response = await api.post('/EditarProducto')
            .field("costo", "ajdhajk")
        expect(response.status).toBe(500);
    });
});


describe('POST /EliminarProducto', () => {
    it('Deberia retornar una respuesta de 200 si se puedo eliminar el producto', async () =>{
        const response = await api.post('/EliminarProducto')
            .field("empresa", "test" + Date.now() + "@gmail.com")
            .field("producto", 0)
        expect(response.status).toBe(200);
    });
});


describe('POST /ObtenerCombos', () => {
    it('Deberia retornar una lista de los combos de una empresa', async () =>{
        const response = await api.post('/ObtenerCombos')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});


describe('POST /ObtenerProductos', () => {
    it('Deberia retornar una lista de los productos de una empresa', async () =>{
        const response = await api.post('/ObtenerProductos')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});


describe('POST /ObtenerDatosRepartidor', () => {
    it('Deberia retornar los datos de un repartidor en especifico', async () =>{
        const response = await api.post('/ObtenerDatosRepartidor')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});


describe('POST /ObtenerDatosEmpresa', () => {
    it('Deberia retornar los datos de una empresa en especifico, utilizando el correo', async () =>{
        const response = await api.post('/ObtenerDatosEmpresa')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});


describe('POST /ObtenerDatosEmpresa2', () => {
    it('Deberia retornar los datos de una empresa en especifico, utilizando su nombre y departamento', async () =>{
        const response = await api.post('/ObtenerDatosEmpresa2')
            .field("name", "Test Company")
            .field("Departamento", 'Guatemala')  
        expect(response.status).toBe(200);
    });
});


describe('GET /ObtenerDatosEmpresas', () => {
    it('Deberia retornar los datos de todas las empresas.', async () =>{
        const response = await api.get('/ObtenerDatosEmpresas')
        expect(response.status).toBe(200);
    });
});

describe('GET /ObtenerUsuarios', () => {
    it('Deberia retornar los datos de todos los usuarios.', async () =>{
        const response = await api.get('/ObtenerUsuarios')
        expect(response.status).toBe(200);
    });
});

describe('GET /ObtenerHabilitados', () => {
    it('Deberia retornar los datos de todos los usuarios habilitados.', async () =>{
        const response = await api.get('/ObtenerHabilitados')
        expect(response.status).toBe(200);
    });
});

describe('GET /SolicitudesRepartidores', () => {
    it('Deberia retornar los datos de todas las solicitudes repartidores', async () =>{
        const response = await api.get('/SolicitudesRepartidores')
        expect(response.status).toBe(200);
    });
});


describe('GET /SolicitudesEmpresas', () => {
    it('Deberia retornar los datos de todas las solicitudes de empresas', async () =>{
        const response = await api.get('/SolicitudesEmpresas')
        expect(response.status).toBe(200);
    });
});


describe('GET /CategoriasEmpresa', () => {
    it('Deberia retornar una listas de todas las categorias', async () =>{
        const response = await api.get('/CategoriasEmpresa')
        expect(response.status).toBe(200);
    });
});


describe('POST /deshabilitar', () => {
    it('Deberia retornar una respuesta de 200 de que se deshabilito el usuario', async () =>{
        const response = await api.post('/deshabilitar')
            .field("correo", "test" + Date.now() + "@gmail.com");
        expect(response.status).toBe(200);
    });
});


describe('POST /nuevaDireccion', () => {
    it('Deberia retornar una respuesta de 200 de que se registro la solicitud de cambio de direccion', async () =>{
        const response = await api.post('/nuevaDireccion')
            .field("correo", "test" + Date.now() + "@gmail.com");
        expect(response.status).toBe(200);
    });
});


describe('GET /obtenerReasignaciones', () => {
    it('Deberia retornar las solicitudes de cambio de direccion pendientes', async () =>{
        const response = await api.get('/obtenerReasignaciones')
        expect(response.status).toBe(200);
    });
});


describe('POST /aceptarReasignacion', () => {
    it('Deberia retornar una respuesta de 200 de que se acepto la solicitud de cambio de direccion', async () =>{
        const response = await api.post('/aceptarReasignacion')
            .field("correo", "test" + Date.now() + "@gmail.com");
        expect(response.status).toBe(200);
    });
});


describe('POST /rechazarReasignacion', () => {
    it('Deberia retornar una respuesta de 200 de que se rechazo la solicitud de cambio de direccion', async () =>{
        const response = await api.post('/rechazarReasignacion')
            .field("correo", "test" + Date.now() + "@gmail.com");
        expect(response.status).toBe(200);
    });
});



describe('POST /guardarDireccion', () => {
    it('Deberia retornar una respuesta de 200 de que se guardo una direccion del usuario', async () =>{
        const response = await api.post('/guardarDireccion')
            .field("correo", "test" + Date.now() + "@gmail.com")
            .field("alias", "alias" + Date.now())
            .field("direccion", " ")
        expect(response.status).toBe(200);
    });
});



describe('POST /guardarTarjeta', () => {
    it('Deberia retornar una respuesta de 200 de que se guardo una tarjeta del usuario', async () =>{
        const response = await api.post('/guardarTarjeta')
            .field("correo", "test" + Date.now() + "@gmail.com")
            .field("alias", "alias" + Date.now())
            .field("name", "Test User")
            .field("cc", "4894121596230412")
            .field("cvv", "111")
            .field("vencimiento", "28/2025")
        expect(response.status).toBe(200);
    });
});


describe('POST /obtenerTarjetas', () => {
    it('Deberia retornar la lista de tarjeta guardadas del usuario', async () =>{
        const response = await api.post('/obtenerTarjetas')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});


describe('POST /obtenerDirecciones', () => {
    it('Deberia retornar la lista de tarjeta guardadas del usuario', async () =>{
        const response = await api.post('/obtenerDirecciones')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});


describe('POST /obtenerCupones', () => {
    it('Deberia retornar la lista de tarjeta guardadas del usuario', async () =>{
        const response = await api.post('/obtenerCupones')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});


describe('POST /obtenerPedidosRepartidor', () => {
    it('Deberia retornar la lista de pedidos de un repartidor', async () =>{
        const response = await api.post('/obtenerPedidosRepartidor')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});

describe('POST /obtenerPedidosEmpresa', () => {
    it('Deberia retornar la lista de pedidos de una empresa', async () =>{
        const response = await api.post('/obtenerPedidosEmpresa')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});

describe('POST /pedidosCliente', () => {
    it('Deberia retornar la lista de pedidos de un cliente', async () =>{
        const response = await api.post('/obtenerPedidosEmpresa')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});

describe('POST /datosPedido', () => {
    it('Deberia retornar los detalles de un pedido', async () =>{
        const response = await api.post('/datosPedido')
            .field("correo", "test" + Date.now() + "@gmail.com")
            .field("id", 1)
        expect(response.status).toBe(200);
    });
});

describe('POST /pedidosDisponibles', () => {
    it('Deberia retornar una la lista de pedidos que el repartidor puede tomar', async () =>{
        const response = await api.post('/pedidosDisponibles')
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});

describe('POST /aceptarPedidoRepartidor', () => {
    it('Deberia retornar una una respuesta de 200 de que se acepto el pedido', async () =>{
        const response = await api.post('/aceptarPedidoRepartidor')
            .field("id", 0)
            .field("correo", "test" + Date.now() + "@gmail.com")
        expect(response.status).toBe(200);
    });
});

describe('POST /entregarPedido', () => {
    it('Deberia retornar una una respuesta de 200 de que se entreo el pedido', async () =>{
        const response = await api.post('/entregarPedido')
            .field("id", 0)
        expect(response.status).toBe(200);
    });
});


describe('GET /obtenerPedidos', () => {
    it('Deberia retornar una lista con todos los pedidos', async () =>{
        const response = await api.get('/obtenerPedidos')
        expect(response.status).toBe(200);
    });
});