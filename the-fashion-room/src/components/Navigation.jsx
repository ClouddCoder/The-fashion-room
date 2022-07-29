import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function LogRegButtons() {
  return (
    <nav>
      <ul>
        <li>
          <Button component={Link} variant="contained" to="/login" color="primary">
            Ingresar
          </Button>
        </li>
        <li>
          <Button component={Link} variant="contained" to="/register" color="primary">
            Registrar
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default LogRegButtons;
