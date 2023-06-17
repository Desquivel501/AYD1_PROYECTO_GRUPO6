import { Typography, Box, Container, Grid } from '@mui/material';
import { TitleCard } from '../../Componentes/TitleCard/TitleCard';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductCard } from '../../Componentes/ProductCard/ProductCard';
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import { ProductDialog } from '../../Componentes/ProductDialog/ProductDialog';
import { ComboDialog } from '../../Componentes/ComboDialog/ComboDialog';
import { FilterTab2 } from '../../Componentes/FilterTab2/FilterTab2';

export default function SeleccionRestaurantes() {

    const [restaurantes, setRestaurantes] = useState([])
    const [categorias, setCategorias] = useState([])

    const [search, setSearch] = useState(
        {
            keyword: "",     
            categorias: []
        }
    );

    const handleSearch = (values) => {
        setSearch(values)
    }

    function filtrar(item, combo) {
        const str = item.nombre.toLowerCase()
        const substr = search.keyword.toLowerCase()

        if(!str.includes(substr)){
            return false
        }

        if(search.categorias.length == 0){
            return true
        }
        return search.categorias.includes(item.categoria)
    }


    useEffect(() => {
        fetch("http://localhost:3000/GetRestaurantes", {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin_Origin': '*'
            }
        })
        .then(res => res.json())
        .then(response =>{
           setCategorias(response.categorias)
           setRestaurantes(response.restaurantes)
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
            width="100%"
            sx={{
                flexGrow: 1,
                py: 4
            }}
        >

            <Container maxWidth="xl">
                
                <Grid
                    container
                    spacing={3}
                    sx={{ width: "100%", pt: 6 }}
                    alignItems="top"
                    justifyContent="center"
                > 

                

                    <FilterTab2 onChange={handleSearch}/>
                    

                    <Grid
                        item
                        xs={12} sm={9}
                        justifyContent="center"
                        sx={{border:0}}
                    >
                        
                        <Grid
                            container
                            sx={{border:0, maxHeight: '90vh', overflow: 'auto'}}
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
                                    Restaurantes
                                </Typography>
                            </Grid>

                            
                            {(restaurantes.length == 0) && (
                                <Grid
                                    item
                                    xs={12} sm={12}
                                    sx={{border:0, mt:3, ml:5}}
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

                            {restaurantes.map((item, i) => {
                                return filtrar(item, true) ?
                                    <ProductCard 
                                        key={i}
                                        id={item.correo}
                                        title={item.nombre}
                                        image={categorias.filter(a => a.categoria == item.categoria)[0].imagen}
                                        onSelect={null}
                                        addDesc={false}
                                        addCost={false}
                                        size={10}
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