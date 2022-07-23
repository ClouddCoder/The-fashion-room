import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Ingresar from "../paginas/Ingresar";
import Registrar from "../paginas/Registrar";
import Home from "../paginas/Home";

const MenuPrincipal = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MenuPrincipal;
