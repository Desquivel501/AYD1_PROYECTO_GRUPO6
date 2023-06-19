import { useState } from "react";
import { createContext } from "react";
import { nuevaDireccion, registrar, userLogin } from "../api/auth";

export const sesionContext = createContext();

export function SesionProvider({ children }) {
  const roles = {
    "0": "Administrador",
    "1": "Cliente",
    "2": "Repartidor",
    "3": "Empresa",
  };
  const [user, setUser] = useState({
    id: "admin@gmail.com",
    rol: "Ninguno",
    activo: true,
  });

  const login = async (data) => {
    const newSesion = await userLogin({ data });
   /* const newSesion = {
      MENSAJE:"asdsf",
      TIPO:"ERROR"
    }*/
    if (!isNaN(newSesion[0].MENSAJE)) {
      // Es número, por lo tanto es rol
      // Actualizamos el usuario
      const newUser = { id: data.email, rol: roles[newSesion[0].MENSAJE] };
      setUser(newUser);
      if (newUser.rol=="Administrador") return "/Administrador/Solicitudes"
      if (newUser.rol=="Repartidor") return "/Repartidor"
      if (newUser.rol=="Empresa") return "/Empresa/CatalogoEmpresa"
      if (newUser.rol=="Cliente") return "/"
    }
    // Si es un mensaje string entonces es error
    return newSesion[0];
  };
  const registrarme = async (usuario = "Usuario", data) => {
    const mensaje = await registrar(usuario, data);
    /*const mensaje = {
      MENSAJE:"OK",
      TIPO:"Exitoso"
    }*/
    return mensaje[0]??{};
  };
  const solicitarNuevaDireccion = async (data) => {
    console.log(data);
    const mensaje = await nuevaDireccion({ data });
    return mensaje;
  };
  return (
    <sesionContext.Provider
      value={{ user, login, registrarme, solicitarNuevaDireccion }}
    >
      {children}
    </sesionContext.Provider>
  );
}
