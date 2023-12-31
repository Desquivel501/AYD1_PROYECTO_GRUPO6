export const links = {
  Ninguno: [
    { text: "Iniciar Sesión", path: "/Login" },
    { text: "Nuevo Usuario", path: "/RegistroCliente" },
    { text: "Nuevo Repartidor", path: "/RegistroRepartidor" },
    { text: "Nueva Empresa", path: "/RegistroEmpresa" },
  ],

  Cliente: [
    { text: "Empresas", path: "/Empresas" },
    { text: "Pedidos", path: "/Pedidos" }
  ],

  Repartidor: [
    { text: "Pedidos Disponibles", path: "/Repartidor/Pedidos" },
    { text: "Mis pedidos", path: "/Repartidor/MisPedidos" },
    { text: "Mi perfil", path: "/Repartidor/MiPerfil" },
  ],

  Empresa: [
    { text: "Crear Producto", path: "/Empresa/CrearProducto" },
    { text: "Editar Productos", path: "/Empresa/EditarProductos" },
    { text: "Crear Combo", path: "/Empresa/CrearCombo" },
    { text: "Catalogo", path: "/Empresa/CatalogoEmpresa" },
    { text: "Pedidos", path: "/Empresa/Pedidos" },
    { text: "Top", path: "/Empresa/Top" },
  ],

  Administrador: [
    { text: "Solicitudes", path: "/Administrador/Solicitudes" },
    { text: "Deshabilitar", path: "/Administrador/Deshabilitar" },
    { text: "Usuarios", path: "/Administrador/Reportes/Usuarios" },
    { text: "Ventas", path: "/Administrador/Reportes/Ventas" },
    { text: "Repartidores", path: "/Administrador/Reportes/Repartidores" },
  ],
};
