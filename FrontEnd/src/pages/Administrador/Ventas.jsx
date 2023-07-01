import { DataGrid } from "@mui/x-data-grid";
import mock from "../../mocks/usuarios.json";
import { Box, Button } from "@mui/material";
import "./solicitudes.css";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../../api/auth";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./usuarios.css";
import { ColumnChart } from "../../Componentes/Charts/ColumnChart";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  datagrid:{
    test: {
      headerCell: {
        backgroundColor: '#def2ff',
        color: 'white',
        fontWeight: 'bold',
      },
    }
  }
})

const columns_productos = [
  {
    field: "nombre",
    headerName: "Nombre",
    width: 150,
    sortable: false,
    headerClassName: 'color--header',
  },
  {
    field: "combo",
    headerName: "Tipo",
    width: 150,
    sortable: false,
    headerClassName: 'color--header',
  },
  {
    field: "restaurante",
    headerName: "Restaurante",
    width: 150,
    sortable: false,
    headerClassName: 'color--header',
  },
  {
    field: "ventas",
    headerName: "Ventas",
    width: 110,
    sortable: false,
    headerClassName: 'color--header',
  }
];


export function Ventas() {
  const [usuarios, setUsuarios] = useState(mock);
  const [productos, setProductos] = useState([]);
  const [empresas, setEmpresas] = useState({
    'labels':[],
    'values':[
      {
        data: []
      }
    ]
  });

  const [reporte, setReporte] = useState("Top Empresas");

  useEffect(() => {
    var endpoint = "topPedidosEmpresas";
    getData({ endpoint })
        .then((data) => {
        console.log(data[0])
        // setEmpresas(data[0])
        
        const temp_labels = data[0].slice(0,5).map(item => item.restaurante)
        const temp_values = data[0].slice(0,5).map(item => item.Pedidos)
        // setGraph({'labels':temp_labels,'values':temp_values})

        setEmpresas({
          'labels':temp_labels,
          'values':[
            {
              data: temp_values
            }
          ]
        })

      })
      .catch((e) => console.log(e));
    
    endpoint = "topProductosGlobal";
    getData({ endpoint })
      .then((data) => {
        console.log(data[0])
        setProductos(data[0])
      })
      .catch((e) => console.log(e));
  }, []);

  const handleClick = (e) => {
    setReporte(e.target.innerText);
    document.querySelectorAll("button").forEach((element) => {
      if (element.classList.contains("enable")) {
        element.classList.remove("enable");
      }
    });
    e.target.classList.add("enable");
  };

  const tipo = {
    0: "Producto",
    1: "Combo"
  };


  const filtroProductos = (data) => {
    return data.map((value) => ({
      ...value,
      combo: tipo[value.combo],
    }));
  };


  return (

    <Box
      display="flex"
      flexDirection="column"
      // justifyContent="center"
      // alignItems="center"

      sx={{
          flexGrow: 1,
          pb: 4,
          pt: 10
      }}
    >
      <h1>Reportes de Ventas</h1>
      <div className="tabbed-buttons">
        <button type="button" className="tabbed-button" onClick={handleClick}>
         Top Empresas
        </button>
        <button type="button" className="tabbed-button" onClick={handleClick}>
          Top Productos
        </button>
      </div>

    

    {reporte === "Top Empresas" &&
        <section className="panel-usuarios">
          <ColumnChart
            title={"Top 5 de las empresas que más pedidos generan"}
            graph={empresas}
            sx={{
              width:'40vw'
            }}
          />
        </section>
    }

    {reporte === "Top Productos" &&
        <section className="panel-usuarios">
          <h1>Top productos más vendidos</h1>
          <ThemeProvider theme={theme}>
            <DataGrid
              variant="test"
              rows={filtroProductos(productos)}
              columns={columns_productos}
              className="tabla mensaje"
              getRowId={(row) => (row.id + "_" + row.combo)}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10, 25, 50, 100]}
              disableRowSelectionOnClick
              disableColumnMenu
              sx={{
                '& .color--header': {
                  backgroundColor: '#a1a1a1',
                },
              }}
            />
          </ThemeProvider>
        </section>
    }
  </Box>

  );
}
