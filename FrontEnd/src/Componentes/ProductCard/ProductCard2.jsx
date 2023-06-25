import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, Box, Grid } from '@mui/material';
import Paper from "@mui/material/Paper";
import Divider from '@mui/material/Divider';
import UpdateIcon from '@mui/icons-material/Update';
import CachedIcon from '@mui/icons-material/Cached';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

export const ProductCard2 = (props) => {

    const {image, id, title, cantidad, cost, onSelect, onUpdate, onRemove} = props;

    const [cantidad_, setCantidad] = useState(0)

    useEffect(() => {
        setCantidad(cantidad)
    },[])
    

    const handleRemove = () => {
        onRemove(id);            
    }

    const handleUpdate = () => {
        onUpdate(id, cantidad_);            
    }

  const theme = useTheme();

  return (
    <Grid
        item
        xs={11.5}
        sx={{borderBottom:1, my:0, mx:0, borderColor:"#e5e5e5"

        }}
        // component={Paper}
        // elevation={6}
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
                xs={0.75}
                sx={{border:0}}
            >
                <Box
                    component="img"
                    sx={{
                    height: 'auto', maxWidth: '80%', mt:2
                    }}
                    alt="Logo"
                    src={image}
                />

            </Grid>
            <Divider orientation="vertical" flexItem sx={{mx:1, my:1}}/>
            <Grid
                item
                xs={4.5}
                sx={{border:0}}
            >
                <Typography variant="h6" component="h6" align='left' 
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: '#000',
                    }}>
                    {title}
                </Typography>
            </Grid>
        
            <Divider orientation="vertical" flexItem sx={{mx:1, my:1}}/>

            <Grid
                item
                xs={2.25}
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
                        xs={4}
                        sx={{border:0, mr:1}}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="cantidad"
                            id="cantidad"
                            autoComplete="cantidad"
                            InputProps={{ inputProps: { min: 0 } }}
                            value={cantidad_}
                            onChange={(event) => setCantidad(event.target.value)}
                        />

                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{border:0, mr:1, py:1, mt:1,
                            '&:hover': {
                                backgroundColor: '#206d52',
                            }}}
                        bgcolor={'#2f9d76'}
                    >
                        <Tooltip title="Actualizar">
                        <IconButton sx={{ p: 0 }} onClick={handleUpdate}>
                            <CachedIcon sx={{ color: '#fff' }} />
                        </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{border:0, py:1, mt:1,
                            '&:hover': {
                                backgroundColor: '#990000',
                            }}}
                        bgcolor={'#FF0000'}
                    >
                        <Tooltip title="Remover">
                        <IconButton sx={{ p: 0 }} onClick={handleRemove}>
                            <CancelIcon sx={{ color: '#fff' }} />
                        </IconButton>
                        </Tooltip>
                    </Grid>

                </Grid>
                {/* <Typography variant="h6" component="h6" align='left' 
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: '#973f1c',
                    }}>
                    {title}
                </Typography> */}
            </Grid>
            
            <Divider orientation="vertical" flexItem sx={{mx:1, my:1}}/>

            <Grid
                item
                xs={1.5}
                sx={{border:0}}
            >
                <Typography variant="p" component="p" align='center' 
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: '#000'
                    }}>
                    ${cost}
                </Typography>
            </Grid>

            <Divider orientation="vertical" flexItem sx={{mx:1, my:1}}/>

            <Grid
                item
                xs={1.5}
                sx={{border:0}}
            >
                <Typography variant="p" component="p" align='center' 
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: '#000'
                    }}>
                    ${parseFloat(cost)*cantidad}
                </Typography>
            </Grid>


        </Grid>
    </Grid>
    
  );
}
