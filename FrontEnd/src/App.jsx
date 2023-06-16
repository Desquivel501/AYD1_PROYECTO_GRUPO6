import { Route, Router } from "wouter";
import "./App.css";
import Navbar from "./Componentes/NavBar/Navbar";
import Login from "./pages/Login/Login";
import { Landing } from "./pages/Landing/Landing";
import RegistroCliente from "./pages/RegistroCliente/RegistroCliente";
import RegistroEmpresa from "./pages/RegistroEmpresa/RegistroEmpresa";
import RegistroRepartidor from "./pages/RegistroRepartidor/RegistroRepartidor";
import { About } from "./pages/About/About";
import { PerfilRepartidor } from "./pages/Repartidor/Perfil";
import { Solicitudes } from "./pages/Administrador/Solicitudes";
import { SesionProvider } from "./context/SesionContext";
import { ControlRuta } from "./pages/Control/ControlRuta";

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
      <ControlRuta>
        <Route path={"/Repartidor"} component={PerfilRepartidor} />
        <Route path={"/Administrador"} component={Solicitudes} />
      </ControlRuta>
    </SesionProvider>
  );
}

export default App;
