import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CustomTypography from "../../../commons/custom-typography/CustomTypography";

function ProductFilters({ check, handleChange }) {
  return (
    <>
      <Grid item>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Género</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="blusa"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Blusa</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.camisa}
                onChange={handleChange}
                name="camisa"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Camisa</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.corbata}
                onChange={handleChange}
                name="corbata"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Corbata</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.pantalon}
                onChange={handleChange}
                name="pantalon"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Pantalon</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.pantaloneta}
                onChange={handleChange}
                name="pantaloneta"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Pantaloneta</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.zapatos}
                onChange={handleChange}
                name="zapatos"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Zapatos</CustomTypography>}
            sx={{ m: 0 }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Categorías</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="xs"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">XS</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="s"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">S</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="m"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">M</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="l"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label="L"
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="xl"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">XL</CustomTypography>}
            sx={{ m: 0 }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Costo de envío</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="rojo"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Gratis</CustomTypography>}
            sx={{ m: 0 }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Color principal</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="rojo"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Rojo</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="azul"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Azul</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="verde"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Verde</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blusa}
                onChange={handleChange}
                name="amarillo"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Amarillo</CustomTypography>}
            sx={{ m: 0 }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Precio</FormLabel>
          <FormControlLabel
            control={<span />}
            label={<CustomTypography variant="body2">Hasta $200.000</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={<span />}
            label={<CustomTypography variant="body2">$200.000 a $400.000</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={<span />}
            label={<CustomTypography variant="body2">Más de $400.000</CustomTypography>}
            sx={{ m: 0 }}
          />
        </FormControl>
      </Grid>
    </>
  );
}

export default ProductFilters;
