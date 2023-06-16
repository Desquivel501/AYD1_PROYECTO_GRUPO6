import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Departamentos from "../../assets/departamentos.js";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { sesionContext } from "../../context/SesionContext.jsx";
import { Link } from "wouter";

export default function RegistroEmpresa() {
  const { registrarme } = useContext(sesionContext);
  const [mensaje, setMensaje] = useState({ mensaje: "", tipo: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mensaje = registrarme("Empresa", data);
    setMensaje(mensaje);
    event.target.reset();
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
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid
          container
          component="main"
          sx={{ width: "80vw", height: "80vh", pt: 4 }}
        >
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            alignItems="center"
            justify="flex-end"
          >
            <Box
              sx={{
                my: 1,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#bd4f23",
                  textDecoration: "none",
                }}
                component="h1"
              >
                Nueva Empresa
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  name="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Descripción"
                  multiline
                  name="description"
                  maxRows={3}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Correo Electronico"
                  name="email"
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                />

                <Grid
                  container
                >
                  <DireccionEnRegistro />
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  sx={{ mt: 1, bgcolor: "#F2890D" }}
                >
                  Agregar Documentos (PDF)
                  <input
                    type="file"
                    id="file"
                    hidden
                    accept=".pdf"
                    name="document"
                  />
                  <AttachFileIcon />
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, bgcolor: "#F2890D" }}
                  // onClick={showFile2}
                >
                  Registrarme
                </Button>
                {mensaje.tipo != "" &&
                  (
                    <p
                      className="mensaje"
                      style={{
                        backgroundColor: mensaje.tipo == "Error"
                          ? "#c00"
                          : "#080",
                      }}
                    >
                      {mensaje.mensaje}
                    </p>
                  )}
                <Link href="/Login" style={{ color: "#F2890D" }}>
                  ¿Ya tienes una cuenta?
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random?food)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
export function DireccionEnRegistro() {
  const [departamento, setDepartamento] = useState("Guatemala");
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    console.log(departamento);
    const nuevosMunicipios = Departamentos.find((value) =>
      value.title == departamento
    );
    setMunicipios(nuevosMunicipios.mun);
  }, [departamento]);

  return (
    <>
      <Grid
        item
        xs={4}
        sx={{ pr: 1 }}
        alignItems="center"
        justify="flex-end"
      >
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="departamento">Departamento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            label="Departamento"
            onChange={(e) => setDepartamento(e.target.value)}
            name="Departamento"
          >
            {Departamentos.map((departamento) => (
              <MenuItem
                value={departamento.title}
                key={departamento.title}
              >
                {departamento.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        item
        xs={4}
        sx={{ pr: 1 }}
        alignItems="center"
        justify="flex-end"
      >
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="Municipio">Municipio</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            label="Municipio"
            name="Municipio"
          >
            {municipios.map((muni) => (
              <MenuItem
                value={muni}
                key={muni}
              >
                {muni}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        item
        xs={4}
        alignItems="center"
        justify="flex-end"
      >
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id="zona"
          label="Zona"
          name="zona"
          InputProps={{ inputProps: { min: 0, max: 99 } }}
        />
      </Grid>
    </>
  );
}
