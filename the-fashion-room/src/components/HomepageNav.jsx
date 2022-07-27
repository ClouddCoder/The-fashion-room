import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Catalogue from "../pages/Catalogue";
import Product from "../pages/Product";
import { Container } from "@mui/material";

function HomepageNav() {
  return (
    <div>
      <Router>
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default HomepageNav;
