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
import { useSesion } from "../../hooks/useSesion";
import Swal from 'sweetalert2'

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


    const eliminar = (event) => {
        fetch("http://localhost:3000/EliminarProducto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo: user.id, producto: id }),
        })
            .then((res) => res.json())
            .then(response =>{
                console.log(response)
                if(response[0].TIPO == "EXITO"){
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: response[0].MENSAJE,
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(false);
                        }
                      })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response[0].MENSAJE,
                      })
                }
            })
            .catch((err) => console.log(err));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        data.append("empresa", user.id)
        data.append("disponible", disponible_)

        if(edicion){
            data.append("id", id)
        }

        console.log(data)

        fetch("http://localhost:3000/" + (edicion ? "EditarProducto":"CrearProducto"), {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then(response =>{
                console.log(response)
                
                if(response[0].TIPO == "EXITO"){
                    Swal.fire({
                        icon: 'success',
                        title: (edicion ? "Editado!":"Creado!"),
                        text: response[0].MENSAJE,
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(false);
                        }
                      })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response[0].MENSAJE,
                      })
                }
            })
            .catch((err) => console.log(err));
      };

    
    useEffect(() => {
        if(name_ != null && count != id){
            setName(name)
            setDesc(desc)
            setCost(cost)
            setCategoria(categoria)
            setDisponible(disponible)
            setCount(id)
            setPreview(image)
        }
    })

    useEffect(() => {
        if (!selectedFile) {
            setPreview(image)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])


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

            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >

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
                   <TextField
                        margin="normal"
                        required
                        fullWidth
                        // disabled
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        value={name_}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
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
                    />


                </Grid>
            </Grid>

           
            <Grid
                item
                xs={12}
                sx={{border:0}}
            >
                <Button
                    variant="contained"
                    type="submit"
                   
                    sx={{ mt: 2, mb: 1, bgcolor: "#2f9d76" }}
                    endIcon={<SaveIcon />}
                >
                    Confirmar Orden
                </Button>
            </Grid>  

            </Box>                


        </Grid>

    );
}
