import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Grid from "@mui/material/Grid";
import "./Footer.css";

/**
 * Componente que muestra el footer de la tienda
 */
function Footer() {
  return (
    <Grid container alignItems="center" sx={{ width: "80%" }} spacing={2}>
      <Grid item={true} container xs={6} md={3}>
        <Grid item={true} xs={12}>
          <span className="footer__subtitle">Conócenos</span>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <span className="footer__link">Trabaja en The Fashion Room</span>
          </Grid>
          <Grid item>
            <span className="footer__link">Blog</span>
          </Grid>
          <Grid item>
            <span className="footer__link">Acerca de The Fashion Room</span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item={true} container xs={6} md={3}>
        <Grid item={true} xs={12}>
          <span className="footer__subtitle">Gana dinero con nosotros</span>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <span className="footer__link">Vender productos en The Fashion Room</span>
          </Grid>
          <Grid item>
            <span className="footer__link">Vender en The Fashion Room business</span>
          </Grid>
          <Grid item>
            <span className="footer__link">Programa de afiliados</span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item={true} container xs={6} md={3}>
        <Grid item={true} xs={12}>
          <span className="footer__subtitle">Productos de pago</span>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <span className="footer__link">Compra con puntos</span>
          </Grid>
          <Grid item>
            <span className="footer__link">Recarga tu saldo</span>
          </Grid>
          <Grid item>
            <span className="footer__link">Conversor de divisas de The Fashion Room</span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item={true} container xs={6} md={3}>
        <Grid item={true} xs={12}>
          <span className="footer__subtitle">Redes sociales</span>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <span className="footer__link">Síguenos en</span>
          </Grid>
          <Grid item container spacing={2} pt={2}>
            <Grid item>
              <FacebookIcon />
            </Grid>
            <Grid item>
              <InstagramIcon />
            </Grid>
            <Grid item>
              <TwitterIcon />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
