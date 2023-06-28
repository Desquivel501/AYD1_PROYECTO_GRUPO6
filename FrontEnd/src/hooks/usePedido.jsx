import { useContext } from "react";
import { pedidoContext } from "../context/PedidoContext";

export function usePedido(){
  const {pedidoActual } = useContext(pedidoContext)
  return { pedidoActual }
}
