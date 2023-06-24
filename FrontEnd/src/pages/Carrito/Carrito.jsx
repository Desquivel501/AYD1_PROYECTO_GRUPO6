import { ButtonGroup, Typography, Box, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { TitleCard } from '../../Componentes/TitleCard/TitleCard';
import { MenuDatos } from '../../Componentes/MenuDatos/MenuDatos';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductCard2 } from '../../Componentes/ProductCard/ProductCard2';
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import { useSesion } from "../../hooks/useSesion";
import Divider from '@mui/material/Divider';

export default function Carrito() {

    const { user } = useSesion();
    
    const [pedido, setPedido] = useState({
        restaurante: null,
        departamento: null,
        productos: [],
        usuario: user.id
    })

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

    const [datos, setDatos] = useState({
        title: "",
        image: ""
    })


    function subTotal() {
        var subTotal = 0
        for(var i = 0; i < pedido.productos.length; i++){
            subTotal += pedido.productos[i].cantidad * pedido.productos[i].costo
        }
        return subTotal
    }

    useEffect(() => {

        var carrito = window.sessionStorage.getItem("carrito");

        if(carrito != null || carrito != undefined){
            carrito = JSON.parse(carrito)
        }

        setPedido(carrito)
    },[])

    // const handlePress = (id) => {
    //     console.log(id)
    //     for (var i = 0; i < catalogo.length; i++){
    //         if(catalogo[i].id == id){
    //             console.log(catalogo[i])
    //             setActual(catalogo[i]);
    //             break
    //         }
    //     }
    // }

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
                    alignItems="center"
                    justifyContent="center"
                > 
                    

                    <Grid
                        item
                        xs={12} sm={4}
                        
                        sx={{border:0}}
                    >
                        <MenuDatos 
                            title={"Tus Datos"}
                            id={actual.id}
                            name={actual.title}
                            cost={actual.cost}
                            image={actual.image}
                            desc={actual.descripcion}
                            categoria={actual.categoria}
                            disponible={actual.disponible}
                            edicion={true}
                            addCategorias={true}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12} sm={8}
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
                                    Tu Pedido
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={12} sm={11.5}
                                sx={{border:0, pr:1.5}}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{border:0}}
                                >
                                    <Grid
                                        item
                                        xs={12} sm={5.25}
                                        sx={{border:0}}
                                    >
                                        <Typography variant="h6" component="h6" align='center' 
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: '#973f1c',
                                            }}>
                                            Producto
                                        </Typography>
                                    </Grid>

                                    <Divider orientation="vertical" flexItem sx={{ml:2, my:1}}/>
                                    
                                    <Grid
                                        item
                                        xs={12} sm={2.25}
                                        sx={{border:0}}
                                    >
                                        <Typography variant="h6" component="h6" align='center' 
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: '#973f1c',
                                            }}>
                                            Cantidad
                                        </Typography>
                                    </Grid>

                                    <Divider orientation="vertical" flexItem sx={{ml:2, my:1}}/>

                                    <Grid
                                        item
                                        xs={12} sm={1.5}
                                        sx={{border:0, ml:1}}
                                    >
                                        <Typography variant="h6" component="h6" align='center' 
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: '#973f1c',
                                            }}>
                                            Precio Unidad
                                        </Typography>
                                    </Grid>

                                    <Divider orientation="vertical" flexItem sx={{ml:1, my:1}}/>

                                    <Grid
                                        item
                                        xs={12} sm={1.5}
                                        sx={{border:0}}
                                    >
                                        <Typography variant="h6" component="h6" align='center' 
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: '#973f1c',
                                            }}>
                                            Total
                                        </Typography>
                                    </Grid>

                                </Grid>


                            </Grid>

                            <Grid
                                container
                                sx={{border:0, pt:2, maxHeight: '60vh', overflow: 'auto'}}
                                alignItems="left"
                                justifyContent="center"
                            > 

                                {/* <ProductCard 
                                    title={"Producto"}
                                    logo={"https://picsum.photos/200"}
                                /> */}

                                {pedido.productos.map((item, i) => (
                                    <ProductCard2 
                                        key={i}
                                        id={item.id}
                                        title={item.name}
                                        cost={item.costo}
                                        image={item.image}
                                        cantidad={item.cantidad}
                                        // onSelect={handlePress}
                                    />
                                ))}

                            </Grid>

                            <Grid
                                item
                                xs={12} sm={11.5}
                                sx={{border:0, pr:6.5, py:2}}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="right"
                                    alignItems="center"
                                    sx={{border:0}}
                                >

                                    <Grid
                                        item
                                        xs={12} sm={3}
                                        sx={{border:0}}
                                    >
                                        <Typography variant="h6" component="h6" align='right' 
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: '#973f1c',
                                            }}>
                                            Sub-Total:
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12} sm={2}
                                        sx={{border:0}}
                                    >
                                        <Typography variant="h6" component="h6" align='center' 
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: '#973f1c',
                                            }}>
                                            ${subTotal()}
                                        </Typography>
                                    </Grid>

                                </Grid>


                            </Grid>
                            
                        </Grid>

                        
                       

                    </Grid>
        

                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}