import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CustomTypography from "../../commons/custom-typography/CustomTypography";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

function EditAddress() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [streetType, setStreetType] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "department":
        setDepartment(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "neighborhood":
        setNeighborhood(e.target.value);
        break;
      case "streetType":
        setStreetType(e.target.value);
        break;
      case "street":
        setStreet(e.target.value);
        break;
      case "number":
        setNumber(e.target.value);
        break;
      default:
    }
  };
  return (
    <div className="container">
      <Navbar />
      <Grid container direction="column">
        <Grid item>
          <CustomTypography variant="h3">Editar domicilio</CustomTypography>
        </Grid>
        <Grid item xs={6}>
          <div>
            <CustomTypography variant="body2">Nombre y apellido</CustomTypography>
            <TextField
              inputProps={{ "aria-label": "name" }}
              hiddenLabel
              fullWidth
              onChange={handleChange}
              variant="filled"
              size="small"
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <CustomTypography variant="body2">Departamento</CustomTypography>
            <TextField
              inputProps={{ "aria-label": "deparment" }}
              hiddenLabel
              fullWidth
              onChange={handleChange}
              variant="filled"
              size="small"
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <CustomTypography variant="body2">Municipio o ciudad capital</CustomTypography>
            <TextField
              inputProps={{ "aria-label": "city" }}
              hiddenLabel
              fullWidth
              onChange={handleChange}
              variant="filled"
              size="small"
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <CustomTypography variant="body2">Barrio</CustomTypography>
            <TextField
              inputProps={{ "aria-label": "neighborhood" }}
              hiddenLabel
              fullWidth
              onChange={handleChange}
              variant="filled"
              size="small"
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <CustomTypography variant="body2">Tipo de calle</CustomTypography>
            <TextField
              inputProps={{ "aria-label": "streetType" }}
              hiddenLabel
              fullWidth
              onChange={handleChange}
              variant="filled"
              size="small"
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <CustomTypography variant="body2">Carrera</CustomTypography>
            <TextField
              inputProps={{ "aria-label": "street" }}
              hiddenLabel
              fullWidth
              onChange={handleChange}
              variant="filled"
              size="small"
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <CustomTypography variant="body2">Número</CustomTypography>
            <TextField
              inputProps={{ "aria-label": "number" }}
              hiddenLabel
              fullWidth
              onChange={handleChange}
              variant="filled"
              size="small"
            />
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default EditAddress;
