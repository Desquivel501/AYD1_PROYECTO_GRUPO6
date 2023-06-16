import { Route, Router } from "wouter";
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
import { SesionProvider } from "./context/SesionContext";
import { ControlRuta } from "./pages/Control/ControlRuta";
import CrearProducto from "./pages/CrearProducto/CrearProducto";
import EditarProductos from "./pages/EditarProductos/EditarProductos";
import CrearCombo from "./pages/CrearCombo/CrearCombo";

function App() {
  return (
    <SesionProvider>
      <Navbar />
      <Route path={"/"} component={Landing} />
      <Route path={"/Login"} component={Login} />
      <Route path={"/RegistroCliente"} component={RegistroCliente} />
      <Route path={"/RegistroEmpresa"} component={RegistroEmpresa} />
      <Route path={"/RegistroRepartidor"} component={RegistroRepartidor} />
      <Route path={"/About"} component={About} />
      <ControlRuta usuario={"Repartidor"}>
        <Route path={"/Repartidor"} component={PerfilRepartidor} />
      </ControlRuta>
      <ControlRuta usuario={"Empresa"}>
        <Route path={"/CrearProducto"} component={CrearProducto} />
        <Route path={"/EditarProductos"} component={EditarProductos} />
        <Route path={"/CrearCombo"} component={CrearCombo} />
      </ControlRuta>
      <ControlRuta usuario={"Administrador"}>
        <Route path={"/Administrador"} component={Solicitudes} />
      </ControlRuta>
    </SesionProvider>
  );
}
export default App;
