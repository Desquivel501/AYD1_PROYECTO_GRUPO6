import { DataGrid } from "@mui/x-data-grid";
import mock from "../../mocks/usuarios.json";
import { Box, Button, Grid, Paper, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import { getData, postData } from "../../api/auth";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ColumnChart } from "../../Componentes/Charts/ColumnChart";
import { MenuProducto } from "../../Componentes/MenuProducto/MenuProducto";
import { useSesion } from "../../hooks/useSesion";
import CssBaseline from "@mui/material/CssBaseline";
import { TitleCard } from "../../Componentes/TitleCard/TitleCard";

export function TopProductos() {

  const { user } = useSesion();

  const [datos, setDatos] = useState({
        title: "",
        image: ""
    })

  const [producto, setProducto] = useState({
    nombre: "",
    imagen:"",
    precio:0,
    ventas:0,
    combo:0,
    id:0,
    descripcion: ""
  });

  useEffect(() => {
    var endpoint = "topProductoEmpresa";
    const data = {
        correo: user.id
    }
    postData({ endpoint, data })
        .then((data) => {
            console.log(data)
            setProducto(data[0][0])
        })
        .catch((e) => console.log(e));


    endpoint = "ObtenerDatosEmpresa";
    postData({ endpoint, data })
      .then((data) => {
            setDatos({
                title: data[0].nombre_entidad,
                image: data[0].imagen
            })
        })
        .catch((e) => console.log(e));
  
  }, []);

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
            alignItems="center"
            justifyContent="center"
        >
            <Container maxWidth="xl">
                
                <Grid
                    container
                    spacing={3}
                    sx={{ width: "80vw", pt: 6 }}
                    alignItems="left"
                    justifyContent="center"
                > 

                    {/* <Grid
                        item
                        xs={12}
                    >
                        <TitleCard 
                            title={datos.title}
                            logo={datos.image}
                        />
                    </Grid> */}

                    <Grid
                        item
                        xs={12} sm={6}
                    >
                        <MenuProducto
                            addCategorias={true}
                            reporte={false}
                            title={"Producto mas vendido"}
                            id={producto.id}
                            name={producto.nombre}
                            desc={producto.descripcion}
                            cost={producto.precio}
                            image={producto.imagen}
                            ventas={producto.ventas}
                            categoria={producto.categoria}
                            edicion={false}
                        />
                    </Grid>
        
                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}



//   return (

//     <Grid
//         container
//         direction="row"
//         justifyContent="center"
//         alignItems="flex-start"
//         sx={{ border:0, p:5 }}
//         component={Paper}
//         elevation={6}
//     >
//         <Grid
//             item
//             xs={12}
//             sx={{border:0}}
//         >
            // <MenuProducto
            //     addCategorias={false}
            //     title={"Producto mas vendido"}
            //     id={producto.id}
            //     desc={producto.descripcion}
            //     cost={producto.precio}
            //     image={producto.imagen}
            // />
//         </Grid>
//     </Grid>
//   );
// }
