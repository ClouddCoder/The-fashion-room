import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CustomTypography from "../../../components/custom-typography/CustomTypography";

function ProductFilters({ check, handleChange }) {
  return (
    <>
      <Grid item>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Género</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={check.hombre}
                onChange={handleChange}
                name="hombre"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Hombre</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.mujer}
                onChange={handleChange}
                name="mujer"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Mujer</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.unisex}
                onChange={handleChange}
                name="unisex"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Sin género</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.niño}
                onChange={handleChange}
                name="niño"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Niños</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.niña}
                onChange={handleChange}
                name="niña"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Niñas</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.bebe}
                onChange={handleChange}
                name="bebe"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Bebés</CustomTypography>}
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
                checked={check.calzado}
                onChange={handleChange}
                name="calzado"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Calzado</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.camisetas}
                onChange={handleChange}
                name="camisetas"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Camisas y camisetas</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.deportiva}
                onChange={handleChange}
                name="deportiva"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Ropa deportiva</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.bolsos}
                onChange={handleChange}
                name="bolsos"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Bolsos y maletas</CustomTypography>}
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
                checked={check.envio}
                onChange={handleChange}
                name="envio"
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
                checked={check.negro}
                onChange={handleChange}
                name="negro"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Negro</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.blanco}
                onChange={handleChange}
                name="blanco"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Blanco</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.gris}
                onChange={handleChange}
                name="gris"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Gris</CustomTypography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check.rojo}
                onChange={handleChange}
                name="rojo"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<CustomTypography variant="body2">Rojo</CustomTypography>}
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
