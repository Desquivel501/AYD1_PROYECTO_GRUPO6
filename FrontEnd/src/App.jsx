import { Route } from 'wouter'
import './App.css'
import Navbar from './Componentes/NavBar/Navbar'
import Login from './pages/Login/Login'
import { Landing } from './pages/Landing/Landing'
import RegistroCliente from './pages/RegistroCliente/RegistroCliente'
import RegistroEmpresa from './pages/RegistroEmpresa/RegistroEmpresa'
import RegistroRepartidor from './pages/RegistroRepartidor/RegistroRepartidor'

function App() {
  return (
    <>
      <Navbar/>
      <Route path={"/"} component={Landing}/>
      <Route path={"/Login"} component={Login}/>
      <Route path={"/RegistroCliente"} component={RegistroCliente}/>
      <Route path={"/RegistroEmpresa"} component={RegistroEmpresa}/>
      <Route path={"/RegistroRepartidor"} component={RegistroRepartidor}/>

    </>
  )
}

export default App
