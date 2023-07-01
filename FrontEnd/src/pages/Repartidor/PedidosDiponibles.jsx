import { Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { postData } from "../../api/auth";
import { useSesion } from "../../hooks/useSesion";
import Rpedidos from "../../mocks/misPedidos.json";
import { Tabla } from "../../Componentes/Tabla/Tabla";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usePedido } from "../../hooks/usePedido";
const HEADERS = [
  "ID",
  "Restaurante",
  "Cliente",
  "Dirección",
  "Costo (Q)",
  "¿Aceptar?",
];
const objectAttributes = [
  "id",
  "restaurante",
  "cliente",
  "direccion",
  "costo",
];
export function PedidosDisponibles() {
  const { user } = useSesion();
  const [pedidos, setPedidos] = useState([]);
  const { pedidoActual } = usePedido()
  const [ get,setGet ] = useState(false)

  useEffect(() => {
    const endpoint = "PedidosDisponibles";
    const data = { correo: user.id };
    postData({ endpoint, data })
      .then((data) => setPedidos(data[0] ?? []))
      .catch((e) => console.log(e));
  }, [get]);
  
  const handleClick = (e) => {
    const parent = e.currentTarget.parentElement.parentElement;
    const id = parent.firstChild.innerText;
    const endpoint = "AceptarPedidoRepartidor";
    const data = { id, correo: user.id };
    
    postData({ endpoint, data })
      .then((response) => {
        const mensaje = response[0][0];
        if (mensaje.TIPO == "EXITO") {
          Swal.fire({
            icon: "success",
            title: "Creado",
            text: mensaje.MENSAJE,
          });
          const estado = "EN CAMINO"
          pedidoActual.id = id
          pedidoActual.estado =  estado
          setGet(!get)
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

  const customTheme = createTheme({
    palette: {
      background: {
        default: "#f8ede9",
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
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
          <h1>Pedidos Disponibles</h1>
          <Tabla
            headers={HEADERS}
            fields={objectAttributes}
            data={pedidos}
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
                Aceptar 
              </button>
            </td>
          </Tabla>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
