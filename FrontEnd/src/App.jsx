import { Route } from 'wouter'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Componentes/NavBar/Navbar'
import Login from './pages/Login/Login'
import RegistroCliente from './pages/RegistroCliente/RegistroCliente'
import RegistroEmpresa from './pages/RegistroEmpresa/RegistroEmpresa'
import RegistroRepartidor from './pages/RegistroRepartidor/RegistroRepartidor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Route path={"/Login"} component={Login}/>
      <Route path={"/RegistroCliente"} component={RegistroCliente}/>
      <Route path={"/RegistroEmpresa"} component={RegistroEmpresa}/>
      <Route path={"/RegistroRepartidor"} component={RegistroRepartidor}/>

    </>
  )
}

export default App
