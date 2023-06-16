import { useContext } from "react";
import { sesionContext } from "../context/SesionContext";
import { useEffect } from "react";
import { useLocation } from "wouter";

export function useSesion(rol) {
  const { userId } = useContext(sesionContext);
  const [location, setLocation] = useLocation();
  useEffect(() => {
    console.log(userId,location,rol)
    if (userId.rol != rol) {
      console.log("xd")
      setLocation("/Login");
    }
  }, [userId]);
  return userId
}
