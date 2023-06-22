import { Typography, Box, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from '@mui/material/Divider';

export default function page_404() {

    const customTheme = createTheme({
        palette: {
          background: {
            default: "#f8ede9",
          },
        },
      });
    
  return (

    <ThemeProvider theme={customTheme}>
      <CssBaseline />
 
        <Box
            component="main"
            display="flex"
            minHeight="100vh"
            sx={{
                flexGrow: 1,
                py: 4
            }}
        >
            <Container maxWidth="xl">
                
                <Grid
                    container
                    spacing={0}
                    sx={{ width: "80vw", pt: 6 }}
                    alignItems="left"
                    justifyContent="center"
                > 

                    <Grid
                        item
                        xs={12} sm={6}
                        sx={{border:0}}
                    >
                        <Box
                            component="img"
                            sx={{
                            height: 'auto', maxWidth: '100%', border:0
                            }}
                            alt="Logo"
                            src={"https://ayd1-proyecto-g6.s3.us-east-2.amazonaws.com/1687450762912_image_404.png"}
                        />

                    </Grid>

                    <Divider variant="middle" sx={{my:2, width:'90%'}}/>

                    <Grid
                        item
                        xs={12} sm={12}
                    >
                        <Typography variant="h1" component="h1" align='center' 
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#bd4f23',
                            }}>
                            Página no encontrada
                        </Typography>

                    </Grid>

                    <Grid
                        item
                        xs={12} sm={12}
                        sx={{mt:2}}
                    >
                        <Typography variant="h5" component="h5" align='center' 
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#973f1c',
                            }}>
                            Parece que la página que estas buscando no existe.
                        </Typography>

                    </Grid>

                    <Grid
                        item
                        xs={12} sm={12}
                    >

                        <Button
                            variant="contained"
                            sx={{
                                    mt: 3, mb: 2, bgcolor: "#F2890D",
                                    fontSize: '1.5rem',
                                    color: '#fff',
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    '&:hover': {
                                        backgroundColor: '#973f1c',
                                    },
                                }}
                            onClick={(event) => window.location.href = "/"}
                        > Regresar </Button>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    </ThemeProvider>
  )
}