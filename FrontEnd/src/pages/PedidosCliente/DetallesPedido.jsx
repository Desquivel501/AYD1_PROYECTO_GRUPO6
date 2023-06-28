import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import {Box, Typography, Container, Collapse } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { json, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSesion } from "../../hooks/useSesion";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ProductCard3 } from "../../Componentes/ProductCard/ProductCard3";
import Swal from 'sweetalert2'

export const DetallesPedido = (props) => {

    const { user } = useSesion();
    
    const { id, estado } = useParams();

    const [open, setOpen] = useState(false);

    const [calificacion, setCalificacion] = useState(5);

    const [open2, setOpen2] = useState(false);

    const [pedido, setPedido] = useState({
        calificacion: 0,
        costo: 0,
        direccion: "",
        estado: "",
        fecha: "",
        id: 0,
        img_categoria: "https://placehold.co/200",
        nota: null,
        numero_tarjeta: 0,
        repartidor: null,
        restaurante: "",
        productos: []
    })

    const estados = {
        "PENDIENTE":"#CE93D8",
        "EN CAMINO":"#ffcc00",
        "ENTREGADO":"#29B6F6",
        "TERMINADA":"#10d21b",
        "EN PROCESO":"#FFA000"
      }

    const [total, setTotal] = useState(0)

    useEffect(() => {

        fetch("http://localhost:3000/datosPedido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo: user.id, id: id }),
        })
        .then(res => res.json())
        .then(response =>{
            console.log(response)
            console.log(response.cupon)
            setPedido(response)
        })

    },[])


    const handleSubmit = () => {
        fetch("http://localhost:3000/calificarPedido", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ calificacion: calificacion, id: id })
        })
        .then(res => res.json())
        .then(response =>{
            console.log(response[0][0])                
            if(response[0][0].TIPO != "EXITO"){
                Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    text: response[0][0].MENSAJE,
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Gracias por tu calificación',
                    text: response[0][0].MENSAJE,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/Empresas")
                    }
                })
            }
        })
    }

    const mostrarEstrellas = () => {
        const entero = Math.trunc(pedido.calificacion);
        const decimal = pedido.calificacion % 1;
        console.log({ entero, decimal });
        const estrellas = []
        while (estrellas.length<entero) {
          estrellas.push(<StarIcon sx={{ fontSize: 50, color:"#ffcc00" }} />);
        } 
        if (decimal != 0) {
          estrellas.push(<StarHalfIcon sx={{ fontSize: 50, color:"#ffcc00" }} />);
        }
        while (estrellas.length<5) {
          estrellas.push(<StarOutlineIcon sx={{ fontSize: 50, color:"#ffcc00" }} />);
        }
        return estrellas
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
                        sx={{ width: "80vw", pt: 6, border:0 }}
                        alignItems="center"
                        justifyContent="center"
                        
                    > 

                        { estado == "ENTREGADO" && 
                            <Grid
                                item
                                xs={12}
                                sx={{border:0}}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    sx={{ border:0, px:4, py:3, mb:5,  border:0, minHeight:"80vh" }}
                                    component={Paper}
                                    elevation={6}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{border:0}}
                                    >
                                        <Typography variant="h2" component="h2" align='center' 
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: '#973f1c',
                                            }}>
                                            ¡Tu pedido ha sido entregado!
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sx={{border:0}}
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
                                                xs={12}
                                                sx={{border:0, mt:4}}
                                            >
                                                <Typography variant="h5" component="h5" align='center' 
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: 700,
                                                        letterSpacing: '.3rem',
                                                        color: '#973f1c',
                                                    }}>
                                                    Repartidor:
                                                </Typography>
                                            </Grid>



                                            <Grid
                                                item
                                                xs={12}
                                                sx={{border:0, mt:2}}
                                                justifyContent="center"
                                                alignContent="center"
                                            >
                                                 <Typography variant="h4" component="h4" align='center' 
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: 700,
                                                        letterSpacing: '.3rem',
                                                        color: '#973f1c',
                                                    }}>
                                                    {pedido.repartidor}
                                                </Typography>
                                                
                                        
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sx={{border:0, mt:4}}
                                                justifyContent="center"
                                                alignContent="center"
                                            >
                                                <Typography variant="h5" component="h5" align='center' 
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: 700,
                                                        letterSpacing: '.3rem',
                                                        color: '#973f1c',
                                                    }}>
                                                    ¿Como calificarias el servicio?
                                                </Typography>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                lg={12}
                                                sx={{border:0}}
                                            >
                                                
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                lg={12}
                                                sx={{border:0}}
                                            >
                                                

                                                <IconButton aria-label="delete" onClick={(event) => setCalificacion(1)}>
                                                    { calificacion >= 1 ? 
                                                        <StarIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                        : 
                                                        <StarOutlineIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                    }
                                                </IconButton>

                                                <IconButton aria-label="delete" onClick={(event) => setCalificacion(2)}>
                                                    { calificacion >= 2 ? 
                                                        <StarIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                        : 
                                                        <StarOutlineIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                    }
                                                </IconButton>

                                                <IconButton aria-label="delete" onClick={(event) => setCalificacion(3)}>
                                                    { calificacion >= 3 ? 
                                                        <StarIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                        : 
                                                        <StarOutlineIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                    }
                                                </IconButton>

                                                <IconButton aria-label="delete" onClick={(event) => setCalificacion(4)}>
                                                    { calificacion >= 4 ? 
                                                        <StarIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                        : 
                                                        <StarOutlineIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                    }
                                                </IconButton>

                                                <IconButton aria-label="delete" onClick={(event) => setCalificacion(5)}>
                                                    { calificacion >= 5 ? 
                                                        <StarIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                        : 
                                                        <StarOutlineIcon sx={{ fontSize: 50, color:"#ffcc00" }} />
                                                    }
                                                </IconButton>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sx={{border:0, mt:4}}
                                                justifyContent="center"
                                                alignContent="center"
                                            >
                                                <Typography variant="h5" component="h5" align='center' 
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: 700,
                                                        letterSpacing: '.3rem',
                                                        color: '#973f1c',
                                                    }}>
                                                    Comentarios
                                                </Typography>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={6}
                                                sx={{border:0, mt:1}}
                                                justifyContent="center"
                                                alignContent="center"
                                            >
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="comentario"
                                                    label="Comentario:"
                                                    multiline
                                                    name="comentario"
                                                    rows={5}
                                                />    
                                            
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sx={{border:0}}
                                            >
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                            mt: 3, mb: 2, bgcolor: "#F2890D",
                                                            fontSize: '1.3rem',
                                                            color: '#fff',
                                                            fontFamily: 'monospace',
                                                            fontWeight: 700,
                                                            '&:hover': {
                                                                backgroundColor: '#973f1c',
                                                            }
                                                        }}
                                                    onClick={handleSubmit}
                                                > 
                                                    Enviar
                                                </Button>
                                            </Grid>  

                                            

                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                        }

                        { estado != "ENTREGADO" && 
                            <Grid
                                item
                                xs={12}
                                sx={{border:0}}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    sx={{ border:0, px:4, py:3, mb:5 }}
                                    component={Paper}
                                    elevation={6}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{border:0}}
                                    >
                                        <Typography variant="h2" component="h2" align='center' 
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: '#973f1c',
                                            }}>
                                            Pedido
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={6.1}
                                        sx={{border:0}}
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="left"
                                            alignItems="center"
                                            sx={{border:0}}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sx={{border:0, mt:0.5}}
                                            >
                                                <Typography variant="h6" component="h6" align='left' 
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: 700,
                                                        letterSpacing: '.3rem',
                                                        color: '#973f1c',
                                                    }}>
                                                    Empresa:
                                                </Typography>
                                            </Grid>

                                            <Grid
                                                container
                                                spacing={3}
                                                direction="row"
                                                alignItems="center"
                                                sx={{ display:"flex" }}
                                            > 

                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    lg={1.5}
                                                    sx={{border:0}}
                                                >
                                                    <Box
                                                        component="img"
                                                        sx={{
                                                            height: 'auto', maxWidth: '100%'
                                                        }}
                                                        alt="Logo"
                                                        src={pedido.img_categoria}
                                                    />  
                                                </Grid>

                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    lg={9}
                                                    sx={{border:0}}
                                                >
                                                    <Typography variant="h3" component="h3" align='left' 
                                                        sx={{
                                                            fontFamily: 'monospace',
                                                            fontWeight: 700,
                                                            letterSpacing: '.3rem',
                                                            color: '#973f1c',
                                                        }}>
                                                        {pedido.restaurante}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={6.1}
                                        sx={{border:0}}
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
                                                xs={12}
                                                sx={{border:0, mt:2}}
                                            >
                                                <Typography variant="h6" component="h6" align='left' 
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: 700,
                                                        letterSpacing: '.3rem',
                                                        color: '#973f1c',
                                                    }}>
                                                    Estado:
                                                </Typography>
                                            </Grid>

                                            <Box
                                                sx={{
                                                    backgroundColor: estados[pedido.estado],
                                                    height: 50,
                                                    width: 200,
                                                    borderRadius: '1em 1em 1em 1em',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {pedido.estado}
                                            </Box>


                                        </Grid>
                                    </Grid>

                                    {pedido.repartidor != null &&

                                        <Grid
                                            item
                                            xs={6.1}
                                            sx={{border:0}}
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
                                                    xs={12}
                                                    sx={{border:0, mt:2}}
                                                >
                                                    <Typography variant="h6" component="h6" align='left' 
                                                        sx={{
                                                            fontFamily: 'monospace',
                                                            fontWeight: 700,
                                                            letterSpacing: '.3rem',
                                                            color: '#973f1c',
                                                        }}>
                                                        Repartidor:
                                                    </Typography>
                                                </Grid>

                                                
                                                
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sx={{border:0, mt:2}}
                                                        justifyContent="center"
                                                        alignContent="center"
                                                    >
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            alignItems="center"
                                                        
                                                        > 

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                sm={12}
                                                                lg={12}
                                                                sx={{border:0}}
                                                            >
                                                                <Typography variant="h4" component="h4" align='center' 
                                                                    sx={{
                                                                        fontFamily: 'monospace',
                                                                        fontWeight: 700,
                                                                        letterSpacing: '.3rem',
                                                                        color: '#973f1c',
                                                                    }}>
                                                                    {pedido.repartidor}
                                                                </Typography>
                                                            </Grid>

                                                            { (pedido.calificacion != 0) &&  
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    sm={12}
                                                                    lg={12}
                                                                    sx={{border:0}}
                                                                >
                                                                    {mostrarEstrellas()}
                                                                    {/* <StarIcon
                                                                        sx={{ 
                                                                            fontSize: 50,
                                                                            color:"#ffcc00"
                                                                        }}
                                                                    />
                                                                    <StarIcon
                                                                        sx={{ 
                                                                            fontSize: 50,
                                                                            color:"#ffcc00"
                                                                        }}
                                                                    />
                                                                    <StarIcon
                                                                        sx={{ 
                                                                            fontSize: 50,
                                                                            color:"#ffcc00"
                                                                        }}
                                                                    />
                                                                    <StarIcon
                                                                        sx={{ 
                                                                            fontSize: 50,
                                                                            color:"#ffcc00"
                                                                        }}
                                                                    />
                                                                    <StarHalfIcon
                                                                        sx={{ 
                                                                            fontSize: 50,
                                                                            color:"#ffcc00"
                                                                        }}
                                                                    /> */}
                                                                </Grid>
                                                            }

                                                        </Grid>
                                                        
                                                    </Grid>
                                            </Grid>
                                        </Grid>

                                    }

                                    <Grid
                                        item
                                        xs={6.1}
                                        sx={{border:0}}
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="left"
                                            alignItems="center"
                                            sx={{border:0}}
                                        >
                                            <Grid
                                                item
                                                xs={11}
                                                sx={{border:0, mt:2}}
                                            >
                                                <Typography variant="h6" component="h6" align='left' 
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: 700,
                                                        letterSpacing: '.3rem',
                                                        color: '#973f1c',
                                                    }}>
                                                    Tu Pedido:
                                                </Typography>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={1}
                                                sx={{border:0, mt:2}}
                                            >
                                                <IconButton aria-label="delete" onClick={(event) => setOpen(!open)}>
                                                    {open ? <ExpandLess /> : <ExpandMore />}
                                                </IconButton>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sx={{border:0, mt:2}}
                                            >
                                                <Collapse in={open} timeout="auto" unmountOnExit>
                                                    {pedido.productos.map((item, i) => (
                                                        <ProductCard3
                                                            key={item.id + item.titulo}
                                                            id={item.id}
                                                            title={item.titulo}
                                                            cost={item.precio}
                                                            image={item.Combo ? "https://www.freeiconspng.com/thumbs/promotion-icon-png/leistungen-promotion-icon-png-0.png" : item.imagen}
                                                            cantidad={item.cantidad}
                                                            coupon={false}
                                                        />
                                                    ))}

                                                    { pedido.cupon != null &&
                                                        <ProductCard3
                                                            title={pedido.cupon.nombre}
                                                            cost={0}
                                                            image={"https://webiside.com/wp-content/uploads/2021/07/discount.png"}
                                                            cantidad={0}
                                                            coupon={true}
                                                            discount={pedido.cupon.porcentaje * ((pedido.costo)/(1 -  pedido.cupon.porcentaje))}
                                                        />
                                                    }

                                                    <Typography variant="h6" component="h6" align='center' 
                                                        sx={{
                                                            fontFamily: 'monospace',
                                                            fontWeight: 700,
                                                            letterSpacing: '.3rem',
                                                            color: '#973f1c',
                                                            marginTop:1
                                                        }}>
                                                        Total: ${pedido.costo}
                                                    </Typography>       
                                                </Collapse>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={6.1}
                                        sx={{border:0}}
                                    >
                                        
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="left"
                                            alignItems="center"
                                            sx={{border:0}}
                                        >
                                            <Grid
                                                item
                                                xs={11}
                                                sx={{border:0, mt:2}}
                                            >
                                                <Typography variant="h6" component="h6" align='left' 
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: 700,
                                                        letterSpacing: '.3rem',
                                                        color: '#973f1c',
                                                    }}>
                                                    Detalles de la orden:
                                                </Typography>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={1}
                                                sx={{border:0, mt:2}}
                                            >
                                                <IconButton aria-label="delete" onClick={(event) => setOpen2(!open2)}>
                                                    {open2 ? <ExpandLess /> : <ExpandMore />}
                                                </IconButton>
                                            </Grid>

                                            <Collapse in={open2} timeout="auto" unmountOnExit>

                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    // disabled
                                                    id="direccion"
                                                    label="Dirección"
                                                    name="direccion"
                                                    value={pedido.direccion}
                                                />


                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    // disabled
                                                    id="forma"
                                                    label="Forma de pago"
                                                    name="forma"
                                                    value={pedido.numero_tarjeta == null ? "Efectivo" : "Tarjeta"}
                                                />  

                                                {pedido.numero_tarjeta != null &&
                                                    <TextField
                                                        margin="normal"
                                                        fullWidth
                                                        // disabled
                                                        id="cc"
                                                        label="No. Tarjeta"
                                                        name="cc"
                                                        value= {"**** ***** **** " + pedido.numero_tarjeta.toString().substr(-4)}
                                                    />  
                                                    
                                                }

                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="comentario"
                                                    label="Comentario:"
                                                    multiline
                                                    name="comentario"
                                                    rows={3}
                                                    value={(pedido.nota != null) ? pedido.nota : ""}
                                                />    
                                            </Collapse>

                                            
                                        </Grid>
                                    </Grid>

                                    

                                </Grid>
                            </Grid>
                        }

                    </Grid>
                </Container>


                    

            </Box>
    
        </ThemeProvider>

    );
}
