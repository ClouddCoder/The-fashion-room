import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context/AuthContext";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import Layout from "../../components/layout/Layout";

function MyData() {
  const { username, user } = useContext(AuthContext);
  return (
    <Layout>
      <Grid container direction="column" sx={{ width: "auto" }}>
        <Grid item>
          <CustomTypography variant="h3" sx={{ fontWeight: "bold" }}>
            Mis datos
          </CustomTypography>
        </Grid>
        <Grid item>
          <ul>
            <li>
              <Link to="/edit-data/email">
                <div>
                  <CustomTypography variant="h6" sx={{ fontWeight: "bold" }}>
                    Email
                  </CustomTypography>
                  <CustomTypography variant="body2">Valida tu email</CustomTypography>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/edit-data/name">
                <div>
                  <CustomTypography variant="h6" sx={{ fontWeight: "bold" }}>
                    Nombre elegido
                  </CustomTypography>
                  <CustomTypography variant="body2">{username}</CustomTypography>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/edit-data/username">
                <div>
                  <CustomTypography variant="h6" sx={{ fontWeight: "bold" }}>
                    Usuario
                  </CustomTypography>
                  <CustomTypography variant="body2">{user}</CustomTypography>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/edit-data/phone">
                <div>
                  <CustomTypography variant="h6" sx={{ fontWeight: "bold" }}>
                    Teléfono de contacto
                  </CustomTypography>
                  <CustomTypography variant="body2">Agrega un teléfono</CustomTypography>
                </div>
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default MyData;
