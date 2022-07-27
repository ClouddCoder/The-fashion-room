import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const LogRegButtons = () => {
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
};
