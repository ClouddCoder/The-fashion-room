import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context/AuthContext";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import Layout from "../../components/layout/Layout";
import "./Profile.css";

function Profile() {
  const { username, userLastname } = useContext(AuthContext);
  return (
    <Layout>
      <Grid container direction="column">
        <Grid item>
          <CustomTypography variant="h3" sx={{ fontWeight: "bold" }}>
            {`${username} ${userLastname}`}
          </CustomTypography>
        </Grid>
        <Grid item>
          <ul className="profile-data">
            <li>
              <Link to="/my-data">
                <div>
                  <CustomTypography variant="h6" sx={{ fontWeight: "bold" }}>
                    Mis datos
                  </CustomTypography>
                  <CustomTypography variant="body2">Valida tus datos</CustomTypography>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/address">
                <div>
                  <CustomTypography variant="h6" sx={{ fontWeight: "bold" }}>
                    Direcciones
                  </CustomTypography>
                  <CustomTypography variant="body2">
                    Modifica tus direcciones o agrega una nueva
                  </CustomTypography>
                </div>
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Profile;
