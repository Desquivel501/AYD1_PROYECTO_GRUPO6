import { useEffect } from "react";
import { useLocation } from "wouter";
import { useSesion } from "../../hooks/useSesion";

export function ControlRuta({ usuario, children }) {
  const { user } = useSesion();
  const [location, setLocation] = useLocation();
  useEffect(() => {
    if (!user.activo) {
      console.log(user, usuario);
      setLocation("/Login");
    }
  }, []);
  return (
    <>
      {usuario==user.rol && children}
    </>
  );
}
