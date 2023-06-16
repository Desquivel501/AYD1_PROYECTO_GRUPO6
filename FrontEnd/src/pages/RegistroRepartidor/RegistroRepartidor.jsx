import * as React from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { DireccionEnRegistro } from "../RegistroEmpresa/RegistroEmpresa.jsx";
import { useContext } from "react";
import { sesionContext } from "../../context/SesionContext.jsx";
import { useState } from "react";
import { Link } from "wouter";

export default function RegistroRepartidor() {
  const { registrarme } = useContext(sesionContext);
  const [mensaje, setMensaje] = useState({ mensaje: "", tipo: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mensaje = registrarme("Repartidor", data);
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
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#bd4f23",
                  textDecoration: "none",
                }}
                component="h1"
              >
                Nuevo Repartidor
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
                  id="lastname"
                  label="Apellido"
                  name="lastname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
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

                <TextField
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Telefono"
                  name="phone"
                />

                <Grid
                  container
                >
                  <DireccionEnRegistro />
                </Grid>

                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="licencia">Tipo de Licencia</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue=""
                    label="Licencia"
                    name="Licencia"
                    // onChange={handleChange}
                    // value={age}
                  >
                    <MenuItem value="A" key="A">A</MenuItem>
                    <MenuItem value="B" key="B">B</MenuItem>
                    <MenuItem value="C" key="C">C</MenuItem>
                    <MenuItem value="M" key="M">M</MenuItem>
                    <MenuItem value="E" key="E">E</MenuItem>
                  </Select>
                </FormControl>

                <FormGroup>
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="Tiene vehiculo propio"
                    name="Vehiculo"
                  />
                </FormGroup>

                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  sx={{ mt: 1, bgcolor: "#F2890D" }}
                >
                  Agregar Hoja de Vida (PDF)
                  <input
                    type="file"
                    id="file"
                    hidden
                    // onChange={showFile}
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
