import * as React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { ProductCard } from '../ProductCard/ProductCard';
import Button from "@mui/material/Button";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Divider from '@mui/material/Divider';
import Swal from 'sweetalert2'
import { useState } from "react";

export const ComboDialog = (props) => {

  const { onClose, open, title, descripcion, cost, disponible, productos, venta, onOrder, id } = props;

  const [cantidad, setCantidad] = useState(1);

  const handleClose = () => {
    onClose(true);
  };

  const handleSelect = () => {
    onOrder(id, "combo", cantidad, cost);  
    onClose(true);  
    Swal.fire({
        icon: 'success',
        title: 'Agregado',
        text: `"${title}" agregado al carrito`,
      })        
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>Combo</DialogTitle>
      
      <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{ border:0, p:3}}
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
                                    required
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
                                    required
                                    fullWidth
                                    id="description"
                                    label="Descripción"
                                    multiline
                                    name="description"
                                    rows={3}
                                    value={descripcion}
                                />

                            {!venta && 
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox disabled/>} label="Disponible" checked={(disponible)}/>
                                </FormGroup>
                            }
                            
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        sx={{border:0, p:1}}
                    >
                        <Grid
                            item
                            xs={12} sm={12}
                            justifyContent="center"
                            sx={{border:0}}
                        >
                            <Typography variant="h6" component="h6" align='center' 
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: '#973f1c',
                                }}>
                                Items
                            </Typography>
                        </Grid>
                        

                        <Grid
                            item
                            xs={12} sm={12}
                            justifyContent="center"
                            sx={{border:0, maxHeight: '40vh', overflow: 'auto'}}
                        >
                            {(productos.length == 0) &&
                                <Typography variant="h5" component="h5" align='center' 
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: '#999999',
                                        mb:4
                                    }}>
                                    No hay productos
                                </Typography>
                            }

                            {productos.map((item, i) => (
                                <ProductCard 
                                    key={i}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    addDesc={false}
                                    addCost={false}
                                    size={12}
                                />
                            ))}


                        </Grid>


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
                        xs={3}
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
                        xs={3}
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
