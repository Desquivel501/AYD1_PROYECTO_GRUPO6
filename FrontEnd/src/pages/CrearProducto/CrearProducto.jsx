import { ButtonGroup, Typography, Box, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { TitleCard } from '../../Componentes/TitleCard/TitleCard';
import { MenuProducto } from '../../Componentes/MenuProducto/MenuProducto';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function CrearProducto() {

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
                    sx={{ width: "80vw", pt: 11 }}
                    alignItems="left"
                    justifyContent="center"
                > 

                    <Grid
                        item
                        xs={12}
                    >
                        <TitleCard 
                            title={"Nombre Restaurante"}
                            logo={"https://picsum.photos/200"}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12} sm={6}
                    >
                        <MenuProducto 
                            title={"Crear Producto"}
                            logo={"https://picsum.photos/200"}
                            edicion={false}
                        />
                    </Grid>
        
                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}