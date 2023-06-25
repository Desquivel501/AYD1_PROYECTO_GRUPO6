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

export default function FinalizarCompra() {

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
                        <MenuDatos 
                            title={"Datos de facturación"}
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

                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}