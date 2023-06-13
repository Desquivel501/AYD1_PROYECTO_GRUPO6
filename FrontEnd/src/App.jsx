import { Route } from 'wouter'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Componentes/NavBar/Navbar'
import Login from './pages/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Route path={"/Login"} component={Login}/>

    </>
  )
}

export default App
