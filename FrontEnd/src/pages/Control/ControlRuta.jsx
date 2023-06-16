import { useContext } from "react";
import { sesionContext } from "../../context/SesionContext";
import { useEffect } from "react";
import { useLocation } from "wouter";

export function ControlRuta({ children }) {
  const { user } = useContext(sesionContext);
  const [location, setLocation] = useLocation();
  useEffect(() => {
    if (user.rol == "Usuario") {
      setLocation("/Usuario");
    } else if (user.rol == "Administrador") {
      setLocation("/Administrador");
    } else if (user.rol == "Repartidor") {
      setLocation("/Repartidor");
    }
    return setLocation("/Login");
  }, [user]);
  return (
    <>
      {children}
    </>
  );
}
