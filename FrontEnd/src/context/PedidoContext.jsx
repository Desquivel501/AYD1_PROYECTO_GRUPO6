import { createContext } from "react";

export const pedidoContext = createContext();

export function PedidoProvider({ children }) {
  const pedidoActual = { id: 0, estado: "" };
  return (
    <pedidoContext.Provider value={{pedidoActual}}>
      {children}
    </pedidoContext.Provider>
  );
}
