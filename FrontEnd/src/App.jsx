import { Route } from 'wouter'
import './App.css'
import Navbar from './Componentes/NavBar/Navbar'
import Login from './pages/Login/Login'
import { Landing } from './pages/Landing/Landing'

function App() {
  return (
    <>
      <Navbar/>
      <Route path={"/"} component={Landing}/>
      <Route path={"/Login"} component={Login}/>

    </>
  )
}

export default App
