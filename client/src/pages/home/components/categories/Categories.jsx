import Grid from "@mui/material/Grid";
import { getProductImage } from "../../../../assets";
import Category from "../category/Category";
import "./Categories.css";

/**
 * Componente que muestra las diferentes categorias de la tienda en el inicio
 */
function Categories() {
  return (
    <Grid container direction="column" spacing={2} mb="20px">
      <Grid item>
        <h3>Ofertas</h3>
      </Grid>
      <Grid item container>
        <Grid item={true} xs={6} md={3}>
          <Category
            alt="calzado"
            image={getProductImage("calzado")}
            title="Calzado"
            description="Calzado de todo tipo"
          />
        </Grid>
        <Grid item={true} xs={6} md={3}>
          <Category
            alt="camisas"
            image={getProductImage("camisetas")}
            title="Camisetas"
            description="Camisetas de todo tipo"
          />
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
