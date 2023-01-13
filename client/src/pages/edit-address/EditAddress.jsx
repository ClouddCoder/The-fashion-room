import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import { setAddress, updateAddress, getSingleAddress } from "../../services/user";
import "./EditAddress.css";

function EditAddress() {
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [streetType, setStreetType] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [references, setReferences] = useState("");

  const { token } = useContext(AuthContext);
  const { addressId } = useParams();

  /**
   * Gets the address that the user wants to update
   */
  const getAddressData = async (address) => {
    try {
      const res = await getSingleAddress(address, token);

      setDepartment(res.data.department);
      setCity(res.data.city);
      setNeighborhood(res.data.neighborhood);
      setStreetType(res.data.street_type);
      setStreet(res.data.street);
      setStreetNumber(res.data.street_number);
      setReferences(res.data.address_references);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (addressId !== "new") {
      getAddressData(addressId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressId === "new") {
      try {
        const res = await setAddress(
          department,
          city,
          neighborhood,
          streetType,
          street,
          streetNumber,
          references,
          token,
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await updateAddress(
          addressId,
          token,
          department,
          city,
          neighborhood,
          streetType,
          street,
          streetNumber,
          references,
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "department":
        setDepartment(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "neighborhood":
        setNeighborhood(e.target.value);
        break;
      case "streetName":
        setStreetType(e.target.value);
        break;
      case "street":
        setStreet(e.target.value);
        break;
      case "number":
        setStreetNumber(e.target.value);
        break;
      case "references":
        setReferences(e.target.value);
        break;
      default:
    }
  };

  return (
    <Layout>
      <Grid container direction="column" sx={{ width: "70%" }}>
        <Grid item>
          <CustomTypography variant="h3">Editar domicilio</CustomTypography>
        </Grid>
        <Grid item sx={{ background: "grey", borderRadius: "10px", p: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid
                item
                container
                xs={12}
                sx={{ display: "flex", justifyContent: "space-around" }}
                spacing={2}
              >
                <Grid item xs={6}>
                  <CustomTypography variant="body2">Departamento</CustomTypography>
                  <TextField
                    inputProps={{ "aria-label": "deparment" }}
                    name="department"
                    hiddenLabel
                    fullWidth
                    onChange={handleChange}
                    value={department}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTypography variant="body2">Municipio o ciudad capital</CustomTypography>
                  <TextField
                    inputProps={{ "aria-label": "city" }}
                    name="city"
                    hiddenLabel
                    fullWidth
                    onChange={handleChange}
                    value={city}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <CustomTypography variant="body2">Barrio</CustomTypography>
                <TextField
                  inputProps={{ "aria-label": "neighborhood" }}
                  name="neighborhood"
                  hiddenLabel
                  fullWidth
                  onChange={handleChange}
                  value={neighborhood}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                sx={{ display: "flex", justifyContent: "space-around" }}
                spacing={2}
              >
                <Grid item xs={4}>
                  <CustomTypography variant="body2">Tipo de calle</CustomTypography>
                  <TextField
                    inputProps={{ "aria-label": "street-type" }}
                    name="streetName"
                    hiddenLabel
                    fullWidth
                    onChange={handleChange}
                    value={streetType}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTypography variant="body2">Carrera</CustomTypography>
                  <TextField
                    inputProps={{ "aria-label": "street" }}
                    name="street"
                    hiddenLabel
                    fullWidth
                    onChange={handleChange}
                    value={street}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTypography variant="body2">Número</CustomTypography>
                  <TextField
                    inputProps={{ "aria-label": "number" }}
                    name="number"
                    hiddenLabel
                    fullWidth
                    onChange={handleChange}
                    value={streetNumber}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <textarea
                  name="references"
                  placeholder="Ingresa las referencias"
                  onChange={handleChange}
                  value={references}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" type="submit" fullWidth>
                  {addressId === "new" ? "Agregar" : "Actualizar"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default EditAddress;
