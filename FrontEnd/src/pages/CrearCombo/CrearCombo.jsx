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
import { MenuCombo } from '../../Componentes/MenuCombo/MenuCombo';

export default function CrearCombo() {

    const [count, setCount] = useState(0);

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

    useEffect(() => {
        if(count == 0){
            setCatalogo(Productos)
            setCount(1)
        }
    })
    
    const [catalogo, setCatalogo] = useState([])
    const [combo, setCombo] = useState([])


    const handlePressCatalogo = (id) => {
        for (var i = 0; i < catalogo.length; i++){
            if(catalogo[i].id == id){
                console.log(catalogo[i])
                combo.push(catalogo[i])
                catalogo.splice(i, 1)
            }
        }
        setCombo(combo)
        setCatalogo(catalogo)
        
        setCount(count +1)
        console.log(combo)
    }

    const handlePressCombo = (id) => {
        for (var i = 0; i < combo.length; i++){
            if(combo[i].id == id){
                console.log(combo[i])
                catalogo.push(combo[i])
                combo.splice(i, 1)
            }
        }
        setCatalogo(catalogo)
        setCombo(combo)

        setCount(count +1)
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
                        xs={12} sm={8}
                        
                        sx={{border:0}}
                    >
                        <Grid
                            container
                            spacing={3}
                            sx={{ mt:2 }}
                            alignItems="center"
                            justifyContent="center"
                            component={Paper}
                        > 
                            <Grid
                                item
                                xs={12} sm={5}
                                
                                sx={{border:0}}
                            >
                                <MenuCombo 
                                    title={"Crear Combo"}
                                    id={actual.id}
                                    name={actual.title}
                                    cost={actual.cost}
                                    image={actual.image}
                                    desc={actual.descripcion}
                                    categoria={actual.categoria}
                                    disponible={actual.disponible}
                                    edicion={false}
                                    addCategorias={false}
                                    addComp={null}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12} sm={7}
                                sx={{border:0}}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    sx={{ border:0, pt:1 }}
                                >
                                    <Grid
                                        item
                                        xs={12} sm={12}
                                        sx={{border:0, mb:2}}
                                    >
                                        <Typography variant="h5" component="h5" align='center' 
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: '#973f1c',
                                            }}>
                                            Productos del Combo
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        container
                                        sx={{border:0, pt:2, maxHeight: '55vh', overflow: 'auto'}}
                                        alignItems="left"
                                        justifyContent="center"
                                    > 

                                            {
                                                (combo.length == 0) &&
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

                                        {combo.map((item, i) => (
                                            <ProductCard 
                                                key={i}
                                                id={item.id}
                                                title={item.title}
                                                cost={item.cost}
                                                image={item.image}
                                                descripcion={item.descripcion}
                                                onSelect={handlePressCombo}
                                                addDesc={false}
                                            />
                                        ))}

                                    </Grid>
                                </Grid>
                            </Grid>
                        
                        
                        </Grid>


                    </Grid>
            
                    

                    

                    <Grid
                        item
                        xs={12} sm={4}
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
                                xs={12} sm={12}
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

                                {
                                    (catalogo.length == 0) &&
                                    <Typography variant="h5" component="h5" align='center' 
                                        sx={{
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: '#999999',
                                            mb:4
                                        }}>
                                        No hay productos
                                    </Typography>
                                }

                                {catalogo.map((item, i) => (
                                    <ProductCard 
                                        key={i}
                                        id={item.id}
                                        title={item.title}
                                        cost={item.cost}
                                        image={item.image}
                                        descripcion={item.descripcion}
                                        onSelect={handlePressCatalogo}
                                        addDesc={false}
                                    />
                                ))}

                            </Grid>
                        </Grid>
                    </Grid>

                    
        
                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}