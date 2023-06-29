import { Box, Button, Grid, TextField } from "@mui/material";
import { PersonAttribute } from "../../Componentes/Persona";
import "./Perfil.css";
import { useSesion } from "../../hooks/useSesion";
import { useEffect } from "react";
import { useState } from "react";
import { DireccionEnRegistro } from "../../Componentes/Direccion";
import { postData, sendFormData } from "../../api/auth";
import Swal from "sweetalert2";

export function PerfilRepartidor() {
  const { user } = useSesion();

  const [actual, setActual] = useState({
    nombre: "",
    apellidos: "",
    id: "",
    contrasenia: "****",
    celular: 0,
    direccion: "",
    tipo_licencia: "",
    cv: "",
    estrellas: 4.5,
    comisiones: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append("correo", user.id);
    const endpoint = "nuevaDireccion";
    const respuesta = sendFormData({ endpoint, data })
      .then((response) => {
        const mensaje = response[0][0];
        if (mensaje.TIPO == "EXITO") {
          Swal.fire({
            icon: "success",
            title: "Solicitud",
            text: mensaje.MENSAJE,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: mensaje.MENSAJE,
          });
        }
      });
    e.target.reset();
  };

  useEffect(() => {
    const endpoint = "ObtenerDatosRepartidor";
    const data = { correo: user.id };
    postData({ endpoint, data })
      .then((response) => {
        const datos = response[0][0];
        console.log(datos)
        setActual(datos);
      })
      .catch((e) => console.log(e));
  }, []);

  const mostrarEstrellas = () => {
    const entero = Math.trunc(actual.estrellas);
    const decimal = actual.estrellas % 1;
    const estrellas = [];
    while (estrellas.length < entero) {
      estrellas.push(
        <img key={estrellas.length} src="/src/assets/icons/star.png" />,
      );
    }
    if (decimal != 0) {
      estrellas.push(
        <img key={estrellas.length} src="/src/assets/icons/halfStar.png" />,
      );
    }
    while (estrellas.length < 5) {
      estrellas.push(
        <img key={estrellas.length} src="/src/assets/icons/emptyStar.png" />,
      );
    }
    return estrellas;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width={"120vh"}
    >
      <Grid
        container
        spacing={2}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"stretch"}
      >
        <Grid
          item
          xs={6}
          sx={{
            borderRight: "1px solid black",
            padding: "15px",
            margin: 0,
          }}
        >
          <h1>
            Mi Perfil
          </h1>

          <Box
            component="form"
            //onSubmit={handleSubmit}
            autoComplete="off"
            sx={{ mt: 1 }}
          >
            <PersonAttribute attribute={"Nombre"} value={actual.nombre} />
            <PersonAttribute attribute={"Apellido"} value={actual.apellidos} />
            <PersonAttribute attribute={"Correo"} value={actual.id} />
            <PersonAttribute
              attribute={"Contraseña"}
              value={actual.contrasenia}
            />
            <PersonAttribute attribute={"Celular"} value={actual.celular} />
            <PersonAttribute attribute={"Dirección"} value={actual.direccion} />
            <PersonAttribute
              attribute={"Licencia"}
              value={actual.tipo_licencia}
            />
            <PersonAttribute attribute={"Hoja de vida"}>
              <a
                href={actual.cv}
                target="_blank"
                className="enlace"
              >
                Ver documento
              </a>
            </PersonAttribute>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              borderBottom: "1px solid black",
            }}
          >
            <h2 className="calificacion">
              Calificación:
              <div className="stars">
                {mostrarEstrellas()}
              </div>
            </h2>
            <h3 style={{ margin: 0 }}>
              Total de comisiones
            </h3>
            <h1>
              {`Q${actual.comisiones}`}
            </h1>
          </Grid>
          <Grid item>
            <h2>
              Solicitud cambio de dirección
            </h2>
            <Box
              component="form"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid container>
                <DireccionEnRegistro />
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Motivo del Cambio"
                multiline
                name="Motivo"
                maxRows={3}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#F2890D" }}
                // onClick={showFile2}
              >
                Solicitar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
