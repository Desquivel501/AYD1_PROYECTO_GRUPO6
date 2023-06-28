import { Grid, Typography } from "@mui/material";
import { ProductCard } from "../ProductCard/ProductCard";

export const ListadoProductos = (props) => {
  const { direccion, title,  descripcion, productos } = props;

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ pt: 2 }}
      width={"100vh"}
      maxHeight={"90vh"}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ border: 0, }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#973f1c",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        <p><strong>Dirección: </strong>{direccion}</p>
        <p><strong>Notas adicionales: </strong>{descripcion}</p>
      </Grid>

      <Grid
        container
        sx={{ border: 0,  maxHeight: "55vh", overflow: "auto" }}
        alignItems="left"
        justifyContent="center"
      >
        {productos.map((producto, i) => (
          <ProductCard
            key={i}
            title={producto.titulo}
            cost={producto.precio}
            image={producto.imagen}
            descripcion={producto.descripcion}
            combo={producto.Combo}
            size={10}
            addCost
            addDesc
            onSelect={() => ""}
          />
        ))}
      </Grid>
    </Grid>
  );
};
