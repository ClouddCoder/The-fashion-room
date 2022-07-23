import {Link} from "react-router-dom";

export const LogRegButtons = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link className="btn btn-primary" to="/ingresar">
            Ingresar
          </Link>
        </li>
        <li>
          <Link className="btn btn-primary" to="/registrar">
            Registrar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const ReturnHome = () => {
  return (
    <nav>
      <Link className="btn btn-primary" to="/">
        Home
      </Link>
    </nav>
  );
};
