import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSesion } from "../../hooks/useSesion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Login() {
  const { login } = useSesion();
  const [mensaje, setMensaje] = useState({ mensaje: "", tipo: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const respuesta = await login(data);
    console.log(respuesta);
    if (respuesta.MENSAJE) {
      // setMensaje({ mensaje: respuesta.MENSAJE, tipo: "Error" });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: respuesta.MENSAJE,
      })
    } else {
      navigate(respuesta);
    }
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

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            alignItems="center"
            justifyContent="center"
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
                  width: "100%",
                }}
                component="h1"
              >
                Iniciar Sesión
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  autoFocus
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
                  Sign In
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
                <Grid container>
                  <Grid item>
                    <Link
                      href="/RegistroCliente"
                      variant="body2"
                      style={{ color: "#c36038", borderBottomColor: "#c36038" }}
                    >
                      {"¿No tienes una cuenta? ¡Registrate!"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
