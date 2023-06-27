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

export const ProductCard3 = (props) => {

    const {image, id, title, cantidad, cost} = props;

    const [cantidad_, setCantidad] = useState(0)

    useEffect(() => {
        setCantidad(cantidad)
    },[])


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
                    x{cantidad}
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
