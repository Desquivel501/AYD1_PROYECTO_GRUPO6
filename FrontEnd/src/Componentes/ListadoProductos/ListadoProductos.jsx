import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { ProductCard } from "../ProductCard/ProductCard";

export const ListadoProductos = (props) => {
  const { image, title, cost, descripcion, productos } = props;

  const theme = useTheme();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ pt: 2 }}
      component={Paper}
      width={"100vh"}
      height={"70vh"}
      elevation={6}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ border: 0, mb: 2 }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize:"1.5rem",
            color: "#973f1c",
            textAlign:"center"
          }}
        >
          {title}
        </Typography>
      </Grid>

      <Grid
        container
        sx={{ border: 0, pt: 2, maxHeight: "55vh", overflow: "auto" }}
        alignItems="left"
        justifyContent="center"
      >
        {productos.map((producto, i) => (
          <ProductCard
            key={i}
            title={producto.title}
            cost={producto.cost}
            image={producto.image}
            descripcion={producto.descripcion}
            size={10}
            addCost
            addDesc
            onSelect={()=>""}
          />
        ))}
      </Grid>
    </Grid>
  );
};
