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
import { useEffect, useState } from "react";
import { useContext } from "react";
import { sesionContext } from "../../context/SesionContext.jsx";
import { Link } from "react-router-dom";
import { getData } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { DireccionEnRegistro } from "../../Componentes/Direccion.jsx";

export default function RegistroEmpresa() {
  const { registrarme } = useContext(sesionContext);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({ MENSAJE: "", TIPO: "" });
  const [categorias, setCategorias] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const correo = data.get("email")
    const email_pattern = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g
    if(!email_pattern.test(correo)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Correo electronico no valido.",
      })
      return
    }
    
    const mensaje = await registrarme("Empresa", data);

    if (mensaje.TIPO == "EXITO") {
      Swal.fire({
        icon: 'success',
        title: 'Creado',
        text: mensaje.MENSAJE,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje.MENSAJE,
      })
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

  useEffect(() => {
      const endpoint = "CategoriasEmpresa"
      getData({endpoint})
      .then(response =>{
        console.log(response)
        setCategorias(response)
      })
  }, [])

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

                <FormControl fullWidth sx={{mt:2, mb:1}}>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    id="categoria"
                    label="Categoria"
                    name="categoria"
                    // onChange={handleChange}
                  >

                    {categorias.map((item, i) => (
                      <MenuItem
                        value={item.categoria}
                        key={i}
                      >
                        {item.categoria}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>

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
                {mensaje.TIPO != "" &&
                  (
                    <p
                      className="mensaje"
                      style={{
                        backgroundColor: mensaje.TIPO == "ERROR"
                          ? "#c00"
                          : "#080",
                      }}
                    >
                      {mensaje.MENSAJE}
                    </p>
                  )}
                <Link to="/Login" style={{ color: "#F2890D" }}>
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

