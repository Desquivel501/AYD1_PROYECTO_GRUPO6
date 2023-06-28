import { Box, Button, Dialog, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import users from "../../mocks/usuarios.json";
import "./Deshabilitar.css";
import "../../Componentes/Modal/Modal.css"
import { useState } from "react";
import { getData, postData } from "../../api/auth";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Tabla } from "../../Componentes/Tabla/Tabla";
const HEADERS = [
  "Correo",
  "Nombre",
  "FechaRegistro",
  "Rol",
  "Acción",
];
const objectAttributes = [
  "id",
  "nombre",
  "fecha",
  "rol",
];
const estados = {
  name: "rol",
  options: {
    "0": { color: "#000", txt: "Administrador" },
    "1": { color: "#000", txt: "Cliente" },
    "2": { color: "#000", txt: "Repartidor" },
    "3": { color: "#000", txt: "Empresa" },
  },
};

export function Deshabilitar() {
  const [correo, setCorreo] = useState("");
  const [usuarios, setUsuarios] = useState(users);
  const [find, setFind] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const endpoint = "ObtenerHabilitados";
    getData({ endpoint })
      .then((data) => setUsuarios(data ?? users))
      .catch((e) => console.log(e));
  }, [disable]);
  const quitarCorreo = () => {
    setCorreo("");
  };
  const request = () => setDisable(!disable);
  const handleClick = (e) => {
    const parent = e.currentTarget.parentElement.parentElement;
    const id = parent.firstChild;
    setCorreo(id.innerText);
  };
  const filterUsers = () => {
    if (find == "") return usuarios;
    const regex = "^" + find;
    const r = new RegExp(regex);
    return usuarios.filter(({ id }) => r.test(id));
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
      <ModalDisable email={correo} close={quitarCorreo} onSuccess={request} />
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
          <h1>Deshabilitar Usuarios</h1>
          <label>Buscar:</label>
          <input
            className="txt-find"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder="ejemplo@email.com"
          />
          <Tabla
            headers={HEADERS}
            fields={objectAttributes}
            data={filterUsers()}
            categoria={estados}
          >
            <td>
              <button
                className="btn-disable"
                onClick={handleClick}
              >
                Deshabilitar
              </button>
            </td>
          </Tabla>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
function ModalDisable({ email, close, onSuccess }) {
  const [motivo, setMotivo] = useState("");
  const handleClick = () => {
    const endpoint = "deshabilitar";
    const data = { correo: email, motivo };
    postData({ endpoint, data })
      .then((response) => {
        const mensaje = response[0][0];
        if (mensaje.TIPO == "EXITO") {
          Swal.fire({
            icon: "success",
            title: "Creado",
            text: mensaje.MENSAJE,
          });
          onSuccess();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: mensaje.MENSAJE,
          });
        }
        // Cerramos el modal
        close();
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (e) => {
    setMotivo(e.target.value);
  };
  return (
    <Dialog
      onClose={close}
      open={email != ""}
    >
      <div className="modal-disable">
        <h1>¿Por qué deshabilitará este usuario ?</h1>
        <h2>{email}</h2>
        <textarea
          onChange={handleChange}
          cols={50}
          rows={5}
          placeholder="Motivo..."
          value={motivo}
          style={{ resize: "none" }}
        />
        <Button
          onClick={handleClick}
          type="button"
          sx={{ mt: 1, mb: 2, bgcolor: "#F2890D", color: "black" }}
        >
          Deshabilitar
        </Button>
      </div>
    </Dialog>
  );
}
