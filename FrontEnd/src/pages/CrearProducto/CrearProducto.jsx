import { ButtonGroup, Typography, Box, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { TitleCard } from '../../Componentes/TitleCard/TitleCard';
import { MenuProducto } from '../../Componentes/MenuProducto/MenuProducto';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";

export default function CrearProducto() {

    const [datos, setDatos] = useState({
        title: "",
        image: ""
    })

    useEffect(() => {
        fetch("http://localhost:3000/ObtenerDatosEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo: user.id }),
        })
        .then(res => res.json())
        .then(response =>{
            setDatos({
                title: response[0].nombre_entidad,
                image: response[0].imagen
            })
        })
    }, [])

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
            component="main"
            display="flex"
            minHeight="100vh"
            sx={{
                flexGrow: 1,
                py: 4
            }}
        >
            <Container maxWidth="xl">
                
                <Grid
                    container
                    spacing={3}
                    sx={{ width: "80vw", pt: 6 }}
                    alignItems="left"
                    justifyContent="center"
                > 

                    <Grid
                        item
                        xs={12}
                    >
                        <TitleCard 
                            title={datos.title}
                            logo={datos.image}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12} sm={6}
                    >
                        <MenuProducto 
                            title={"Crear Producto"}
                            image={"https://picsum.photos/200"}
                            edicion={false}
                            addCategorias={true}
                        />
                    </Grid>
        
                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}