import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import "./MyData.css";

/**
 *  Component to render the user's data.
 * @returns {JSX.Element} - MyData component.
 */
function MyData() {
  // CardContent component without padding.
  const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

  const { username, user } = useContext(AuthContext);
  return (
    <Layout>
      <Grid
        container
        direction="column"
        sx={{ width: "90%", maxWidth: "700px", p: 2 }}
        rowSpacing={4}
      >
        <Grid item>
          <h3>Mis datos</h3>
        </Grid>
        <Grid item>
          <Card>
            <CardContentNoPadding>
              <ul className="my-data-list">
                <li className="my-data-link__container">
                  <Link to="/edit-data/email">
                    <div className="my-data-link">
                      <div className="my-data-link__field">
                        <span>Email</span>
                      </div>
                      <div className="my-data-link__value">
                        <span>Valida tu email</span>
                      </div>
                    </div>
                    <div className="my-data-link__icon">
                      <ArrowForwardIosOutlinedIcon />
                    </div>
                  </Link>
                </li>
                <li className="container-horizontal-line">
                  <div className="horizontal-line" />
                </li>
                <li className="my-data-link__container">
                  <Link to="/edit-data/name">
                    <div className="my-data-link">
                      <div className="my-data-link__field">
                        <span>Nombre elegido</span>
                      </div>
                      <div className="my-data-link__value">
                        <span>{username}</span>
                      </div>
                    </div>
                    <div className="my-data-link__icon">
                      <ArrowForwardIosOutlinedIcon />
                    </div>
                  </Link>
                </li>
                <li className="container-horizontal-line">
                  <div className="horizontal-line" />
                </li>
                <li className="my-data-link__container">
                  <Link to="/edit-data/username">
                    <div className="my-data-link">
                      <div className="my-data-link__field">
                        <span>Usuario</span>
                      </div>
                      <div className="my-data-link__value">
                        <span>{user}</span>
                      </div>
                    </div>
                    <div className="my-data-link__icon">
                      <ArrowForwardIosOutlinedIcon />
                    </div>
                  </Link>
                </li>
                <li className="container-horizontal-line">
                  <div className="horizontal-line" />
                </li>
                <li className="my-data-link__container">
                  <Link to="/phone">
                    <div className="my-data-link">
                      <div className="my-data-link__field">
                        <span>Teléfono de contacto</span>
                      </div>
                      <div className="my-data-link__value">
                        <span>Agrega un teléfono</span>
                      </div>
                    </div>
                    <div className="my-data-link__icon">
                      <ArrowForwardIosOutlinedIcon />
                    </div>
                  </Link>
                </li>
              </ul>
            </CardContentNoPadding>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default MyData;
