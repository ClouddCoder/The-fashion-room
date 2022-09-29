import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./Footer.css";

/**
 * Componente que muestra el footer de la tienda
 */
function Footer() {
  return (
    <Box className="app_footer">
      <Grid container alignItems="center" sx={{ pl: 10, pr: 10 }} spacing={2}>
        <Grid item={true} container xs={6} md={3}>
          <Grid item={true} xs={12}>
            <Typography className="title_footer">Conócenos</Typography>
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <Typography className="link_footer">Trabaja en The Fashion Room</Typography>
            </Grid>
            <Grid item>
              <Typography className="link_footer">Blog</Typography>
            </Grid>
            <Grid item>
              <Typography className="link_footer">Acerca de The Fashion Room</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} container xs={6} md={3}>
          <Grid item={true} xs={12}>
            <Typography className="title_footer">Gana dinero con nosotros</Typography>
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <Typography className="link_footer">
                Vender productos en The Fashion Room
              </Typography>
            </Grid>
            <Grid item>
              <Typography className="link_footer">
                Vender en The Fashion Room business
              </Typography>
            </Grid>
            <Grid item>
              <Typography className="link_footer">Programa de afiliados</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} container xs={6} md={3}>
          <Grid item={true} xs={12}>
            <Typography className="title_footer">Productos de pago</Typography>
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <Typography className="link_footer">Compra con puntos</Typography>
            </Grid>
            <Grid item>
              <Typography className="link_footer">Recarga tu saldo</Typography>
            </Grid>
            <Grid item>
              <Typography className="link_footer">
                Conversor de divisas de The Fashion Room
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} container xs={6} md={3}>
          <Grid item={true} xs={12}>
            <Typography className="title_footer">Redes sociales</Typography>
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <Typography className="link_footer">Síguenos en</Typography>
            </Grid>
            <Grid item container spacing={2} justifyContent="center" pt={2}>
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
    </Box>
  );
}

export default Footer;
