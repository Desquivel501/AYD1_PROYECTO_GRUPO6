import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

export const ProductCard = (props) => {
  const {
    image,
    id,
    title,
    cost,
    descripcion,
    onSelect,
    addDesc,
    addCost,
    size,
    combo,
  } = props;

  const handleSelect = () => {
    onSelect(id);
  };

  const theme = useTheme();

  return (
    <Grid
      item
      xs={size}
      sx={{
        border: 0,
        my: 1,
        mx: 1,
        "&:hover": {
          backgroundColor: "#f1dbd3",
        },
      }}
      component={Paper}
      elevation={6}
      onClick={handleSelect}
      // justifyContent="flex-start"
      // alignItems="center"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ border: 0 }}
      >
        <Grid
          item
          xs={3}
          sx={{ border: 0 }}
        >
          {combo
            ? (
              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  align="center"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#973f1c",
                  }}
                >
                  Combo
                </Typography>
              </Grid>
            )
            : (
              <Box
                component="img"
                sx={{
                  height: "auto",
                  maxWidth: "80%",
                  mt: 2,
                  ml: 1,
                }}
                alt="Logo"
                src={image}
              />
            )}
        </Grid>

        <Grid
          item
          xs={9}
          sx={{ border: 0 }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ border: 0, pr: 3 }}
          >
            <Grid
              item
              xs={12}
              sx={{ border: 0, pt: 1 }}
            >
              <Typography
                variant="h4"
                component="h4"
                align="left"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#973f1c",
                }}
              >
                {title}
              </Typography>
            </Grid>

            {addDesc &&
              (
                <Grid
                  item
                  xs={12}
                  sx={{ border: 0 }}
                >
                  <Typography
                    variant="p"
                    component="p"
                    align="left"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: "black",
                    }}
                  >
                    {descripcion}
                  </Typography>
                </Grid>
              )}

            {addCost &&
              (
                <Grid
                  item
                  xs={12}
                  sx={{ border: 0 }}
                >
                  <Typography
                    variant="h6"
                    component="h6"
                    align="right"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "#973f1c",
                    }}
                  >
                    ${cost}
                  </Typography>
                </Grid>
              )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
