import { ButtonGroup, Typography, Box, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { TitleCard } from '../../Componentes/TitleCard/TitleCard';
import { MenuProducto } from '../../Componentes/MenuProducto/MenuProducto';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductCard } from '../../Componentes/ProductCard/ProductCard';
import { amber, grey, brown } from '@mui/material/colors';
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import { useSesion } from "../../hooks/useSesion";

export default function EditarProductos() {

    const { user } = useSesion();

    // const [productos, setProductos] = useState([]);
    const [count, setCount] = useState(0);
    
    const [catalogo, setCatalogo] = useState([])

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

    useEffect(() => {
        fetch("http://localhost:3000/ObtenerProductos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo: user.id }),
        })
        .then(res => res.json())
        .then(response =>{
            setCatalogo(response)
            console.log(response)
        })

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

    },[])

    const handlePress = (id) => {
        console.log(id)
        for (var i = 0; i < catalogo.length; i++){
            if(catalogo[i].id == id){
                console.log(catalogo[i])
                setActual(catalogo[i]);
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
                    sx={{ width: "80vw", pt: 6 }}
                    alignItems="center"
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

                                {catalogo.map((item, i) => (
                                    <ProductCard 
                                        key={i}
                                        id={item.id}
                                        title={item.title}
                                        cost={item.cost}
                                        image={item.image}
                                        descripcion={item.descripcion}
                                        onSelect={handlePress}
                                        addDesc={true}
                                        size={10}
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
                            edicion={true}
                            addCategorias={true}
                            reporte={true}
                        />
                    </Grid>
        
                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}