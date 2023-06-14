import { Box, Button, Grid, TextField } from "@mui/material";
import { PersonAttribute } from "../../Componentes/Persona";
import "./Perfil.css"

export function PerfilRepartidor() {
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
            <PersonAttribute attribute={"Nombre"} value={"Daniel"} />
            <PersonAttribute attribute={"Apellido"} value={"Acabal"} />
            <PersonAttribute attribute={"Correo"} value={"correo@gmail.com"} />
            <PersonAttribute attribute={"Contraseña"} value={"******"} />
            <PersonAttribute attribute={"Celular"} value={12345678} />
            <PersonAttribute attribute={"Dirección"} value={"Casa"} />
            <PersonAttribute attribute={"Licencia"} value={"A"} />
            <PersonAttribute attribute={"Hoja de vida"} value={"CV.pdf"} />
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          direction={"column"}
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
              <img src="./src/assets/icons/star.png"/>
              <img src="./src/assets/icons/star.png"/>
              <img src="./src/assets/icons/star.png"/>
              <img src="./src/assets/icons/star.png"/>
              <img src="./src/assets/icons/halfStar.png"/>
              </div>
            </h2>
            <h3 style={{margin:0}}>
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
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Nueva Dirección"
                name="address"
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

