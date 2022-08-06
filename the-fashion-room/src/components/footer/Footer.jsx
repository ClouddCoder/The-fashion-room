import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./Footer.css";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Footer() {
  return (
    <Box className="app_footer">
      <Container>
        <Grid container spacing={3}>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <Typography component="div" className="title_footer">
                Conócenos
              </Typography>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography component="div" className="link_footer">
                  Trabaja en The Fashion Room
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="div" className="link_footer">
                  Blog
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="div" className="link_footer">
                  Acerca de The Fashion Room
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <Typography component="div" className="title_footer">
                Gana dinero con nosotros
              </Typography>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography component="div" className="link_footer">
                  Vender productos en The Fashion Room
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="div" className="link_footer">
                  Vender en The Fashion Room business
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="div" className="link_footer">
                  Programa de afiliados
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <Typography component="div" className="title_footer">
                Productos de pago
              </Typography>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography component="div" className="link_footer">
                  Compra con puntos
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="div" className="link_footer">
                  Recarga tu saldo
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="div" className="link_footer">
                  Conversor de divisas de The Fashion Room
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <Typography component="div" className="title_footer">
                Redes sociales
              </Typography>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography component="div" className="link_footer">
                  Síguenos en
                </Typography>
              </Grid>
              <Grid item container spacing={2}>
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
      </Container>
    </Box>
  );
}

export default Footer;
