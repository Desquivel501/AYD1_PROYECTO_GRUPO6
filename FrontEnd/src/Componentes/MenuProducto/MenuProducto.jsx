import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { useEffect } from "react";

export const MenuProducto = (props) => {
    
    const {title, id, name, desc, cost, image, categoria, disponible, addCategorias, edicion, addComp} = props;

    const [name_, setName] = useState("")
    const [desc_, setDesc] = useState("")
    const [cost_, setCost] = useState("")
    const [categoria_, setCategoria] = useState("PlatosFuertes")
    const [disponible_, setDisponible] = useState(false)

    const [count, setCount] = useState(0);


    function enviar() {

        const jsonData = {
            "id": id,
            "name": name_,
            "description": desc_,
            "cost": cost_,
            "image": "",
            "categoria": categoria_,
            "disponible": disponible_
        }

        fetch("http://localhost:3000/" + (edicion ? "editar":"crear"), {
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
            setCategoria(categoria)
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
            sx={{ border:0, p:5 }}
            component={Paper}
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
                        xs={6}
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
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={4}
                        sx={{border:0, p:1}}
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
                                sx={{border:0}}
                            >
                                <Box
                                    component="img"
                                    sx={{
                                    height: 'auto', maxWidth: '80%', mt:2, 
                                    }}
                                    alt="Image"
                                    src={image}
                                />

                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{border:0}}
                            >
                                <Button
                                    variant="contained"
                                    sx={{ mt: 1, mb: 1, bgcolor: "#F2890D" }}
                                >
                                    Cambiar Imagen
                                </Button>
                            </Grid>

                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Disponible" checked={disponible_} onChange={(event) => setDisponible(!disponible_)}/>
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {addCategorias &&
                <Grid
                    item
                    xs={12}
                    sx={{border:0}}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{ border:0, mt:1 }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{border:0, display: 'flex'}}
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                        <Typography variant="h5" component="h5" align='center' 
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: '#973f1c',
                                }}>
                                Categorias
                            </Typography>

                        </Grid>

                    
                            <Grid
                                item
                                xs={12}
                                sx={{border:0, mt:1}}
                            >
                                <FormControl>
                                    <RadioGroup
                                        row
                                        name="button-group"
                                        // defaultValue="Postres"
                                        value={categoria_}
                                        onChange={(event) => setCategoria(event.target.value)}
                                    >
                                        <FormControlLabel value="Entradas" control={<Radio  />} label="Entradas"/>
                                        <FormControlLabel value="PlatosFuertes" control={<Radio  />} label="Platos Fuertes" />
                                        <FormControlLabel value="Postres" control={<Radio  />} label="Postres" />
                                        <FormControlLabel value="Bebidas" control={<Radio  />} label="Bebidas" />
                                        <FormControlLabel value="Ninos" control={<Radio  />} label="Niños"/>

                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        
        

                    </Grid>

                </Grid>
            }

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
                    Guardar Producto
                </Button>



            </Grid>                  


        </Grid>

    );
}
