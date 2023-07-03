import { postData } from "../../api/auth";
import { Dialog } from "@mui/material";
import { ListadoProductos } from "../../Componentes/ListadoProductos/ListadoProductos";
import { useEffect, useState } from "react";
import detalles from "../../assets/productos.json";

export function ModalDetallePedido({ id, onClose }) {
  const [detalle, setDetalle] = useState({
    correo: "cliente@gmail.com",
    notas: "Tocar timbre",
    direccion: "Casa",
    estado: "En camino",
  });
  const [productos, setProductos] = useState(detalles);
  useEffect(() => {
    const endpoint = "datosPedido";
    const data = { id: parseInt(id), correo: "" };
    postData({ endpoint, data })
      .then((data) => {
        setProductos(data.productos ?? []);
        setDetalle({
          correo: data.correo,
          notas: data.nota,
          direccion: data.direccion,
          estado: data.estado,
        });
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Dialog onClose={onClose} open={id != ""} maxWidth="120vh">
      <ListadoProductos
        title={"Productos de la orden " + id}
        descripcion={detalle.notas}
        direccion={detalle.direccion}
        productos={productos}
      />
    </Dialog>
  );
}
