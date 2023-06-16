import { useContext } from "react";
import { sesionContext } from "../context/SesionContext";

export function useSesion() {
  const sesion = useContext(sesionContext);
  return sesion
}
