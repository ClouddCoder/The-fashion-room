import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import Layout from "../../components/layout/Layout";
import AuthContext from "../../context/auth-context/AuthContext";
import { getAddress } from "../../services/user";

function Address() {
  const { token } = useContext(AuthContext);
  const [addressList, setAddressList] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const getAddressList = async () => {
    try {
      const res = await getAddress(token);
      setAddressList(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
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

      <Grid container direction="column">
        <Grid item>
          <CustomTypography variant="h3">Direcciones</CustomTypography>
        </Grid>
        <Grid item>
          <CustomTypography variant="body2">Selecciona o agrega una dirección</CustomTypography>
        </Grid>
        <Grid item container direction="column">
          {addressList.map((address, index) => (
            <Grid
              item
              key={index}
              sx={{ width: "200px", display: "flex", justifyContent: "space-around" }}
            >
              <CustomTypography variant="body2">
                {`${address.street_type} ${address.street} ${address.street_number}`}
              </CustomTypography>
              <IconButton onClick={() => navigate(`/edit-address/${address.address_id}`)}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Grid>
          ))}
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
