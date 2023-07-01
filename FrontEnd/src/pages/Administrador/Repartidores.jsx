import { Box } from "@mui/material";
import "./solicitudes.css";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../../api/auth";
import "./usuarios.css";
import { ColumnChart } from "../../Componentes/Charts/ColumnChart";


export function Repartidores() {
  const [repartidores, setRepartidores] = useState({
    'labels':[],
    'values':[
      {
        data: []
      }
    ]
  });

  useEffect(() => {
    var endpoint = "topMejoresRepartidores";
    getData({ endpoint })
        .then((data) => {
      
        const temp_labels = data[0].slice(0,5).map(item => (item.nombre + " " + item.apellidos))
        const temp_values = data[0].slice(0,5).map(item => item.estrellas)

        setRepartidores({
          'labels':temp_labels,
          'values':[
            {
              data: temp_values
            }
          ]
        })

      })
      .catch((e) => console.log(e));
  
  }, []);

  return (

    <Box
      display="flex"
      flexDirection="column"
      sx={{
          flexGrow: 1,
          pb: 4,
          pt: 10
      }}
    >
      <h1>Reportes de Repartidores</h1>
      <section className="panel-usuarios">
          <ColumnChart
            title={"Top 5 de los mejores deliverys"}
            graph={repartidores}
            sx={{
              width:'40vw'
            }}
          />
      </section>
  </Box>
  );
}
