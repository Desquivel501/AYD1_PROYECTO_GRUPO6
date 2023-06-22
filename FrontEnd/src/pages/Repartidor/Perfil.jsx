import { Box, Button, Grid, TextField } from "@mui/material";
import { PersonAttribute } from "../../Componentes/Persona";
import "./Perfil.css";
import { useSesion } from "../../hooks/useSesion";
import { useEffect } from "react";
import { useState } from "react";

export function PerfilRepartidor() {
  const { solicitarNuevaDireccion, user } = useSesion();

  const [actual, setActual] = useState({
    nombre: "",
    apellidos: "",
    id: "",
    contrasenia: "****",
    celular: 0,
    direccion: "",
    tipo_licencia: "",
    cv:""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const respuesta = solicitarNuevaDireccion(data);
    console.log(respuesta);
    e.target.reset();
  };

  useEffect(() => {
      fetch("http://localhost:3000/ObtenerDatosRepartidor", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
        body: JSON.stringify({ correo: user.id }),
      })
      .then(res => res.json())
      .then(response =>{
          console.log(response)
          setActual(response[0])
      })
      
  }, [])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
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
            <PersonAttribute attribute={"Contraseña"} value={actual.contrasenia} />
            <PersonAttribute attribute={"Celular"} value={actual.celular} />
            <PersonAttribute attribute={"Dirección"} value={actual.direccion} />
            <PersonAttribute attribute={"Licencia"} value={actual.tipo_licencia} />
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
                <img src="./src/assets/icons/star.png" />
                <img src="./src/assets/icons/star.png" />
                <img src="./src/assets/icons/star.png" />
                <img src="./src/assets/icons/star.png" />
                <img src="./src/assets/icons/halfStar.png" />
              </div>
            </h2>
            <h3 style={{ margin: 0 }}>
              Total de comisiones
            </h3>
            <h1>
              {`$${245.70}`}
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Nueva Dirección"
                name="newAddress"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Motivo del Cambio"
                multiline
                name="description"
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
