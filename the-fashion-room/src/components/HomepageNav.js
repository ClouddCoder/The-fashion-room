import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

const HomepageNav = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/ingresar" element={<Login />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default HomepageNav;
