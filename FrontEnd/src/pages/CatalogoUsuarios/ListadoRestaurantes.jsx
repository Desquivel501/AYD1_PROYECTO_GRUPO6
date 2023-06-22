import { Typography, Box, Container, Grid } from '@mui/material';
import { TitleCard } from '../../Componentes/TitleCard/TitleCard';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductCard } from '../../Componentes/ProductCard/ProductCard';
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import { FilterTab } from '../../Componentes/FilterTab2/FilterTab2';
import { ProductDialog } from '../../Componentes/ProductDialog/ProductDialog';
import { ComboDialog } from '../../Componentes/ComboDialog/ComboDialog';
import { useSesion } from "../../hooks/useSesion";

export default function ListadoRestaurantes() {

    const [empresas, setEmpresas] = useState([])

    const [search, setSearch] = useState(
        {
            keyword: "",     
            categorias: []
        }
    );

    const handleSearch = (values) => {
        console.log(values)
        setSearch(values)
    }

    function filtrar(item) {
        const str = item.nombre_entidad.toLowerCase()
        const substr = search.keyword.toLowerCase()

        if(!str.includes(substr)){
            return false
        }

        if(search.categorias.length == 0){
            return true
        }

        return search.categorias.includes(item.nombre)
    }

    useEffect(() => {

        fetch("http://localhost:3000/ObtenerDatosEmpresas", {
            method: "GET",
        })
        .then(res => res.json())
        .then(response =>{
            console.log(response)
            setEmpresas(response)
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

                    <FilterTab onChange={handleSearch}/>
                    

                    <Grid
                        item
                        xs={12} sm={9}
                        justifyContent="center"
                        sx={{border:0}}
                    >
                        
                        <Grid
                            container
                            sx={{border:0}}
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
                                    Empresas
                                </Typography>
                            </Grid>

                            <Grid
                                container
                                alignItems="left"
                                justifyContent="center"
                                xs={12} sm={12}
                                sx={{border:0, mb:2, mt:3, ml:5, maxHeight: '70vh', overflow: 'auto'}}
                            >

                                {(empresas.length == 0) && (
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
                                            No hay ninguna empresa
                                        </Typography>
                                    </Grid>
                                    )
                                }

                                {empresas.map((item, i) => {
                                    return filtrar(item) ?
                                        <ProductCard 
                                            key={i}
                                            id={item.correo}
                                            title={item.nombre_entidad}
                                            image={item.imagen}
                                            descripcion={item.descripcion}
                                            // onSelect={handleClickOpen2}
                                            addCost={false}
                                            addDesc={true}
                                            size={10}
                                            />
                                        : null
                                })} 


                            </Grid>

                            
                            

                        </Grid>


                    </Grid>
                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}