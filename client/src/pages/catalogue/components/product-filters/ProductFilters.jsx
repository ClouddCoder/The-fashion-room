import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import "./ProductFilters.css";

/**
 * Component that shows the filters for the products.
 * @param {object} { check, handleChange }
 * @returns {JSX.Element} Component ProductFilters.
 */
function ProductFilters({ check, handleChange }) {
  return (
    <>
      <Grid item>
        <FormControl>
          <FormLabel id="genders">Género</FormLabel>
          <FormGroup>
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
              label={<span>Hombre</span>}
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
              label={<span>Mujer</span>}
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
              label={<span>Sin género</span>}
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
              label={<span>Niños</span>}
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
              label={<span>Niñas</span>}
              sx={{ m: 0 }}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <div className="category-list">
          <span id="categories">Categorías</span>
          <ul>
            <li>
              <Link to="/catalogue/calzado">Calzado</Link>
            </li>
            <li>
              <Link to="/catalogue/camisetas">Camisetas</Link>
            </li>
            <li>
              <Link to="/catalogue/deportiva">Ropa deportiva</Link>
            </li>
            <li>
              <Link to="/catalogue/bolsos">Bolsos y maletas</Link>
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item>
        <FormControl>
          <FormLabel id="prices">Precio</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={check["40000"]}
                onChange={handleChange}
                name="40000"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<span>$40.000</span>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check["50000"]}
                onChange={handleChange}
                name="50000"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<span>$50.000</span>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check["70000"]}
                onChange={handleChange}
                name="70000"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<span>$70.000</span>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={check["80000"]}
                onChange={handleChange}
                name="80000"
                size="small"
                sx={{ p: "3px" }}
              />
            }
            label={<span>$80.000</span>}
            sx={{ m: 0 }}
          />
        </FormControl>
      </Grid>
    </>
  );
}

export default ProductFilters;
