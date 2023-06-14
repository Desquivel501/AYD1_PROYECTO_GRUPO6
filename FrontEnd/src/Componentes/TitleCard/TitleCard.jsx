import {
  Box,
  Typography,
  Grid
} from '@mui/material';
import React from "react"; 

export const TitleCard = (props) => {
  const {logo, title} = props;

  return (

    <Grid
        container
        spacing={3}
        direction="row"
        alignItems="center"
        sx={{ display:"flex" }}
    > 

        <Grid
            item
            xs={12}
            sm={12}
            lg={1}
            sx={{border:0}}
        >
            <Box
                component="img"
                sx={{
                    height: 'auto', maxWidth: '100%'
                }}
                alt="Logo"
                src={logo}
            />  
        </Grid>

        <Grid
            item
            xs={12}
            sm={12}
            lg={11}
            sx={{border:0}}
        >
            <Typography variant="h2" component="h2" align='left' 
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: '#973f1c',
                }}>
                {title}
            </Typography>
        </Grid>
    </Grid>

  );
};