import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import AuthContext from "../../context/auth-context/AuthContext";
import CustomTypography from "../../commons/custom-typography/CustomTypography";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

function Profile() {
  const { username, userLastname } = useContext(AuthContext);
  return (
    <div className="container">
      <Navbar />
      <Grid container direction="column">
        <Grid item>
          <CustomTypography variant="h1" sx={{ fontWeight: "bold" }}>
            {`${username} ${userLastname}`}
          </CustomTypography>
        </Grid>
        <Grid item>
          <ul>
            <li>
              <CustomTypography variant="h6" sx={{ fontWeight: "bold" }}>
                Mis datos
              </CustomTypography>
              <CustomTypography variant="body2">Valida tus datos</CustomTypography>
            </li>
            <li>
              <CustomTypography variant="h6" sx={{ fontWeight: "bold" }}>
                Direcciones
              </CustomTypography>
              <CustomTypography variant="body2">
                Modifica tus direcciones o agrega una nueva
              </CustomTypography>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Profile;
