import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Departamentos from "../assets/departamentos.js";
import { useState, useEffect } from "react";

export function DireccionEnRegistro() {
  const [departamento, setDepartamento] = useState("Guatemala");
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    console.log(departamento);
    const nuevosMunicipios = Departamentos.find((value) =>
      value.title == departamento
    );
    setMunicipios(nuevosMunicipios.mun);
  }, [departamento]);

  return (
    <>
      <Grid
        item
        xs={4}
        sx={{ pr: 1 }}
        alignItems="center"
        justify="flex-end"
      >
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="departamento">Departamento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            label="Departamento"
            onChange={(e) => setDepartamento(e.target.value)}
            name="Departamento"
          >
            {Departamentos.map((departamento) => (
              <MenuItem
                value={departamento.title}
                key={departamento.title}
              >
                {departamento.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        item
        xs={4}
        sx={{ pr: 1 }}
        alignItems="center"
        justify="flex-end"
      >
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="Municipio">Municipio</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            label="Municipio"
            name="Municipio"
          >
            {municipios.map((muni) => (
              <MenuItem
                value={muni}
                key={muni}
              >
                {muni}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        item
        xs={4}
        alignItems="center"
        justify="flex-end"
      >
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id="zona"
          label="Zona"
          name="zona"
          InputProps={{ inputProps: { min: 0, max: 99 } }}
        />
      </Grid>
    </>
  );
}
