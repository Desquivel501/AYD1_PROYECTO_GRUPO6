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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TablaPedidos } from '../../Componentes/TablaPedidos/TablaPedidos';

const columns = [
    { id: 'restaurante', label: 'Restaurante', minWidth: 100 },
    { id: 'repartidor', label: 'Repartidor', minWidth: 100 },
    { id: 'direccion', label: 'Dirección', minWidth: 100 },
    { id: 'costo', label: 'Costo', minWidth: 100, format: (value) => value.toFixed(2) },
    { id: 'fecha', label: 'Fecha', minWidth: 100 },
    { id: 'estado', label: 'Estado', minWidth: 100 },
  ];

  function createData(id, restaurante, repartidor, direccion, costo, fecha, estado) {
    return { id, restaurante, repartidor, direccion, costo, fecha, estado };
  }
  
  const rows = [
    createData(1,"KFC","Michael Davis", "159 Cherry St",7.97,"12/17/2022", "Pendiente"),
    createData(2,"Chipotle","Rachel Martinez","456 Elm St",9.94,"3/12/2023", "Pendiente"),
    createData(3,"Panera Bread","Kevin Wilson","Anytown",6.26,"5/14/2023", "En Camino"),
    createData(4,"Burger King","Michael Davis","456 Elm St",9.15,"2/26/2023", "Entregado"),
    createData(5,"Dunkin' Donuts","Brian Clark","USA 12345",7.35,"10/9/2022", "En Camino"),
    createData(6,"KFC","Amanda Taylor","USA 12345",2.80,"10/27/2022", "Pendiente"),
    createData(7,"KFC","Kevin White","456 Elm St",12.50,"6/27/2022", "En Cocina"),
    createData(9,"McDonald's","David Lee","Anytown",4.95,"11/16/2022", "Terminado"),
    createData(10,"Subway","John Smith","789 Oak St",9.52,"12/16/2022", "Entregado"),
  ];
  

export default function PedidosUsuario() {

    const { user } = useSesion();
    
    const [pedidos, setPedidos] = useState([])


    useEffect(() => {
        // var carrito = window.sessionStorage.getItem("carrito");
        // if(carrito != null || carrito != undefined){
        //     carrito = JSON.parse(carrito)
        //     setPedido(carrito)
        // } 

        fetch("http://localhost:3000/pedidosCliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
          credentials: "include",
            body: JSON.stringify({ correo: user.id }),
        })
        .then(res => res.json())
        .then(response =>{
            // setCatalogo(response)
            console.log(response)
            setPedidos(response)
        })
    },[])


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
                            Tus Pedidos
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12} sm={12}
                        sx={{border:0}}
                    >
                        <TablaPedidos
                            rows={pedidos}
                            columns={columns}
                        />

                    </Grid>

                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}
