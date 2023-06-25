import { Box, Dialog, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { postData } from "../../api/auth";
import { useSesion } from "../../hooks/useSesion";
import "./style.css";
import pedidos from "../../mocks/pedidos.json";
import detalles from "../../assets/productos.json";
import { ListadoProductos } from "../../Componentes/ListadoProductos/ListadoProductos";
import Swal from "sweetalert2";

export function PedidosEmpresa() {
  const { user } = useSesion();
  const [usuarios, setUsuarios] = useState([]);
  const [find, setFind] = useState("");
  const [filtroFecha, setFecha] = useState("");
  const [pedido, setPedido] = useState("");
  useEffect(() => {
    const endpoint = "ObtenerPedidos";
    const data = { correo: user.id };
    //const id = setInterval(() => {
    postData({ endpoint, data })
      .then((data) => setUsuarios(data ?? pedidos))
      .catch((e) => console.log(e));
    //}, 5000);
    //return () => clearInterval(id);
  }, []);
  const filterUsers = () => {
    if (filtroFecha == "" && find == "") return usuarios;
    let temp = usuarios;
    if (find != "") {
      const regex = "^" + find;
      const r = new RegExp(regex);
      temp = usuarios.filter(({ cliente }) => r.test(cliente));
    }
    if (filtroFecha != "") {
      temp = temp.filter(({ fecha }) => fecha == filtroFecha);
    }
    return temp;
  };
  const handlechange = (e) => {
    if (e.target.value == "") return setFecha("");
    const x = e.target.value.split("-");
    const nuevaFecha = parseInt(x[1]) + "/" + x[2] + "/" + x[0];
    setFecha(nuevaFecha);
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
          <div className="filter-pedidos">
            <label>Buscar por cliente:</label>
            <input
              className="txt-find"
              value={find}
              onChange={(e) => setFind(e.target.value)}
              placeholder="ejemplo@email.com"
            />
            <label>Buscar por fecha:</label>
            <input
              className="txt-find"
              type="date"
              onChange={handlechange}
            />
          </div>
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
function ModalDetallePedido({ id, onClose }) {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const endpoint = "detallePedido";
    const data = { id };
    postData({ endpoint, data })
      .then((data) => setProductos(data ?? detalles))
      .catch((e) => console.log(e));
  }, []);
  return (
    <Dialog onClose={onClose} open={id != ""} maxWidth="120vh">
      <ListadoProductos
        title={"Productos de la orden " + id}
        productos={productos}
      />
    </Dialog>
  );
}
