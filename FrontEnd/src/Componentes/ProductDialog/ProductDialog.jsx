import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const ProductDialog = (props) => {

  const { onClose, selectedValue, open, title, id, name, descripcion, cost, image, categoria, disponible } = props;

  const handleClose = () => {
    // onClose(selectedValue);
    onClose(true);
  };

  const handleListItemClick = (value) => {
    // onClose(value);
    onClose(true)
  };

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
                                component="form"
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
                                    maxRows={3}
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

                            <FormGroup>
                                <FormControlLabel control={<Checkbox disabled/>} label="Disponible" checked={disponible}/>
                            </FormGroup>
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
                                    <FormControlLabel value="PlatosFuertes" control={<Radio  />} label="Platos Fuertes" />
                                    <FormControlLabel value="Postres" control={<Radio  />} label="Postres" />
                                    <FormControlLabel value="Bebidas" control={<Radio  />} label="Bebidas" />
                                    <FormControlLabel value="Ninos" control={<Radio  />} label="Niños"/>

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    
    

                </Grid>

            </Grid>
        </Grid>
    </Dialog>
  );
}
