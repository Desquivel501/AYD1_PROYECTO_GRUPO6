import { ButtonGroup, Typography, Box, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { TitleCard } from '../../Componentes/TitleCard/TitleCard';
import { MenuProducto } from '../../Componentes/MenuProducto/MenuProducto';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductCard } from '../../Componentes/ProductCard/ProductCard';
import { amber, grey, brown } from '@mui/material/colors';
import Paper from "@mui/material/Paper";
import Productos from '../../assets/productos.js'
import { useState } from "react";
import { useEffect } from "react";

export default function EditarProductos() {

    // const [productos, setProductos] = useState([]);
    const [actual, setActual] = useState(
        {
            id: 0,     
            title: null,
            cost: 0,
            image: "https://placehold.co/200",
            descripcion: "",
            categoria: "PlatosFuertes",
            disponible: true
        }
    );

    const handlePress = (id) => {
        console.log(id)
        for (var i = 0; i < Productos.length; i++){
            if(Productos[i].id == id){
                console.log(Productos[i])
                setActual(Productos[i]);
                break
            }
        }
    }

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
                    alignItems="center"
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
                        sx={{border:0}}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{ border:0, pt:5 }}
                            component={Paper}
                            elevation={6}
                        >
                            <Grid
                                item
                                xs={12} sm={6}
                                sx={{border:0, mb:2}}
                            >
                                <Typography variant="h3" component="h3" align='center' 
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: '#973f1c',
                                    }}>
                                    Catalogo
                                </Typography>
                            </Grid>

                            <Grid
                                container
                                sx={{border:0, pt:2, maxHeight: '55vh', overflow: 'auto'}}
                                alignItems="left"
                                justifyContent="center"
                            > 

                                {/* <ProductCard 
                                    title={"Producto"}
                                    logo={"https://picsum.photos/200"}
                                /> */}

                                {Productos.map((producto, i) => (
                                    <ProductCard 
                                        key={i}
                                        id={producto.id}
                                        title={producto.title}
                                        cost={producto.cost}
                                        image={producto.image}
                                        descripcion={producto.descripcion}
                                        onSelect={handlePress}
                                        addDesc={true}
                                    />
                                ))}

                            </Grid>
                        </Grid>

                        
                       

                    </Grid>

                    <Grid
                        item
                        xs={12} sm={6}
                        
                        sx={{border:0}}
                    >
                        <MenuProducto 
                            title={"Editar Producto"}
                            id={actual.id}
                            name={actual.title}
                            cost={actual.cost}
                            image={actual.image}
                            desc={actual.descripcion}
                            categoria={actual.categoria}
                            disponible={actual.disponible}
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