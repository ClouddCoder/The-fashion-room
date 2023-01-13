import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import "./Profile.css";

function Profile() {
  const { username, userLastname } = useContext(AuthContext);
  return (
    <Layout>
      <Grid container direction="column">
        <Grid item>
          <h3>{`${username} ${userLastname}`}</h3>
        </Grid>
        <Grid item>
          <ul className="profile-data">
            <li>
              <Link to="/my-data">
                <div>
                  <h6>Mis datos</h6>
                  <span>Valida tus datos</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/address">
                <div>
                  <h6>Direcciones</h6>
                  <span>Modifica tus direcciones o agrega una nueva</span>
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
