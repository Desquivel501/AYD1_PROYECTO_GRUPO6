import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { useEffect } from "react";

export const MenuCombo = (props) => {
    
    const {title, id, name, desc, cost, disponible, edicion, addComp, productos} = props;

    const [name_, setName] = useState("")
    const [desc_, setDesc] = useState("")
    const [cost_, setCost] = useState("")
    const [categoria_, setCategoria] = useState("PlatosFuertes")
    const [disponible_, setDisponible] = useState(false)

    const [count, setCount] = useState(0);

    function enviar() {

        var listado = []

        for (var i = 0; i < productos.length; i++){
            listado.push(productos[i].id)
        }

        const jsonData = {
            "id": id,
            "name": name_,
            "description":desc_,
            "disponible":disponible_,
            "productos":listado
        }

        fetch("http://localhost:3000/CrearCombo", {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin_Origin': '*'
            },
            body: JSON.stringify(jsonData)
        })
        .then(res => res.json())
        .then(response =>{
          console.log(response)
        })
    }

    useEffect(() => {
        if(name_ != null && count != id){
            setName(name)
            setDesc(desc)
            setCost(cost)
            setDisponible(disponible)
            setCount(id)
        }
      })

    return (

        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{ border:0, m:2 }}
            component={addComp}
            elevation={6}
        >
            <Grid
                item
                xs={12}
                sx={{border:0}}
            >
                <Typography variant="h3" component="h3" align='center' 
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: '#973f1c',
                    }}>
                    {title}
                </Typography>
            </Grid>

            <Grid
                item
                xs={12}
                sx={{border:0}}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{border:0}}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{border:0, p:1}}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{border:0}}
                        >
                            <Box
                                component="form"
                                noValidate
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    // disabled
                                    id="name"
                                    label="Nombre"
                                    name="name"
                                    value={name_}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="cost"
                                    label="Costo"
                                    type="number"
                                    id="cost"
                                    autoComplete="costo"
                                    InputProps={{ inputProps: { min: 0 } }}
                                    value={cost_}
                                    onChange={(event) => setCost(event.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Descripción"
                                    multiline
                                    name="description"
                                    maxRows={3}
                                    rows={3}
                                    value={desc_}
                                    onChange={(event) => setDesc(event.target.value)}
                                />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Disponible" checked={disponible_} onChange={(event) => setDisponible(!disponible_)}/>
                                </FormGroup>
                            </Box>
                        </Grid>
                    </Grid>

                    

                </Grid>
            </Grid>

            

            <Grid
                item
                xs={12}
                sx={{border:0}}
            >
                <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 2, mb: 1, bgcolor: "#F2890D" }}
                    endIcon={<SaveIcon />}
                    onClick={() => enviar()}
                >
                    Guardar Combo
                </Button>



            </Grid>                  


        </Grid>

    );
}
