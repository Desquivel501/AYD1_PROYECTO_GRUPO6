import { Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import usuarios from "../../mocks/usuarios.json";
import "./Deshabilitar.css";

export function Deshabilitar() {
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
      <Box
        component="main"
        display="flex"
        height="80vh"
        sx={{ padding: "10vh" }}
        width={"100%"}
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
              {usuarios.map((value) => (
                <li key={value.id}>
                  <span>{value.id}</span>
                  <span>{roles[value.rol]}</span>
                  <button className="btn-disable">Deshabilitar</button>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
