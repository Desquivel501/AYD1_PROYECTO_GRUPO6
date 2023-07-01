import { Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { postData } from "../../api/auth";
import { useSesion } from "../../hooks/useSesion";
import Rpedidos from "../../mocks/misPedidos.json";
import { FilterPedidos } from "../../Componentes/FilterPedidos/FilterPedidos";
import { ModalDetallePedido } from "../../Componentes/DetallePedido/DetallePedido";
import { Tabla } from "../../Componentes/Tabla/Tabla";
import { usePedido } from "../../hooks/usePedido";
const HEADERS = [
  "ID",
  "Restaurante",
  "Cliente",
  "Costo",
  "Fecha",
  "Estado",
  "Detalle",
];
const objectAttributes = [
  "id",
  "restaurante",
  "cliente",
  "costo",
  "fecha",
  "estado",
];
const estados = {
  name: "estado",
  options: {
    "PENDIENTE": { color: "#CE93D8", txt: "Pendiente" },
    "EN CAMINO": { color: "#ffcc00", txt: "En camino" },
    "ENTREGADO": { color: "#29B6F6", txt: "Entregado" },
    "TERMINADA": { color: "#10d21b", txt: "Terminada" },
    "EN PROCESO": { color: "#FFA000", txt: "En proceso" },
  },
};
const categorias = [
  { value: "", texto: "Todos" },
  { value: "PENDIENTE", texto: "Pendiente" },
  { value: "EN CAMINO", texto: "En camino" },
  { value: "ENTREGADO", texto: "Entregado" },
  { value: "TERMINADA", texto: "Terminada" },
  { value: "EN PROCESO", texto: "En proceso" },
];
export function MisPedidos() {
  const [pedido, setPedido] = useState("");
  const [find, setFind] = useState({ cliente: "", fecha: "", categoria: "" });
  const { user } = useSesion();
  const [pedidos, setPedidos] = useState([]);
  const { pedidoActual } = usePedido();
  useEffect(() => {
    const endpoint = "ObtenerPedidosRepartidor";
    const data = { correo: user.id };
    postData({ endpoint, data })
      .then((data) => {
        const actual = data.find(({estado}) => estado=="EN CAMINO" )
        if (actual){
          pedidoActual.id = actual.id
          pedidoActual.estado = "EN CAMINO"
        }
        console.log(actual)
        setPedidos(data ?? []);
      })
      .catch((e) => console.log(e));
  }, []);
  const filterUsers = () => {
    if (find.fecha == "" && find.cliente == "" && find.categoria == "") {
      return pedidos;
    }
    let temp = pedidos;
    if (find.cliente != "") {
      const regex = "^" + find.cliente;
      const r = new RegExp(regex);
      temp = pedidos.filter(({ cliente }) => r.test(cliente));
    }
    if (find.fecha != "") {
      temp = temp.filter(({ fecha }) => fecha.includes(find.fecha));
    }
    if (find.categoria != "") {
      temp = temp.filter(({ estado }) => estado == find.categoria);
    }
    return temp;
  };
  const handleClick = (e) => {
    const parent = e.currentTarget.parentElement.parentElement;
    const id = parent.firstChild;
    setPedido(id.innerText);
  };
  const customTheme = createTheme({
    palette: {
      background: {
        default: "#f8ede9",
      },
    },
  });
  return (
    <ThemeProvider theme={customTheme}>
      {pedido && (
        <ModalDetallePedido
          id={pedido}
          onClose={() => setPedido("")}
        />
      )}
      <Box
        component="main"
        display="flex"
        height="80vh"
        sx={{ padding: "10vh 0" }}
        width={"175vh"}
        margin="auto"
      >
        <Grid
          container
          sx={{
            backgroundColor: "#fff",
            boxShadow: " 0px 0px 10px 0px rgba(0,0,0,0.1)",
            padding: "5px 10px",
          }}
          flexWrap={"unset"}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
        >
          <h1>Mis Pedidos</h1>
          <FilterPedidos
            find={find}
            onChange={setFind}
            categorias={categorias}
          />
          <Tabla
            headers={HEADERS}
            fields={objectAttributes}
            data={filterUsers()}
            categoria={estados}
          >
            <td>
              <button
                className="sombra"
                style={{
                  backgroundColor: "#198754",
                  color: "#fff",
                  border: "1px solid #198754 ",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  margin: "5px 0px",
                  width: "50%",
                }}
                onClick={handleClick}
              >
                Ver
              </button>
            </td>
          </Tabla>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
