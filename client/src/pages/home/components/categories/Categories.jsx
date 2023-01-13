import Grid from "@mui/material/Grid";
import { getProductImage } from "../../../../assets";
import Category from "../category/Category";
import "./Categories.css";

/**
 * Componente que muestra las diferentes categorias de la tienda en el inicio
 */
function Categories() {
  return (
    <Grid container direction="column">
      <Grid item>
        <h2>Ofertas</h2>
      </Grid>
      <Grid item container spacing={1}>
        <Grid item={true} xs={6} md={3}>
          <Category
            alt="calzado"
            image={getProductImage("calzado")}
            title="Calzado"
            description="Calzado de todo tipo"
          />
        </Grid>
        <Grid item={true} xs={6} md={3}>
          <Category alt="camisas" image={getProductImage("camisetas")} title="Camisetas" />
        </Grid>
        <Grid item={true} xs={6} md={3}>
          <Category
            alt="deportiva"
            image={getProductImage("deportiva")}
            title="Ropa deportiva"
            description="Ropa deportiva de todo tipo"
          />
        </Grid>
        <Grid item={true} xs={6} md={3}>
          <Category
            alt="bolsos"
            image={getProductImage("bolsos")}
            title="Bolsos y maletas"
            description="Bolsos y maletas de todo tipo"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Categories;
