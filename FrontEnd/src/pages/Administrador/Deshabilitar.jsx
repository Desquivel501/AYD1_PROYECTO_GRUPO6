import { Box, Button, Dialog, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import users from "../../mocks/usuarios.json";
import "./Deshabilitar.css";
import { useState } from "react";
import { getData, postData } from "../../api/auth";
import { useEffect } from "react";
import { Modal } from "../../Componentes/Modal/Modal";
import Swal from "sweetalert2";

export function Deshabilitar() {
  const [correo, setCorreo] = useState("");
  const [usuarios, setUsuarios] = useState(users);
  const [find, setFind] = useState("");

  useEffect(() => {
    const endpoint = "ObtenerUsuarios";
    getData({ endpoint })
      .then((data) => setUsuarios(data ?? users))
      .catch((e) => console.log(e));
  }, []);
  const quitarCorreo = () => {
    setCorreo("");
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
  const roles = {
    "0": "Administrador",
    "1": "Cliente",
    "2": "Repartidor",
    "3": "Empresa",
  };
  return (
    <ThemeProvider theme={customTheme}>
      <ModalDisable email={correo} close={quitarCorreo} />
      <Box
        component="main"
        display="flex"
        height="80vh"
        sx={{ padding: "10vh" }}
        width={"100vh"}
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
          <p
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <span>Correo</span>
            <span>Rol</span>
            <span>Acción</span>
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
              {filterUsers().map((value) => (
                <li key={value.id}>
                  <span>{value.id}</span>
                  <span>{roles[value.rol]}</span>
                  <button
                    className="btn-disable"
                    onClick={() => setCorreo(value.id)}
                  >
                    Deshabilitar
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
function ModalDisable({ email, close }) {
  const [motivo, setMotivo] = useState("");
  const handleClick = () => {
    const endpoint = "deshabilitar";
    const data = { correo: email, motivo };
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
