import { Typography, Box, Container, Grid } from '@mui/material';
import { TitleCard } from '../../Componentes/TitleCard/TitleCard';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductCard } from '../../Componentes/ProductCard/ProductCard';
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import { FilterTab } from '../../Componentes/FilterTab/FilterTab';
import { ProductDialog } from '../../Componentes/ProductDialog/ProductDialog';
import { ComboDialog } from '../../Componentes/ComboDialog/ComboDialog';
import { useSesion } from "../../hooks/useSesion";
import { json, useParams } from 'react-router-dom';

export default function ListadoProductos() {

    const { user } = useSesion();
    const { departamento, id } = useParams();

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [catalogo, setCatalogo] = useState([])
    const [combo, setCombo] = useState([])

    const [datos, setDatos] = useState({
        nombre_entidad: "",
        imagen: ""
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
            categorias: ["Entradas", "Platos Fuertes", "Bebidas", "Postres", "Niños", "Combos"]
        }
    );

    const handleSearch = (values) => {
        console.log(values)
        setSearch(values)
    }

    function filtrar(item, combo) {
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
        fetch("http://localhost:3000/ObtenerDatosEmpresa2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                nombre: decodeURI(id),
                departamento: departamento
             }),
            credentials: "include",
        })
        .then(res => res.json())
        .then(response =>{
            setDatos(response[0])   
        })
    }, [])


    useEffect(() => {
        fetch("http://localhost:3000/ObtenerCombos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ correo: datos.correo }),
        })
        .then(res => res.json())
        .then(response =>{
            setCombo(response)
        })

        fetch("http://localhost:3000/ObtenerProductos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo: datos.correo }),
          credentials: "include",
        })
        .then(res => res.json())
        .then(response =>{
            setCatalogo(response)
        })

    }, [datos])

    

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

    const addCarrito = (p_id,name,tipo,cant,costo,img) => {
        var carrito = window.sessionStorage.getItem("carrito");
        
        if(carrito == null || carrito == undefined){
            carrito = {
                restaurante: id,
                departamento: departamento,
                productos: [],
                usuario: user.id
            }
        } else {
            carrito = JSON.parse(carrito)
            if(carrito.restaurante != id){
                carrito = {
                    restaurante: id,
                    departamento: departamento,
                    productos: [],
                    usuario: user.id
                }
            }
        }

        var found = false
        for(var i = 0; i < carrito.productos.length; i++){
            if(carrito.productos[i].id == p_id && carrito.productos[i].tipo == tipo){
                carrito.productos[i].cantidad += parseInt(cant)
                found = true
                break
            }
        }
        if(!found){
            carrito.productos.push({
                id: p_id,
                name: name,
                tipo: tipo,
                cantidad: parseInt(cant),
                costo: parseInt(costo),
                image: img
            })
        }
        window.sessionStorage.setItem("carrito", JSON.stringify(carrito));

        // window.sessionStorage.setItem("carrito", "");
        // const sesion = window.sessionStorage.getItem("carrito");
    }

    
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
                id={actual.id}
                title={actual.title}
                cost={actual.cost}
                image={actual.image}
                descripcion={actual.descripcion}
                categoria={actual.categoria}
                disponible={actual.disponible}
                venta={true}
                onOrder={addCarrito}
            />

            <ComboDialog 
                open={open2}
                onClose={handleClose}
                id={actual2.id}
                title={actual2.title}
                cost={actual2.cost}
                image={actual2.image}
                descripcion={actual2.descripcion}
                categoria={actual2.categoria}
                disponible={actual2.disponible}
                productos={actual2.productos}
                venta={true}
                onOrder={addCarrito}
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
                            title={datos.nombre_entidad}
                            logo={datos.imagen}
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

                            
                            {(combo.length == 0) && (
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
                                return (filtrar(item, true) && (item.disponible == 1)) ?
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
                                return (filtrar(item, true) && (item.disponible == 1)) ?
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
