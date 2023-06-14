import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { ButtonGroup, Typography, Box, Container, Grid, Button } from '@mui/material';
import Paper from "@mui/material/Paper";

export const ListadoProductos = (props) => {

    const {image, title, cost, descripcion} = props;

  const theme = useTheme();

  return (
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ border:0, pt:5 }}
        component={Paper}
        elevation={6}
    >
        <Grid
            item
            xs={12} sm={6}
            sx={{border:0, mb:2}}
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
            container
            sx={{border:0, pt:2, maxHeight: '55vh', overflow: 'auto'}}
            alignItems="left"
            justifyContent="center"
        > 
            {Productos.map((producto, i) => (
                <ProductCard 
                    key={i}
                    title={producto.title}
                    cost={producto.cost}
                    image={producto.image}
                    descripcion={producto.descripcion}
                />
            ))}

        </Grid>
    </Grid>
    
  );
}