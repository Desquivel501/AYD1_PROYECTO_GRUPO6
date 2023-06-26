import { Box, Dialog, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { postData } from "../../api/auth";
import { useSesion } from "../../hooks/useSesion";
import "./style.css";
import pedidos from "../../mocks/pedidos.json";
import Swal from "sweetalert2";
import { FilterPedidos } from "../../Componentes/FilterPedidos/FilterPedidos";
import {ModalDetallePedido} from "../../Componentes/DetallePedido/DetallePedido"

export function PedidosEmpresa() {
  const { user } = useSesion();
  const [usuarios, setUsuarios] = useState([]);
  const [find, setFind] = useState({ cliente: "", fecha: "" });
  const [pedido, setPedido] = useState("");
  useEffect(() => {
    const endpoint = "ObtenerPedidosEmpresa";
    const data = { correo: user.id };
    //const id = setInterval(() => {
    postData({ endpoint, data })
      .then((data) => setUsuarios(data ?? pedidos))
      .catch((e) => console.log(e));
    //}, 5000);
    //return () => clearInterval(id);
  }, []);
  const filterUsers = () => {
    console.log(find);
    if (find.fecha == "" && find.cliente == "") return usuarios;
    let temp = usuarios;
    if (find.cliente != "") {
      const regex = "^" + find.cliente;
      const r = new RegExp(regex);
      temp = usuarios.filter(({ cliente }) => r.test(cliente));
    }
    if (find.fecha != "") {
      temp = temp.filter(({ fecha }) => fecha == find.fecha);
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
  const handleClose = () => setPedido("");
  const aceptarPedido = (id) => {
    const endpoint = "aceptarPedidoEmpresa";
    const data = { id: id, correo: user.id };
    postData({ endpoint, data })
      .then((mensaje) => {
        if (mensaje.TIPO == "EXITO") {
          Swal.fire({
            icon: "success",
            title: "Creado",
            text: mensaje.MENSAJE,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: mensaje.MENSAJE,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <ThemeProvider theme={customTheme}>
      <ModalDetallePedido id={pedido} onClose={handleClose} />
      <Box
        component="main"
        display="flex"
        height="80vh"
        sx={{ padding: "10vh" }}
        width={"120vh"}
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
          <h1>Historial de Pedidos</h1>
          <FilterPedidos
            find={find}
            onChange={setFind}
            estado={false}
          />
          <p className="header-pedido sombra">
            <span>Cliente</span>
            <span>Fecha</span>
            <span>Costo</span>
            <span>Productos</span>
            <span>¿Aceptar?</span>
          </p>
          <Grid
            item
            width="100%"
            sx={{ overflowY: "scroll" }}
          >
            <ul
              className="lista-deshabilitar"
              style={{ listStyle: "none", padding: 0 }}
            >
              {filterUsers().map((value, index) => (
                <li className="item-pedido" key={index}>
                  <span>{value.cliente}</span>
                  <span>{value.fecha}</span>
                  <span>{value.costo}</span>
                  <button
                    className="sombra"
                    onClick={() =>
                      setPedido(value.id)}
                    style={{
                      backgroundColor: "#f2890d",
                      color: "#000",
                      border: "1px solid #f2890d",
                      borderRadius: "5px",
                    }}
                  >
                    Ver productos
                  </button>
                  <button
                    className="sombra"
                    onClick={() =>
                      aceptarPedido(value.cliente)}
                    style={{
                      backgroundColor: "#198754",
                      color: "#000",
                      border: "1px solid #198754 ",
                      borderRadius: "5px",
                    }}
                  >
                    Aceptar
                  </button>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

