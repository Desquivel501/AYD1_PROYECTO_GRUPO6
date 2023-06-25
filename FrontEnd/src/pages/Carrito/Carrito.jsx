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
import SaveIcon from '@mui/icons-material/Save';

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

    const [cont, setCont] = useState(1)


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
            setPedido(carrito)
        } 
    },[])

    const handleUpdate = (id, cantidad) => {
        var aux = pedido
        console.log("Update: " + id + " - " + cantidad)
        for(var i = 0; i < aux.productos.length; i++){
            if(aux.productos[i].id == id){
                if(parseInt(cantidad) <= 0){
                    aux.productos.splice(i, 1)
                } else {
                    aux.productos[i].cantidad = parseInt(cantidad)
                }
                window.sessionStorage.setItem("carrito", JSON.stringify(aux));
                setPedido(aux)
                break
            }
        }
        setCont(cont + 1)
    }

    const handleRemove = (id) => {
        console.log("Remove: " + id)
        var aux = pedido
        for(var i = 0; i < aux.productos.length; i++){
            if(aux.productos[i].id == id){
                aux.productos.splice(i, 1)
                window.sessionStorage.setItem("carrito", JSON.stringify(aux));
                setPedido(aux)
                break
            }
        }
        setCont(cont + 1)
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
                    sx={{ width: "80vw", pt: 6 }}
                    alignItems="center"
                    justifyContent="center"
                > 


                    <Grid
                        item
                        xs={12} sm={12}
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
                                sx={{border:0, pt:2}}
                                alignItems="left"
                                justifyContent="center"
                            > 

                                {pedido.productos.map((item, i) => (
                                    <ProductCard2 
                                        key={item.id + item.name}
                                        id={item.id}
                                        title={item.name}
                                        cost={item.costo}
                                        image={item.image}
                                        cantidad={item.cantidad}
                                        // onSelect={handlePress}
                                        onRemove={handleRemove}
                                        onUpdate={handleUpdate}
                                    />
                                ))}

                                {pedido.productos.length == 0 &&
                                    <Typography variant="h5" component="h5" align='center' 
                                        sx={{
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: '#999999',
                                        }}>
                                        No se han agregado productos
                                    </Typography>
                                }

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

                    <Grid
                        item
                        xs={12}
                        sx={{border:0}}
                    >
                        <Button
                            variant="contained"
                            type="submit"
                        
                            sx={{ 
                                mt: 2, mb: 1,
                                bgcolor: "#2f9d76",
                                fontSize: '1.5rem',
                                color: '#fff',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                '&:hover': {
                                    backgroundColor: '#206d52',
                                } 
                            }}
                            endIcon={<SaveIcon />}
                            onClick={(event) => window.location.href = "/FinalizarCompra"}
                        >
                            Confirmar Orden
                        </Button>
                    </Grid>  

                    

                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}