import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import "./Profile.css";

/**
 * Component to render the user's profile.
 * @returns {JSX.Element} - Profile component.
 */
function Profile() {
  const { username, userLastname } = useContext(AuthContext);
  return (
    <Layout>
      <Grid
        container
        direction="column"
        sx={{ width: "90%", maxWidth: "700px", p: 2 }}
        rowSpacing={4}
      >
        <Grid item>
          <Card>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <AccountCircleOutlinedIcon sx={{ width: "64px", height: "64px" }} />
              <span id="profile-name-title">{`${username} ${userLastname}`}</span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <ul className="profile-data">
                <li>
                  <Link to="/my-data">
                    <section className="profile-data-link">
                      <PermIdentityOutlinedIcon sx={{ width: "56px", height: "56px" }} />
                      <div>
                        <span className="my-data-subtitle">Mis datos</span>
                        <span>Valida tus datos</span>
                      </div>
                    </section>
                    <ArrowForwardIosOutlinedIcon sx={{ width: "24px", height: "24px" }} />
                  </Link>
                </li>
                <li id="container-horizontal-line">
                  <div className="horizontal-line" />
                </li>
                <li>
                  <Link to="/address">
                    <section className="profile-data-link">
                      <LocationOnOutlinedIcon sx={{ width: "56px", height: "56px" }} />
                      <div>
                        <span className="my-data-subtitle">Direcciones</span>
                        <span>Modifica tus direcciones o agrega una nueva</span>
                      </div>
                    </section>
                    <ArrowForwardIosOutlinedIcon sx={{ width: "24px", height: "24px" }} />
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Profile;
