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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { useEffect } from "react";
import { useSesion } from "../../hooks/useSesion";
import Swal from 'sweetalert2'
import { DireccionEnRegistro } from "../Direccion";
import Divider from '@mui/material/Divider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const MenuDatos = (props) => {
    const { user } = useSesion();

    const {title, id, name, desc, cost, image, categoria, disponible, addCategorias, edicion, addComp} = props;

    const [name_, setName] = useState("")
    const [desc_, setDesc] = useState("")
    const [cost_, setCost] = useState("")
    const [categoria_, setCategoria] = useState("Platos Fuertes")
    const [disponible_, setDisponible] = useState(false)

    const [count, setCount] = useState(0);

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [metodo, setMetodo] = useState("tarjeta")
    const [comentario, setComentario] = useState("")
    
    const [direccion, setDireccion] = useState("")

    const [direcciones, setDirecciones] = useState([
        {
            name: "Casa",
            direccion: "4ta calle 3-56, Residenciales El Jaguar",
            departamento: "Guatemala",
            municipio: "Guatemala City",
            zona:1
        },
        {
            name: "Trabajo",
            direccion: "2da avenida 6-17, Colonia El Amanecer",
            departamento: "Guatemala",
            municipio: "Mixco",
            zona:3
        },
        {
            name: "Suegrita",
            direccion: "10ma calle 2-12",
            departamento: "Alta Verapaz",
            municipio: "Cobán",
            zona:6
        }
    ])

    const [tarjetas, setTarjetas] = useState([
        {
            alias: "Tarjeta Banrural",
            name: "Joao Madukwe",
            cc: 4057912954290102,
            date: "08/2023",
            cvv: 362
        },
        {
            alias: "Tarjeta Ficohsa",
            name: "Robin Aliyev",
            cc: 4057935092851592,
            date: "01/2024",
            cvv: 562
        },
        {
            alias: "Tarjeta BI",
            name: "Paladin Torath",
            cc: 4057921903144336,
            date: "11/2026",
            cvv: 928
        }
    ])

    const [actual, setActual] = useState("")

    const [actualCC, setActualCC] = useState("")

    // const [tarjeta, setTarjeta] = useState({
    //     alias: "",
    //     name: "",
    //     cc: 0,
    //     date: "",
    //     cvv: 0
    // })

    const [nameCC, setNameCC] = useState("")
    const [cc, setCC] = useState(0)
    const [date, setDate] = useState("")
    const [cvv, setCVV] = useState(0)

    const [saveAdd, setSaveAdd] = useState(false)
    const [alias, setAlias] = useState("")
    const [saveCC, setSaveCC] = useState(false)
    const [aliasCC, setAliasCC] = useState("")

    const llenarDireccion = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        for(var i = 0; i < direcciones.length; i++){
            if(direcciones[i].name == actual){
                setDireccion(direcciones[i].direccion)
            }
        }
    },[actual])

    useEffect(() => {
        for(var i = 0; i < tarjetas.length; i++){
            if(tarjetas[i].alias == actualCC){
                setNameCC(tarjetas[i].name)
                setCC(tarjetas[i].cc)
            }
        }
    },[actualCC])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(image)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    return (

        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{ border:0, px:4, py:3, mb:5 }}
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

            <Box
                component="form"
                // onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 2}}
            >

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{ border:0}}
                    spacing={3}
                >

                    <Grid
                        item
                        xs={6.1}
                        sx={{border:0}}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="left"
                            alignItems="center"
                            sx={{border:0}}
                        >
                            <Grid
                                item
                                xs={12}
                                sx={{border:0, mt:0.5}}
                            >
                                <Typography variant="h6" component="h6" align='left' 
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: '#973f1c',
                                    }}>
                                    Dirección:
                                </Typography>
                            </Grid>

                            <FormControl fullWidth margin="normal" >
                                <InputLabel id="licencia">Direcciones Guardadas</InputLabel>
                                <Select
                                    labelId="address_select_label"
                                    id="address_select"
                                    defaultValue=""
                                    label="Direcciones Guardadas"
                                    name="address_select"
                                    value={actual}
                                    onChange={(event) => setActual(event.target.value)}
                                >
                                    {direcciones.map((item, i) => (
                                        <MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Grid
                                item
                                xs={12}
                                sx={{border:0, my:-1}}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    // disabled
                                    id="direccion"
                                    label="Dirección"
                                    name="direccion"
                                    value={direccion}
                                    onChange={(event) => setDireccion(event.target.value)}
                                />

                            </Grid>

                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Guardar para despues" checked={saveAdd} onChange={(event) => setSaveAdd(!saveAdd)}/>
                            </FormGroup> 

                            {   saveAdd &&
                                <Grid
                                    item
                                    xs={12}
                                    sx={{border:0, my:-1}}
                                >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        // disabled
                                        id="alias"
                                        label="Alias"
                                        name="alias"
                                        value={alias}
                                        onChange={(event) => setAlias(event.target.value)}
                                    />

                                </Grid>
                            }


                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={6.1}
                        sx={{border:0}}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="left"
                            alignItems="center"
                            sx={{border:0}}
                        >

                            <Grid
                                item
                                xs={12}
                                sx={{border:0, mt:0.5}}
                            >
                                <Typography variant="h6" component="h6" align='left' 
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: '#973f1c',
                                    }}>
                                    Detalles de Pago:
                                </Typography>
                            </Grid>

                            <FormControl fullWidth margin="normal" >
                                <InputLabel id="licencia">Método de Pago</InputLabel>
                                <Select
                                    labelId="metodo_pago_label"
                                    id="metodo_pago"
                                    defaultValue=""
                                    label="Método de Pago"
                                    name="metodo_pago"
                                    value={metodo}
                                    onChange={(event) => setMetodo(event.target.value)}
                                >
                                    <MenuItem defaultChecked value="tarjeta" key="A">Tarjeta</MenuItem>
                                    <MenuItem value="efectivo" key="B">Efectivo</MenuItem>
                                </Select>
                            </FormControl>

                            

                            { metodo == "tarjeta" &&
                                <>  
                                    <FormControl fullWidth margin="normal" >
                                        <InputLabel id="licencia">Tarjetas Guardadas</InputLabel>
                                        <Select
                                            labelId="address_select_label"
                                            id="address_select"
                                            defaultValue=""
                                            label="Direcciones Guardadas"
                                            name="address_select"
                                            value={actualCC}
                                            onChange={(event) => setActualCC(event.target.value)}
                                        >
                                            {tarjetas.map((item, i) => (
                                                <MenuItem value={item.alias} key={item.alias}>{item.alias}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{border:0}}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            // disabled
                                            id="cc_name"
                                            label="Nombre en la tarjeta"
                                            name="cc_name"
                                            value={nameCC}
                                            onChange={(event) => setNameCC(event.target.value)}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sx={{border:0}}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            // disabled
                                            id="cc_number"
                                            label="Numero en la tarjeta"
                                            name="cc_number"
                                            value={cc}
                                            onChange={(event) => setCC(event.target.value)}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={4}
                                        sx={{border:0, mt:1, mr:1, width:"100%"}}
                                    >   
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker 
                                                label={'Vencimiento'} 
                                                views={['month', 'year']}
                                                format={"MM/YY"}
                                            />
                                        </LocalizationProvider>
                                        
                
                                    </Grid>

                                    <Grid
                                        item
                                        xs={4}
                                        sx={{border:0}}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            // disabled
                                            id="cvv"
                                            label="CVV"
                                            name="cvv"
                                            value={cvv}
                                            onChange={(event) => setCVV(event.target.value)}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={4}
                                        sx={{border:0}}
                                    >
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox />} label="Guardar para despues" checked={saveCC} onChange={(event) => setSaveCC(!saveCC)}/>
                                        </FormGroup> 
                                    </Grid>


                                    

                                    {   saveCC &&
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{border:0, my:-1}}
                                        >
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                // disabled
                                                id="alias_cc"
                                                label="Alias"
                                                name="alias_cc"
                                                value={aliasCC}
                                                onChange={(event) => setAliasCC(event.target.value)}
                                            />

                                        </Grid>
                                    }

                                    
                                    
                                </>

                            }

                            {/* <Divider variant="middle" sx={{my:1, width:'90%'}}/>

                            <Grid
                                item
                                xs={12}
                                sx={{border:0, mr:2}}
                                alignContent="left"
                            >
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Guardar datos" checked={guardar} onChange={(event) => setGuardar(!guardar)}/>
                                </FormGroup> 
                                
                            </Grid> */}

                            


                            {/* <Grid
                                item
                                xs={12}
                                sx={{border:0, mt:0.5}}
                            >
                                <Typography variant="h6" component="h6" align='left' 
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: '#973f1c',
                                    }}>
                                    Comentario:
                                </Typography>
                            </Grid>

                            <TextField
                                margin="normal"
                                fullWidth
                                id="comentario"
                                label="Comentario:"
                                multiline
                                name="comentario"
                                rows={2}
                                value={comentario}
                                onChange={(event) => setComentario(event.target.value)}
                            /> */}



                            {/* <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="costo"
                                label="Costo"
                                type="number"
                                id="costo"
                                autoComplete="costo"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={cost_}
                                onChange={(event) => setCost(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="descripcion"
                                label="Descripción"
                                multiline
                                name="descripcion"
                                rows={3}
                                value={desc_}
                                onChange={(event) => setDesc(event.target.value)}
                            /> */}


                        </Grid>
                    </Grid>
                </Grid>
            </Box>  

            <Grid
                item
                xs={12}
                sx={{border:0}}
            >
                <Button
                    variant="contained"
                    type="submit"
                
                    sx={{ 
                        mt: 2, mb: 1,
                        bgcolor: "#2f9d76",
                        fontSize: '1.5rem',
                        color: '#fff',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        '&:hover': {
                            backgroundColor: '#206d52',
                        } 
                    }}
                    endIcon={<SaveIcon />}
                >
                    Confirmar Orden
                </Button>
            </Grid>                


        </Grid>

    );
}
