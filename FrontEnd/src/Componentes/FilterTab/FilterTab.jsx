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
import SearchBar from '../SearchBar/SearchBar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { useState } from "react";

export const FilterTab = (props) => {

    const {onChange} = props;
    
    const [categoria, setCategoria] = useState([])
    const [search, setSearch] = useState("")

    const changeCataegory = (event) => {
        // console.log(event.target.id)

        var found = false
        for (var i = 0; i < categoria.length; i++){
            if(categoria[i] == event.target.id){
                found = true
                categoria.splice(i, 1)
                break;
            } 
        }
        if(!found){
            categoria.push(event.target.id)
        }

        onChange(
            {
                keyword: search,
                categorias: categoria
            }
        )
    }

    // const handleSelect = () => {
    //     onSelect(id);            
    // }

    const handlePress = (text) => {
        setSearch(text)
        onChange(
            {
                keyword: text,
                categorias: categoria
            }
        )
    }

    const checkColor = {
        color: '#c16d0a',
            '&.Mui-checked': {
            color: '#F2890D',
            }
    }




    return (
        <Grid
            item
            xs={12} sm={3}
            sx={{border:0}}
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ border:0, pt:5 }}
                component={Paper}
                elevation={6}
            >

                <SearchBar onSearch={handlePress}/>

                <Divider variant="middle" sx={{my:2, width:'90%'}}/>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ border:0, pt:1, mb:2}}
                >
                    <Grid
                        item
                        xs={12} sm={12}
                        sx={{border:0, mb:1}}
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
                    

                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked onChange={changeCataegory} id="Entrada" sx={checkColor}/>} label="Entradas" />
                        <FormControlLabel control={<Checkbox defaultChecked onChange={changeCataegory} id="PlatoFuerte" sx={checkColor}/>} label="Platos Fuertes" />
                        <FormControlLabel control={<Checkbox defaultChecked onChange={changeCataegory} id="Bebida" sx={checkColor}/>} label="Bebidas" />
                        <FormControlLabel control={<Checkbox defaultChecked onChange={changeCataegory} id="Postre" sx={checkColor}/>} label="Postres" />
                        <FormControlLabel control={<Checkbox defaultChecked onChange={changeCataegory} id="Ninos" sx={checkColor}/>} label="Niños" />
                        <FormControlLabel control={<Checkbox defaultChecked onChange={changeCataegory} id="Combo" sx={checkColor}/>} label="Combos" />
                    </FormGroup>

                </Grid>


            </Grid>
        </Grid>
        
    );
}