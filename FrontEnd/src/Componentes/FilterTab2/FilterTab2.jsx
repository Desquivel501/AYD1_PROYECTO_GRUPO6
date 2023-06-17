import * as React from 'react';
import { Typography, Grid } from '@mui/material';
import Paper from "@mui/material/Paper";
import SearchBar from '../SearchBar/SearchBar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { useState } from "react";
import { useEffect } from "react";

export const FilterTab2 = (props) => {

    const {onChange} = props;
    
    const [categoria, setCategoria] = useState([])
    const [actual, setActual] = useState([])
    const [search, setSearch] = useState("")


    const changeCategory = (event) => {
             
        
        var found = false
        for (var i = 0; i < actual.length; i++){   
            if(actual[i] == event.target.id){
                found = true
                actual.splice(i, 1)
                break;
            } 
        }
        if(!found){
            actual.push(event.target.id)
        }

        onChange(
            {
                keyword: search,
                categorias: actual
            }
        )
    }

    const handlePress = (text) => {
        setSearch(text)
        onChange(
            {
                keyword: text,
                categorias: categoria
            }
        )
    }


    useEffect(() => {
        fetch("http://localhost:3000/GetRestaurantes", {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin_Origin': '*'
            }
        })
        .then(res => res.json())
        .then(response =>{
            setCategoria(response.categorias)
        })
    }, [])

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
                sx={{border:0, pt:5}}
                component={Paper}
                elevation={6}
            >

                <SearchBar onSearch={handlePress}/>

                <Divider variant="middle" sx={{my:2, width:'90%'}}/>

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

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ border:0, pt:1, mb:2, maxHeight: '70vh', overflow: 'auto'}}
                >
                    
                    

                    <FormGroup >                        
                        {categoria.map((item, i) => (
                            <FormControlLabel key={i} control={<Checkbox onChange={changeCategory} id={item.categoria} sx={checkColor}/>} label={item.categoria}/>
                        ))}
                    </FormGroup>

                </Grid>


            </Grid>
        </Grid>
        
    );
}