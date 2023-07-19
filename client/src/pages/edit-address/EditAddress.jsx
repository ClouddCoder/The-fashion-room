import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import {
  setAddress,
  updateAddress,
  getSingleAddress,
} from "../../services/user";
import Modal from "../../components/modal/Modal";
import "./EditAddress.css";

/**
 * Component to render the fields to change or add the user's address.
 * @returns {JSX.Element} - EditAddress component.
 */
function EditAddress() {
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [streetType, setStreetType] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [references, setReferences] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

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
        setOpenModal(true);
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
        setOpenModal(true);
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
      <Grid
        container
        direction="column"
        sx={{ width: "90%", maxWidth: "750px", p: 2 }}
      >
        <Grid item sx={{ mb: 2 }}>
          <h3>Editar domicilio</h3>
        </Grid>
        <Grid item sx={{ borderRadius: "10px" }}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{ display: "flex", justifyContent: "space-around" }}
                    spacing={2}
                  >
                    <Grid item xs={12} sm={6}>
                      <span>Departamento</span>
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
                    <Grid item xs={12} sm={6}>
                      <span>Municipio o ciudad capital</span>
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
                  <Grid item xs={12} sm={6}>
                    <span>Barrio</span>
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
                    <Grid item xs={12} sm={4}>
                      <span>Tipo de calle</span>
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
                    <Grid item xs={12} sm={4}>
                      <span>Carrera</span>
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
                    <Grid item xs={12} sm={4}>
                      <span>Número</span>
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
                      className="address-references"
                      name="references"
                      placeholder="Descripción de la fachada, puntos de referencia para encontrarla, indicaciones de seguridad, etc."
                      maxLength="100"
                      onChange={handleChange}
                      value={references}
                    />
                  </Grid>
                  <Grid item container direction="row-reverse">
                    <Button variant="contained" color="secondary" type="submit">
                      {addressId === "new" ? "Agregar" : "Actualizar"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Modal state={openModal}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            p: "20px",
          }}
          rowSpacing={2}
        >
          <Grid item>
            <h3 className="modal-window__title">
              {addressId === "new"
                ? "Domicilio agregado"
                : "Domicilio actualizado"}
            </h3>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setOpenModal(false);
                navigate("/address");
              }}
              fullWidth
            >
              Regresar
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Layout>
  );
}

export default EditAddress;
