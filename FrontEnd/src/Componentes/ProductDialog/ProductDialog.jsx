import * as React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Divider from '@mui/material/Divider';
import { useState } from "react";
import Swal from 'sweetalert2'

export const ProductDialog = (props) => {

  const { onClose, selectedValue, open, title, id, name, descripcion, cost, image, categoria, disponible, venta, onOrder } = props;

  const [cantidad, setCantidad] = useState(1);

  const handleClose = () => {
    // onClose(selectedValue);
    onClose(true);
  };

  const handleSelect = () => {
    onOrder(id, title, "producto", cantidad, cost, image);   
    onClose(true);
    Swal.fire({
        icon: 'success',
        title: 'Agregado',
        text: `"${title}" agregado al carrito`,
      })
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Producto</DialogTitle>
      
      <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{ border:0, p:3 }}
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
                                
                                noValidate
                                sx={{ mt: 1 }}
                            >
    
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="cost"
                                    label="Costo"
                                    type="number"
                                    id="cost"
                                    autoComplete="costo"
                                    value={cost}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="description"
                                    label="Descripción"
                                    multiline
                                    name="description"
                                    rows={3}
                                    value={descripcion}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        sx={{border:0, p:1}}
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
                            
                            {!venta && 
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox disabled/>} label="Disponible" checked={(disponible)}/>
                                </FormGroup>
                            }
                            
                        </Grid>
                    </Grid>
                </Grid>
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
                            Categoria
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
                                    value={categoria}
                                >
                                    <FormControlLabel value="Entradas" control={<Radio  />} label="Entradas"/>
                                    <FormControlLabel value="Platos Fuertes" control={<Radio  />} label="Platos Fuertes" />
                                    <FormControlLabel value="Postres" control={<Radio  />} label="Postres" />
                                    <FormControlLabel value="Bebidas" control={<Radio  />} label="Bebidas" />
                                    <FormControlLabel value="Niños" control={<Radio  />} label="Niños"/>

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    
    

                </Grid>

            </Grid>

            {venta && 
                
                <Grid
                    container
                    direction="row"
                    justifyContent="right"
                    alignItems="center"
                    sx={{border:0}}
                >
                    <Divider variant="middle" sx={{my:2, width:'90%'}}/>
                    <Grid
                        item
                        xs={4}
                        sx={{border:0, p:1}}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="cantidad"
                            label="Cantidad"
                            type="number"
                            id="cantidad"
                            autoComplete="cantidad"
                            InputProps={{ inputProps: { min: 0 } }}
                            value={cantidad}
                            onChange={(event) => setCantidad(event.target.value)}
                        />
                    </Grid> 

                    <Grid
                        xs={4}
                        sx={{border:0}}
                    >
                        <Box textAlign='center' sx={{border:0}}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mt: 2, mb: 1, bgcolor: "#F2890D" }}
                                endIcon={<AddShoppingCartIcon />}
                                onClick={handleSelect}
                            >
                                Comprar
                            </Button>

                        </Box>
                        
                    </Grid> 

                    

                </Grid>              
            }
        </Grid>
    </Dialog>
  );
}
