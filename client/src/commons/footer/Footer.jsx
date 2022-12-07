import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomTypography from "../custom-typography/CustomTypography";
import "./Footer.css";

/**
 * Componente que muestra el footer de la tienda
 */
function Footer() {
  const titleProps = {
    variant: "body1",
    sx: { FontSize: "14px", fontWeight: "bold", color: "var(--color-primary-white)" },
  };

  const linkProps = {
    variant: "body2",
    sx: { fontSize: "0.8125rem", color: "var(--color-primary-white)", mt: "10px" },
  };

  return (
    <Box id="app_footer">
      <Grid container alignItems="center" sx={{ pl: 10, pr: 10 }} spacing={2}>
        <Grid item={true} container xs={6} md={3}>
          <Grid item={true} xs={12}>
            <CustomTypography {...titleProps}>Conócenos</CustomTypography>
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <CustomTypography {...linkProps}>Trabaja en The Fashion Room</CustomTypography>
            </Grid>
            <Grid item>
              <CustomTypography {...linkProps}>Blog</CustomTypography>
            </Grid>
            <Grid item>
              <CustomTypography {...linkProps}>Acerca de The Fashion Room</CustomTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} container xs={6} md={3}>
          <Grid item={true} xs={12}>
            <CustomTypography {...titleProps}>Gana dinero con nosotros</CustomTypography>
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <CustomTypography {...linkProps}>
                Vender productos en The Fashion Room
              </CustomTypography>
            </Grid>
            <Grid item>
              <CustomTypography {...linkProps}>
                Vender en The Fashion Room business
              </CustomTypography>
            </Grid>
            <Grid item>
              <CustomTypography {...linkProps}>Programa de afiliados</CustomTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} container xs={6} md={3}>
          <Grid item={true} xs={12}>
            <CustomTypography {...titleProps}>Productos de pago</CustomTypography>
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <CustomTypography {...linkProps}>Compra con puntos</CustomTypography>
            </Grid>
            <Grid item>
              <CustomTypography {...linkProps}>Recarga tu saldo</CustomTypography>
            </Grid>
            <Grid item>
              <CustomTypography {...linkProps}>
                Conversor de divisas de The Fashion Room
              </CustomTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} container xs={6} md={3}>
          <Grid item={true} xs={12}>
            <CustomTypography {...titleProps}>Redes sociales</CustomTypography>
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <CustomTypography {...linkProps}>Síguenos en</CustomTypography>
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
    </Box>
  );
}

export default Footer;
