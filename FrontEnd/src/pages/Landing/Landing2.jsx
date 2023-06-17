import { Link } from "react-router-dom";
import "./Landing.css";
import { ButtonGroup, Typography, Box, Container, Grid, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import MopedIcon from '@mui/icons-material/Moped';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LockIcon from '@mui/icons-material/Lock';
import Paper from "@mui/material/Paper";

const theme = createTheme({
  typography: {
    first: {
      fontSize: '5rem',
      color: '#973f1c',
      fontFamily: 'monospace',
      fontWeight: 700,
    },
    second: {
      fontSize: '5rem',
      color: '#c36038',
      fontFamily: 'monospace',
      fontWeight: 700,
    },
    text: {
      fontSize: '2rem',
      color: '#000',
      fontFamily: 'monospace',
      fontWeight: 700,
    },
    details: {
        color: '#fff',
        fontFamily: 'monospace',
        fontWeight: 700,
        fontSize: "2.5rem",
    },
    details_text: {
        fontSize: '1.5rem',
        color: '#fff',
        fontFamily: 'monospace',
        fontWeight: 700,
    },
  },
});


export function Landing() {

  return (
    <>

        <Box
            component="main"
            display="flex"
            minHeight="100vh"
            sx={{
                flexGrow: 1,
                my: 1
            }}
        >
            <Container maxWidth="xl">
                
                <Grid
                    container
                    spacing={3}
                    sx={{ width: "80vw", pt: 6 }}
                    alignItems="center"
                    justifyContent="center"
                > 
               

                    <Grid
                        item
                        xs={12} sm={6}
                        
                        sx={{border:0}}
                    >
                        <Grid
                            container
                            spacing={3}
                            sx={{ mt:2 }}
                            alignItems="center"
                            justifyContent="left"
                        > 
                            <ThemeProvider theme={theme}>
                                <Typography align='left' variant="first"
                                    >
                                    Lo que necesites,
                                </Typography>


                                <Typography align='left' variant="second"
                                    >
                                    en la puerta
                                </Typography>

                                <Typography align='left' variant="second"
                                    >
                                    de tu casa
                                </Typography>


                                <Divider variant="middle" sx={{my:2, width:'90%'}}/>

                                <Typography align='left' variant="text" sx={{my:2}}
                                    >
                                    ¡Bienvenido a AlChilazo, la mejor opción para satisfacer tus antojos
                                    y necesidades en la comodidad de tu hogar!
                                </Typography>

                                <Typography align='left' variant="text"
                                    >
                                    En AlChilazo trabajamos de la mano con los mejores restaurantes de
                                    la ciudad para bridarte una amplia selección de opciones
                                    gastronómicas.
                                </Typography>

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
                                            }
                                        }}
                                    onClick={(event) => window.location.href = "/RegistroCliente"}
                                > Registrate ya! </Button>
                            
                            </ThemeProvider>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12} sm={6}
                        
                        sx={{border:0}}
                    >   
                        <Box
                            component="img"
                            sx={{
                            height: '100%', width: '100%', border:0
                            }}
                            alt="Image"
                            src="./src/assets/login_image2.png"
                        />

                    </Grid>

                    <Grid
                        item
                        xs={12} sm={12}
                        
                        sx={{border:0, mb:5}}
                    >
                        <Grid
                            container
                            spacing={3}
                            sx={{ mt:2, bgcolor:'#f2890d', pb:3 }}
                            alignItems="top"
                            justifyContent="center"
                        > 
                        
                            <TextCard
                                className={"hola"}
                                title={"Rapidez"}
                                icon={"./src/assets/icons/moto_white.png"}
                                >
                                Te aseguramos que tu pedido estará a tiempo y sin demora.
                            </TextCard>

                            <Divider orientation="vertical" flexItem sx={{ml:5}}/>
                            
                            <TextCard
                                className={"hola"}
                                title={"Diversidad"}
                                icon={"./src/assets/icons/porcion-de-pizza_white.png"}
                                >
                                Ponemos a tu disposición una gran variedad de restaurantes y
                                comercios.
                            </TextCard>

                            <Divider orientation="vertical" flexItem sx={{ml:5}}/>
                            
                            <TextCard
                                className={"hola"}
                                title={"Seguridad"}
                                icon={"./src/assets/icons/bloqueado_white.png"}
                                >
                                Cuando ordenas con nosotros puedes estar seguro de que tu pedido
                                llegará intacto.
                            </TextCard>
                        </Grid>

                    </Grid>

                    <Grid
                        item
                        xs={12} sm={12}
                        
                        sx={{border:0, width:'100%'}}
                    >

                        <footer>
                            <ul>
                            <li>Quiénes somos</li>
                            <li><Link to="/About">Equipo</Link></li>
                            <li>Preguntas frecuentes</li>
                            <li>Terminos y condiciones</li>
                            <li>Políticas de Privacidad</li>
                            </ul>
                        </footer>


                    </Grid>
                    
                </Grid>

                {/* <Paper sx={{marginTop: 'calc(10% + 60px)',
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    height: '6vh'
                }} component="footer" square variant="outlined"></Paper> */}


            </Container>
        </Box>



      
    </>
  );
}
function TextCard({ className, title, children, icon }) {
  return (
    <Grid
        item
        xs={12} sm={3}
        sx={{border:0}}
    >
        <Grid
            container
            spacing={3}
            sx={{ }}
            alignItems="center"
            justifyContent="center"
        >  
            <ThemeProvider theme={theme}>
            <Grid
                item
                xs={12} sm={9}
                sx={{border:0}}
            >
                <Typography align='center' variant="details" sx={{my:2}}
                    >
                    {title}
                </Typography>
                
            </Grid>

            <Grid
                item
                xs={12} sm={3}
                sx={{border:0}}
            >
                <Box
                    component="img"
                    sx={{
                    height: '100%', width: '100%', border:0
                    }}
                    alt="Image"
                    src={icon}
                />
            </Grid>

            <Grid
                item
                xs={12} sm={12}
                sx={{border:0}}
            >
                <Typography align='center' variant="details_text" sx={{my:2}}
                    >
                    {children}
                </Typography>
                
            </Grid>
            </ThemeProvider>    
        </Grid>
    </Grid>
  );
}
