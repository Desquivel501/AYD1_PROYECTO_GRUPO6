import { Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { postData } from "../../api/auth";
import { useSesion } from "../../hooks/useSesion";
import Rpedidos from "../../mocks/misPedidos.json";
import { FilterPedidos } from "../../Componentes/FilterPedidos/FilterPedidos";
import {ModalDetallePedido} from "../../Componentes/DetallePedido/DetallePedido"

export function MisPedidos() {
  const { user } = useSesion();
  const [pedidos, setPedidos] = useState([]);
  const [find, setFind] = useState({ cliente: "", fecha: "",estado:-1 });
  const [pedido, setPedido] = useState("");
  useEffect(() => {
    const endpoint = "ObtenerPedidosRepartidor";
    const data = { correo: user.id };
    //const id = setInterval(() => {
    postData({ endpoint, data })
      .then((data) => setPedidos(data ?? Rpedidos))
      .catch((e) => console.log(e));
    //}, 5000);
    //return () => clearInterval(id);
  }, []);
  const filterUsers = () => {
    if (find.fecha == "" && find.cliente == "" && find.estado==-1) return pedidos;
    let temp = pedidos;
    if (find.cliente != "") {
      const regex = "^" + find.cliente;
      const r = new RegExp(regex);
      temp = pedidos.filter(({ cliente }) => r.test(cliente));
    }
    if (find.fecha != "") {
      temp = temp.filter(({ fecha }) => fecha == find.fecha);
    }
    if (find.estado != -1) {
      temp = temp.filter(({ estado }) => estado == find.estado);
    }
    return temp;
  };
  const customTheme = createTheme({
    palette: {
      background: {
        default: "#f8ede9",
      },
    },
  });
  const estados = {
    "0": {color:"#080",txt: "Entregado"},
    "1": {color:"#00f",txt: "En Proceso"},
    "2": {color:"#f00",txt: "Cancelado"},
  };

  return (
    <ThemeProvider theme={customTheme}>
      <ModalDetallePedido id={pedido} onClose={()=>setPedido("")} />
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
          />
          <table style={{ marginTop: "10px", borderCollapse: "collapse" }}>
            <thead
              className="sombra"
              style={{
                display: "table",
                width: "calc( 100% - 1em )",
                tableLayout: "fixed",
              }}
            >
              <th>Restaurante</th>
              <th>Cliente</th>
              <th>Dirección</th>
              <th>Costo</th>
              <th>Fecha</th>
              <th>Estado</th>
            </thead>
            <tbody
              style={{ display: "block", overflowY: "scroll", height: "55vh" }}
              className="sombra-tr"
            >
              {filterUsers().map((value, index) => (
                <tr
                  style={{
                    display: "table",
                    width: "100%",
                    tableLayout: "fixed",
                  }}
                  key={index}
                  onClick={()=>setPedido(index)}
                >
                  <td>{value.restaurante}</td>
                  <td>{value.cliente}</td>
                  <td>{value.direccion}</td>
                  <td>{value.costo}</td>
                  <td>{value.fecha}</td>
                  <td style={{padding:"5px",color:estados[value.estado].color}}>
                    {estados[value.estado].txt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
