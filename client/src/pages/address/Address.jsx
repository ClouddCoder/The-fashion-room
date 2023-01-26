import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Layout from "../../components/layout/Layout";
import AuthContext from "../../context/auth-context/AuthContext";
import useOpenComponent from "../../utils/hooks/useOpenComponent";
import useError from "../../utils/hooks/useError";
import { getAddress } from "../../services/user";
import "./Address.css";

/**
 * Component to render the addresses of the user.
 * @returns {JSX.Element} - Address component.
 */
function Address() {
  const { token } = useContext(AuthContext);

  const [addressList, setAddressList] = useState([]);

  const { open, setOpenComponent } = useOpenComponent();

  const { error, setInputError } = useError();

  const navigate = useNavigate();

  const getAddressList = async () => {
    try {
      const res = await getAddress(token);
      setAddressList(res.data);
    } catch (err) {
      const { response } = err;
      const { data } = response;
      const { message, constraint } = data;
      setInputError({ ...error, constraint, message });
    }
    setOpenComponent(false);
  };

  useEffect(() => {
    getAddressList();
    setInputError({ ...error, constraint: "", message: "" });
  }, []);

  return (
    <Layout>
      {open && (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      )}

      <Grid
        container
        direction="column"
        sx={{ width: "90%", maxWidth: "500px", p: 2 }}
        rowSpacing={2}
      >
        <Grid item>
          <h3>Domicilios</h3>
        </Grid>
        <Grid item>
          <span>Edita o agrega un domicilio</span>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Grid container direction="column" rowSpacing={2}>
                {error.constraint === "empty" && <span id="error-message">{error.message}</span>}
                {addressList.map((address, index) => (
                  <Grid item key={index} sx={{ width: "100%" }}>
                    <section className="addresses-container">
                      <div className="address-field-container">
                        <span className="address-field">{`${address.street_type} ${address.street} ${address.street_number}`}</span>
                      </div>
                      <IconButton
                        sx={{ flex: 1 }}
                        onClick={() => navigate(`/edit-address/${address.address_id}`)}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </section>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/edit-address/new")}
            fullWidth
          >
            Agregar una nueva dirección
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Address;
