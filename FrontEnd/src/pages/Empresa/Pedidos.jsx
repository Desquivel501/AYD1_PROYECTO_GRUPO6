import { Box, Dialog, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { postData } from "../../api/auth";
import { useSesion } from "../../hooks/useSesion";
import "./style.css";
import pedidos from "../../mocks/pedidos.json";
import Swal from "sweetalert2";
import { FilterPedidos } from "../../Componentes/FilterPedidos/FilterPedidos";
import { ModalDetallePedido } from "../../Componentes/DetallePedido/DetallePedido";
import { Tabla } from "../../Componentes/Tabla/Tabla";
const HEADERS = [
  "ID",
  "Cliente",
  "Fecha",
  "Costo",
  "Productos",
  "¿Aceptar?",
];
const objectAttributes = [
  "id",
  "cliente",
  "fecha",
  "costo",
];

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
  const handleClose = () => setPedido("");
  const aceptarPedido = (e) => {
    const parent = e.currentTarget.parentElement.parentElement;
    const id = parent.firstChild.innerText;
    const endpoint = "aceptarPedidoEmpresa";
    const data = { id: id, correo: user.id };
    postData({ endpoint, data })
      .then((response) => {
        const mensaje = response[0][0]
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
          <Tabla
            headers={HEADERS}
            fields={objectAttributes}
            data={filterUsers()}
          >
            <td>
              <button
                className="sombra"
                onClick={handleClick}
                style={{
                  backgroundColor: "#f2890d",
                  color: "#000",
                  border: "1px solid #f2890d",
                  borderRadius: "5px",
                }}
              >
                Ver productos
              </button>
            </td>
            <td>
              <button
                className="sombra"
                onClick={aceptarPedido}
                style={{
                  backgroundColor: "#198754",
                  color: "#000",
                  border: "1px solid #198754 ",
                  borderRadius: "5px",
                }}
              >
                Aceptar
              </button>
            </td>
          </Tabla>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
