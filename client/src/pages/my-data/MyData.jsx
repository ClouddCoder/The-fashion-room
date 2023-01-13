import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";

function MyData() {
  const { username, user } = useContext(AuthContext);
  return (
    <Layout>
      <Grid container direction="column" sx={{ width: "auto" }}>
        <Grid item>
          <h3>Mis datos</h3>
        </Grid>
        <Grid item>
          <ul>
            <li>
              <Link to="/edit-data/email">
                <div>
                  <h6>Email</h6>
                  <span>Valida tu email</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/edit-data/name">
                <div>
                  <h6>Nombre elegido</h6>
                  <span>{username}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/edit-data/username">
                <div>
                  <h6>Usuario</h6>
                  <span>{user}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/phone">
                <div>
                  <h6>Teléfono de contacto</h6>
                  <span>Agrega un teléfono</span>
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
