import { useState } from "react";
import { createContext } from "react";
import { registrar, userLogin } from "../api/auth";

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

  const [user, setUser] = useState({ id: -1, rol: "" });

  const login = (data) => {
    userLogin({ data }).then((newSesion) => setUser(newSesion));
  };
  const registrarme = (usuario="Usuario",data)=>{
    registrar(usuario,data)
  }
  return (
    <sesionContext.Provider value={{ user, login ,registrarme}}>
      {children}
    </sesionContext.Provider>
  );
}
