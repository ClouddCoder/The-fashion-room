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
import useLoader from "../../utils/hooks/useLoader";
import { getAddress } from "../../services/user";

/**
 * Component to render the addresses of the user.
 * @returns {JSX.Element} - Address component.
 */
function Address() {
  const { token } = useContext(AuthContext);
  const [addressList, setAddressList] = useState([]);
  const { loader, setLoaderComponent } = useLoader();
  const navigate = useNavigate();

  const getAddressList = async () => {
    try {
      const res = await getAddress(token);
      setAddressList(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoaderComponent(false);
  };

  useEffect(() => {
    getAddressList();
  }, []);

  return (
    <Layout>
      {loader && (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      )}

      <Grid container direction="column" sx={{ width: "50%" }}>
        <Grid item>
          <h3>Domicilios</h3>
        </Grid>
        <Grid item>
          <span>Edita o agrega un domicilio</span>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Grid container>
                {addressList.map((address, index) => (
                  <Grid
                    item
                    key={index}
                    sx={{ width: "200px", display: "flex", justifyContent: "space-around" }}
                  >
                    <span>{`${address.street_type} ${address.street} ${address.street_number}`}</span>
                    <IconButton onClick={() => navigate(`/edit-address/${address.address_id}`)}>
                      <ArrowForwardIosIcon />
                    </IconButton>
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
