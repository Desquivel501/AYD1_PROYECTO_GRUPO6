import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSesion } from "../../hooks/useSesion";
import { useState } from "react";
import { Link } from "wouter";

export default function RegistroCliente() {
  const { registrarme } = useSesion();
  const [mensaje, setMensaje] = useState({ mensaje: "", tipo: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mensaje = registrarme("Usuario", data);
    setMensaje(mensaje);
    //setMensaje({mensaje:"Hubo un error",tipo:"Error"});
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
                my: 8,
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
                Registrarme
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
                  type="email"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#F2890D" }}
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
