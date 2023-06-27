import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Componentes/NavBar/Navbar";
import Login from "./pages/Login/Login";
import { Landing } from "./pages/Landing/Landing2";
import RegistroCliente from "./pages/RegistroCliente/RegistroCliente";
import RegistroEmpresa from "./pages/RegistroEmpresa/RegistroEmpresa";
import RegistroRepartidor from "./pages/RegistroRepartidor/RegistroRepartidor";
import { About } from "./pages/About/About";
import { PerfilRepartidor } from "./pages/Repartidor/Perfil";
import { Solicitudes } from "./pages/Administrador/Solicitudes";
import { ControlRuta } from "./pages/Control/ControlRuta";
import { SesionProvider } from "./context/SesionContext";
import CrearProducto from "./pages/CrearProducto/CrearProducto";
import CrearCombo from "./pages/CrearCombo/CrearCombo";
import CatalogoEmpresa from "./pages/CatalogoEmpresa/CatalogoEmpresa";
import EditarProductos from "./pages/EditarProductos/EditarProductos";
import { Usuarios } from "./pages/Administrador/Usuarios";
import Page_404 from "./pages/404/404";
import ListadoRestaurantes from "./pages/CatalogoUsuarios/ListadoRestaurantes";
import ListadoProductos from "./pages/CatalogoUsuarios/ListadoProductos";
import { PedidosEmpresa } from "./pages/Empresa/Pedidos";
import { MisPedidos } from "./pages/Repartidor/MisPedidos";
import Carrito from "./pages/Carrito/Carrito";
import FinalizarCompra from "./pages/FinalizarCompra/FinalizarCompra";
import { PedidosDisponibles } from "./pages/Repartidor/PedidosDiponibles";
import PedidosUsuario from "./pages/PedidosCliente/PedidosUsuario";
import { DetallesPedido } from "./pages/PedidosCliente/DetallesPedido";
import { Deshabilitar } from "./pages/Administrador/Deshabilitar";

function App() {
  return (
    <SesionProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path={"/"} element={<Landing />} />
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/RegistroCliente"} element={<RegistroCliente />} />
          <Route path={"/RegistroEmpresa"} element={<RegistroEmpresa />} />
          <Route
            path={"/RegistroRepartidor"}
            element={<RegistroRepartidor />}
          />

          <Route path={"/About"} element={<About />} />
          <Route path={"/404"} element={<Page_404 />} />
          <Route path="*" element={<Page_404 />} />

          <Route
            path={"/Repartidor"}
            element={<ControlRuta usuario={"Repartidor"} />}
          >
            <Route path={"MiPerfil"} element={<PerfilRepartidor />} />
            <Route path={"MisPedidos"} element={<MisPedidos />} />
            <Route path={"Pedidos"} element={<PedidosDisponibles />} />
          </Route>

          <Route element={<ControlRuta usuario={"Cliente"} />}>
            <Route path="/">
              <Route path={"Empresas"} element={<ListadoRestaurantes />} />
              <Route
                path={"Empresas/:departamento/:id"}
                element={<ListadoProductos />}
              />
              <Route path={"Carrito"} element={<Carrito />} />
              <Route path={"FinalizarCompra"} element={<FinalizarCompra />} />
              <Route path={"Pedidos"} element={<PedidosUsuario />} />
              <Route path={"Pedidos/:id/:estado"} element={<DetallesPedido />} />
            </Route>
          </Route>

          <Route element={<ControlRuta usuario={"Empresa"} />}>
            <Route path="/Empresa">
              <Route path={"CrearProducto"} element={<CrearProducto />} />
              <Route path={"EditarProductos"} element={<EditarProductos />} />
              <Route path={"CrearCombo"} element={<CrearCombo />} />
              <Route path={"CatalogoEmpresa"} element={<CatalogoEmpresa />} />
              <Route path={"Pedidos"} element={<PedidosEmpresa />} />
            </Route>
          </Route>
          <Route element={<ControlRuta usuario={"Administrador"} />}>
            <Route path="/Administrador">
              <Route path={"Solicitudes"} element={<Solicitudes />} />
              <Route path={"Reportes"} element={<Usuarios />} />
              <Route path={"Deshabilitar"} element={<Deshabilitar />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SesionProvider>
  );
}
export default App;
