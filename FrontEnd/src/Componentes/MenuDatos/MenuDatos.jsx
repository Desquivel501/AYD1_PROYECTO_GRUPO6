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
import { json } from "react-router-dom";
import { gridColumnGroupsLookupSelector } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

export const MenuDatos = (props) => {

    const { user } = useSesion();

    const navigate = useNavigate();

    const [metodo, setMetodo] = useState("tarjeta")
    
    const [direccion, setDireccion] = useState("")

    const [comentario, setComentario] = useState("")

    const [direcciones, setDirecciones] = useState([
        {
            id: 0,
            name: "Casa",
            direccion: "4ta calle 3-56, Residenciales El Jaguar",
        }
    ])

    const [tarjetas, setTarjetas] = useState([
        {
            id: 0,
            alias: "",
            name: "",
            cc: 0,
            date: "",
            cvv: 0
        }
    ])

    const [cupones, setCupones] = useState([
        {
            id:0,
            alias: "",
            descuento: 0
        }
    ])  

    const [pedido, setPedido] = useState({
        restaurante: null,
        departamento: null,
        productos: [],
        usuario: user.id
    })

    const [actual, setActual] = useState("")

    const [actualCC, setActualCC] = useState("")

    const [cupon, setCupon] = useState("No Usar")

    const [nameCC, setNameCC] = useState("")
    const [cc, setCC] = useState(0)
    const [date, setDate] = useState("")
    const [cvv, setCVV] = useState(0)

    const [saveAdd, setSaveAdd] = useState(false)
    const [alias, setAlias] = useState("")
    const [saveCC, setSaveCC] = useState(false)
    const [aliasCC, setAliasCC] = useState("")


    const [total, setTotal] = useState(0)

    const [vencida, setVencida] = useState(true) 

    function handleDateChange(e, date){
        var date = new Date(e);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const withSlashes = [month, year].join('/');
        setDate(withSlashes)

        var today = new Date();
        if(year < today.getFullYear()){
            setVencida(true)
        } else if(year == today.getFullYear()){
            if(month < today.getMonth()){
                setVencida(true)
            } else {
                setVencida(false)
            }
        } else {
            setVencida(false)
        }

    }

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

    // useEffect(() => {
    //     console.log(vencimiento)
    // },[vencimiento])

    useEffect(() => {

        fetch("http://localhost:3000/obtenerTarjetas", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                correo: user.id,
            })
        })
        .then(res => res.json())
        .then(response =>{
            console.log(response)
            setTarjetas(response)
        })

        fetch("http://localhost:3000/obtenerDirecciones", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
          credentials: "include",
            body: JSON.stringify({
                correo: user.id,
            })
        })
        .then(res => res.json())
        .then(response =>{
            console.log(response)
            setDirecciones(response)
        })

        fetch("http://localhost:3000/obtenerCupones", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
          credentials: "include",
            body: JSON.stringify({
                correo: user.id,
            })
        })
        .then(res => res.json())
        .then(response =>{
            console.log(response)
            setCupones(response)
        })


        var carrito = window.sessionStorage.getItem("carrito");
        if(carrito != null || carrito != undefined){
            carrito = JSON.parse(carrito)
            setPedido(carrito)

            var total_ = 0
            for(var i = 0; i < carrito.productos.length; i++){
                total_ += carrito.productos[i].cantidad * carrito.productos[i].costo
            }
            setTotal(total_)

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: 'No se puede procesar un pedido sin productos',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/Empresas")
                }
            })
        }

        
    },[])

    useEffect(() => {

        var total_ = 0
        for(var i = 0; i < pedido.productos.length; i++){
            total_ += pedido.productos[i].cantidad * pedido.productos[i].costo
        }

        if(cupon == "No Usar"){
            setTotal(total_)
            return
        }   

        for(var i = 0; i<cupones.length; i++){
            if(cupon == cupones[i].alias){
                setTotal(total_ - (total_*cupones[i].descuento))
                break
            }
        }
    },[cupon])



    const handleSubmit = (event) => {

        console.log(pedido.productos.length)
        

        if(pedido.productos.length == 0){
            Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: 'No se puede procesar un pedido sin productos',
            }).then((result) => {
                if (result.isConfirmed) {
                    return
                }
            })
        }

        if(direccion == ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "No se ha ingresado una direccion",
            })
            return
        }

        var cambio_dir = false
        var id_dir = 0
        for(var i = 0; i < direcciones.length; i++){
            if(direcciones[i].name == actual){
                id_dir = direcciones[i].id
                if(direcciones[i].direccion != direccion){
                    cambio_dir = true
                }
                break
            }
        }

        if(saveAdd && alias == ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "No se ha ingresado un alias con el que guardar la direccion",
            })
            return
        }

        if(cambio_dir == true || saveAdd){
            
            fetch("http://localhost:3000/guardarDireccion", {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    correo: saveAdd ? user.id : null,
                    alias: saveAdd ? alias : null,
                    direccion: direccion
                })
            })
            .then(res => res.json())
            .then(response =>{
                console.log(response[0][0])
                    
                if(response[0][0].TIPO != "EXITO"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                        text: response[0][0].MENSAJE,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            return
                        }
                    })
                } else {
                    id_dir = response[0][0].MENSAJE
                }
            })
        }

        if(metodo == "tarjeta"){
            var cambio_tar = false
            var id_tar = 0
            for(var i = 0; i < direcciones.length; i++){
                if(tarjetas[i].alias == actualCC){
                    id_tar = tarjetas[i].id
                    if(tarjetas[i].cc != cc && tarjetas[i].name == nameCC){
                        cambio_tar = true
                    }
                    break
                }
            }

            if(nameCC == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "No se ha ingresado el nombre en la tarjeta de credito",
                })
                return
            }

            const cc_pattern = /^\d{16}$/g
            if(!cc_pattern.test(cc)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Tarjeta de credito no es valida",
                })
                return
            }

            const cvv_pattern = /^\d{3}$/g
            if(!cvv_pattern.test(cvv)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "CVV no es valido",
                })
                return
            }

            if(vencida){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "La tarjeta de credito ingresada ya expiró",
                })
                return
            }

            if(saveCC && aliasCC == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "No se ha ingresado un alias con el que guardar la tarjeta",
                })
                return
            }

            if(cambio_tar == true || saveCC){
                fetch("http://localhost:3000/guardarTarjeta", {
                    method: "POST",
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        correo: saveCC ? user.id : null,
                        alias: saveCC ? aliasCC : null,
                        name: nameCC,
                        cc: cc,
                        vencimiento: date,
                        cvv: cvv
                    })
                })
                .then(res => res.json())
                .then(response =>{
                    console.log(response[0][0])
                        
                    if(response[0][0].TIPO != "EXITO"){
                        Swal.fire({
                            icon: 'error',
                            title: 'Ha ocurrido un error',
                            text: response[0][0].MENSAJE,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                return
                            }
                        })
                    } else {
                        id_tar = response[0][0].MENSAJE
                    }
                })
            }
        }

        var json = {
            "departamento": pedido.departamento,
            "restaurante": pedido.restaurante,
            "usuario": pedido.usuario,
            "productos": []
        }


        for(var i = 0; i < pedido.productos.length; i++){
            json.productos.push({
                "id": pedido.productos[i].id,
                "cantidad": pedido.productos[i].cantidad,
                "combo": pedido.productos[i].tipo == "producto" ? false : true,
                "costo": pedido.productos[i].costo,
                "subtotal": pedido.productos[i].costo*pedido.productos[i].cantidad
            })
        }

        json["direccion"] = id_dir
        json["forma_pago"] = (metodo == "tarjeta") ? id_tar : 0
        json["descripcion"] = comentario

        var id_cupon = 0
        var descuento = 0
        for(var i = 0; i < cupones.length; i++){
            if(cupon == cupones[i].alias){
                id_cupon = cupones[i].id
                descuento = cupones[i].descuento
                break
            }
        }

        console.log(cupon + ":  " + id_cupon)

        json["cupon"] = (cupon != "No Usar") ? id_cupon : 0


        var total_ = 0
        for(var i = 0; i < pedido.productos.length; i++){
            total_ += pedido.productos[i].cantidad * pedido.productos[i].costo
        }


        if(cupon == "No Usar"){
            json["total"] = total_
        } else {
            json["total"] = total_ - (total_ * descuento)
        }

        console.log(json)

        fetch("http://localhost:3000/crearPedido", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
          credentials: "include",
            body: JSON.stringify(json)
        })
        .then(res => res.json())
        .then(response =>{
            console.log(response)                
            if(response.TIPO != "EXITO"){
                Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    text: response.MENSAJE,
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Pedido Registrado',
                    text: response.MENSAJE,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.sessionStorage.removeItem("carrito");
                        navigate("/Empresas")
                    }
                })
            }
        })

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
                    Datos de facturación
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
                            {/* <Divider variant="middle" sx={{my:1, width:'90%'}}/> */}

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
                                                name="test"
                                                views={['month', 'year']}
                                                format={"MM/YY"}
                                                // value={vencimiento}
                                                defaultDate={new Date()}
                                                // onChange={handleDateChange}
                                                onChange={(e, event) => handleDateChange(e,event)}
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
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={6.1}
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
                            rows={3}
                            value={comentario}
                            onChange={(event) => setComentario(event.target.value)}
                        />              

                    </Grid>

                    <Grid
                        item
                        xs={6.1}
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
                                Aplicar Cupon:
                            </Typography>
                        </Grid>

                        <FormControl fullWidth margin="normal" >
                            <InputLabel id="licencia">Mis Cupones</InputLabel>
                            <Select
                                labelId="address_select_label"
                                id="address_select"
                                defaultValue=""
                                label="Mis Cupones"
                                name="address_select"
                                value={cupon}
                                onChange={(event) => setCupon(event.target.value)}
                            >
                                {cupones.map((item, i) => (
                                    <MenuItem value={item.alias} key={i}>{item.alias} &gt; {item.descuento*100}% de descuento</MenuItem>
                                ))}
                                <MenuItem value="No Usar" key="No Usar">-- No Usar --</MenuItem>
                            </Select>
                        </FormControl>



                    </Grid>
                </Grid>
                
            </Box> 

            <Grid
                item
                xs={12}
                sx={{border:0, mt:2}}
            >
                <Typography variant="h6" component="h6" align='center' 
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: '#973f1c',
                    }}>
                    Total: ${total.toFixed(2)}
                </Typography>
            </Grid>       

            <Grid
                item
                xs={12}
                sx={{border:0}}
            >
                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
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
