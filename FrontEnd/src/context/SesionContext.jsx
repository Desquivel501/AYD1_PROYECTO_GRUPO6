import { useState } from "react";
import { createContext } from "react";
import { nuevaDireccion, registrar, userLogin } from "../api/auth";

export const sesionContext = createContext();

export function SesionProvider({ children }) {
  const parseCookie = (str) =>
    str
      .split(";")
      .map((v) => v.split("="))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
          v[1].trim(),
        );
        return acc;
      }, {});

  const [user, setUser] = useState({ id: "admin@gmail.com", rol: "Repartidor", activo:true });

  const login = (data) => {
    userLogin({ data }).then((newSesion) => setUser(newSesion));
  };
  const registrarme = async (usuario = "Usuario", data) => {
    const mensaje = await registrar(usuario, data);
    return mensaje;
  };
  const solicitarNuevaDireccion = async (data)=>{
    console.log(data)
    const mensaje = await nuevaDireccion({data})
    return mensaje
  }
  return (
    <sesionContext.Provider value={{ user, login, registrarme, solicitarNuevaDireccion }}>
      {children}
    </sesionContext.Provider>
  );
}
