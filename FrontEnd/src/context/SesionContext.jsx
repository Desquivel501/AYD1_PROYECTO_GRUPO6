import { useState } from "react";
import { createContext } from "react";
import {  registrar, sendFormData } from "../api/auth";

export const sesionContext = createContext();

export function SesionProvider({ children }) {
  const roles = {
    "0": "Administrador",
    "1": "Cliente",
    "2": "Repartidor",
    "3": "Empresa",
  };
  const userDefault = {
    id: "",
    rol: "Ninguno",
    activo: false,
  };
  const [user, setUser] = useState(() => {
    const sesion = window.sessionStorage.getItem("user");
    if (sesion != null) {
      return JSON.parse(sesion);
    }
    return userDefault;
  });

  const login = async (data) => {
    const newSesion = await sendFormData({endpoint:"InicioSesion", data });
    /* const newSesion = {
      MENSAJE:"asdsf",
      TIPO:"ERROR"
    }*/
    if (!isNaN(newSesion[0].MENSAJE)) {
      // Es número, por lo tanto es rol
      // Actualizamos el usuario
      const newUser = {
        id: data.get("email"),
        rol: roles[newSesion[0].MENSAJE],
      };
      setUser(newUser);
      window.sessionStorage.setItem("user", JSON.stringify(newUser));
      if (newUser.rol == "Administrador") return "/Administrador/Solicitudes";
      if (newUser.rol == "Repartidor") return "/Repartidor";
      if (newUser.rol == "Empresa") return "/Empresa/CatalogoEmpresa";
      if (newUser.rol == "Cliente") return "/Empresas";
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
    return mensaje[0] ?? {};
  };
  const solicitarNuevaDireccion = async (data) => {
    console.log(data);
    //const mensaje = await nuevaDireccion({ data });
    //return mensaje;
    return ""
  };
  const logout = () => {
    setUser(userDefault);
    window.sessionStorage.setItem("user", JSON.stringify(userDefault));
  };
  return (
    <sesionContext.Provider
      value={{ user, logout, login, registrarme, solicitarNuevaDireccion }}
    >
      {children}
    </sesionContext.Provider>
  );
}
