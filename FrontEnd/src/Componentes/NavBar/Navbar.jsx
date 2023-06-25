import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSesion } from "../../hooks/useSesion";
import { links } from "../../assets/navBars";
import { useState } from "react";
import { useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {

  const navigate = useNavigate();

  const { user, logout } = useSesion();
  const [data, setdata] = useState([])

  useEffect(() => {
    setdata(links[user.rol])
  }, []);

  const handleClick = ()=>{
    navigate("/")
    logout()
    console.log(user.rol)
  }

  // const handleClickCarrito = ()=>{
  //   navigate("/")
  // }

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#f2890d" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 40,
                mr: 1,
                maxWidth: 160,
              }}
              alt="Logo"
              src="https://res.cloudinary.com/alex4191/image/upload/v1685731006/Alchilazo/ALCHILAZO_bpuyvh.png"
              onClick={(event) => window.location.href = "/"}
            />

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Link
                to={"/"}
              >
                AlChilazo
              </Link>
            </Typography>

            {links[user.rol].map(({ text, path },index) => (
              <Link
                to={path}
                key={index}
              >
                {text}
              </Link>
            ))}
            {/* {user.rol != "Ninguno" && (
              <Link to={"/"} onClick={handleClick}>Cerrar sesión</Link>
            )} */}
          </Box>

          {user.rol == "Cliente" && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Carrito de Compras">
                <IconButton sx={{ p: 0 }} component={Link} to="Carrito">
                  <ShoppingCartIcon sx={{ color: '#FFF' }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}  

          {user.rol != "Ninguno" && (
          <Box sx={{ flexGrow: 0, mx:2 }}>
            <Tooltip title="Cerrar Sesion">
              <IconButton sx={{ p: 0 }} onClick={handleClick}>
                <LogoutIcon sx={{ color: '#FFF' }} />
              </IconButton>
            </Tooltip>
          </Box>
          )}
          
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
