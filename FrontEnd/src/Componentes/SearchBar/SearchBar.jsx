import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import { useState } from "react";

export default function SearchBar(props) {

    const {onSearch} = props;

    const [value, setValue] = useState("")

    const handleSearch = () => {
        onSearch(value);            
    }

    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', alignItems: 'center', display: 'flex', width: '80%', border:0 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Buscar Producto"
                inputProps={{ 'aria-label': 'buscar producto' }}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}