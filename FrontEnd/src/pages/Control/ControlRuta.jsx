import { Navigate, Outlet } from "react-router-dom";
import { useSesion } from "../../hooks/useSesion";

export function ControlRuta({ usuario, children }) {
  const { user } = useSesion();
  if (user.rol != usuario) return <Navigate to={"/404"} />;
  return (
    <>
      {children ? children : <Outlet />}
    </>
  );
}
