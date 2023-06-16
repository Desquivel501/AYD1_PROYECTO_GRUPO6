import { Typography, Box, Container, Grid } from '@mui/material';
import { TitleCard } from '../../Componentes/TitleCard/TitleCard';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductCard } from '../../Componentes/ProductCard/ProductCard';
import Paper from "@mui/material/Paper";
import Productos from '../../assets/productos.js'
import { useState } from "react";
import { useEffect } from "react";
import { FilterTab } from '../../Componentes/FilterTab/FilterTab';
import { ProductDialog } from '../../Componentes/ProductDialog/ProductDialog';
import { ComboDialog } from '../../Componentes/ComboDialog/ComboDialog';

export default function CatalogoEmpresa() {

    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [catalogo, setCatalogo] = useState([])
    const [combo, setCombo] = useState([])

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

    const [actual2, setActual2] = useState(
        {
            id: 0,     
            title: null,
            cost: 0,
            image: "https://placehold.co/200",
            descripcion: "",
            categoria: "PlatosFuertes",
            disponible: true,
            productos: []
        }
    );

    const [search, setSearch] = useState(
        {
            keyword: "",     
            categorias: ["Entradas", "PlatosFuertes", "Bebidas", "Postres", "Ninos", "Combos"]
        }
    );

    const handleSearch = (values) => {
        console.log(values)
        setSearch(values)
    }

    function filtrar(item, combo) {
        
        // if( ! search.categories.includes(item.categoria)){
        //     return false
        // }

        const str = item.title.toLowerCase()
        const substr = search.keyword.toLowerCase()

        if(!str.includes(substr)){
            return false
        }

        if (combo){
            return search.categorias.includes("Combos")
        }
        return search.categorias.includes(item.categoria)
    }

    useEffect(() => {
        fetch("http://localhost:3000/GetAll", {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin_Origin': '*'
            }
        })
        .then(res => res.json())
        .then(response =>{
            setCatalogo(response.productos)
            setCombo(response.combos)
        })
    }, [])

    

    const handleClickOpen = (id) => {
        console.log(id)
        for (var i = 0; i < catalogo.length; i++){
            if(catalogo[i].id == id){
                console.log(catalogo[i])
                setActual(catalogo[i]);
                break
            }
        }
        setOpen(true);
    }

    const handleClickOpen2 = (id) => {
        console.log(id)
        for (var i = 0; i < combo.length; i++){
            if(combo[i].id == id){
                console.log(combo[i])
                setActual2(combo[i]);
                break
            }
        }
        setOpen2(true);
    }

    // const handleClickOpen2 = (id) => {
    //     console.log(id)
    //     for (var i = 0; i < Productos.length; i++){
    //         if(Productos[i].id == id){
    //             console.log(Productos[i])
    //             setActual(Productos[i]);
    //             break
    //         }
    //     }
    //     setOpen(true);
    // }

    
    const handleClose = (value) => {
        setOpen(false);
        setOpen2(false);
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
            width="100%"
            sx={{
                flexGrow: 1,
                py: 4
            }}
        >
            <ProductDialog 
                open={open}
                onClose={handleClose}
                title={actual.title}
                cost={actual.cost}
                image={actual.image}
                descripcion={actual.descripcion}
                categoria={actual.categoria}
                disponible={actual.disponible}
            />

            <ComboDialog 
                open={open2}
                onClose={handleClose}
                title={actual2.title}
                cost={actual2.cost}
                image={actual2.image}
                descripcion={actual2.descripcion}
                categoria={actual2.categoria}
                disponible={actual2.disponible}
                productos={actual2.productos}
            />


            <Container maxWidth="xl">
                
                <Grid
                    container
                    spacing={3}
                    sx={{ width: "100%", pt: 6 }}
                    alignItems="top"
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

                    <FilterTab onChange={handleSearch}/>
                    

                    <Grid
                        item
                        xs={12} sm={9}
                        justifyContent="center"
                        sx={{border:0}}
                    >
                        
                        <Grid
                            container
                            sx={{border:0, maxHeight: '75vh', overflow: 'auto'}}
                            alignItems="left"
                            justifyContent="center"
                            component={Paper}
                        > 
                            <Grid
                                item
                                xs={12} sm={12}
                                sx={{border:0, mb:2, mt:3, ml:5}}
                            >
                                <Typography variant="h3" component="h3" align='left' 
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: '#973f1c',
                                    }}>
                                    Combos / Promociones
                                </Typography>
                            </Grid>

                            
                            {(catalogo.length == 0) && (
                                <Grid
                                    item
                                    xs={12} sm={12}
                                    sx={{border:0, mb:2, mt:3, ml:5}}
                                >
                                    <Typography variant="h5" component="h5" align='center' 
                                        sx={{
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: '#999999',
                                            mb:4
                                        }}>
                                        No se ha creado ningun combo
                                    </Typography>
                                </Grid>
                                )
                            }

                            {combo.map((item, i) => {
                                return filtrar(item, true) ?
                                    <ProductCard 
                                        key={i}
                                        id={item.id}
                                        title={item.title}
                                        cost={item.cost}
                                        image={"https://www.freeiconspng.com/thumbs/promotion-icon-png/leistungen-promotion-icon-png-0.png"}
                                        descripcion={item.descripcion}
                                        onSelect={handleClickOpen2}
                                        addDesc={false}
                                        size={3.7}
                                        />
                                    : null
                            })}

                            <Grid
                                item
                                xs={12} sm={12}
                                sx={{border:0, mb:2, mt:3, ml:5}}
                            >
                                <Typography variant="h3" component="h3" align='left' 
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: '#973f1c',
                                    }}>
                                    Catalogo
                                </Typography>
                            </Grid>

                            
                            {(catalogo.length == 0) &&
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

                            {catalogo.map((item, i) => {
                                return filtrar(item, false) ?
                                    <ProductCard 
                                        key={i}
                                        id={item.id}
                                        title={item.title}
                                        cost={item.cost}
                                        image={item.image}
                                        descripcion={item.descripcion}
                                        // onSelect={handlePress}
                                        onSelect={handleClickOpen}
                                        addDesc={false}
                                        size={3.7}
                                    />
                                : null
                            })}
                        
                        
                        </Grid>


                    </Grid>
                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}