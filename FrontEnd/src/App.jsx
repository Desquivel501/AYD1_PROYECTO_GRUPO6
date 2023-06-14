import { Route } from 'wouter'
import './App.css'
import Navbar from './Componentes/NavBar/Navbar'
import Login from './pages/Login/Login'
// import { Landing } from './pages/Landing/Landing'
import { Landing } from './pages/Landing/Landing2'
import RegistroCliente from './pages/RegistroCliente/RegistroCliente'
import RegistroEmpresa from './pages/RegistroEmpresa/RegistroEmpresa'
import RegistroRepartidor from './pages/RegistroRepartidor/RegistroRepartidor'
import { About } from './pages/About/About'
import { PerfilRepartidor } from './pages/Repartidor/Perfil'
import { Solicitudes } from './pages/Administrador/Solicitudes'
import CrearProducto from  './pages/CrearProducto/CrearProducto'
import EditarProductos from './pages/EditarProductos/EditarProductos'

function App() {
  return (
    <>
      <Navbar/>
      <Route path={"/"} component={Landing}/>
      <Route path={"/Login"} component={Login}/>
      <Route path={"/RegistroCliente"} component={RegistroCliente}/>
      <Route path={"/RegistroEmpresa"} component={RegistroEmpresa}/>
      <Route path={"/RegistroRepartidor"} component={RegistroRepartidor}/>
      <Route path={"/About"} component={About}/>
      <Route path={"/Repartidor"} component={PerfilRepartidor}/>
      <Route path={"/Administrador"} component={Solicitudes}/>
      <Route path={"/CrearProducto"} component={CrearProducto}/>
      <Route path={"/EditarProductos"} component={EditarProductos}/>
    </>
  )
}

export default App
