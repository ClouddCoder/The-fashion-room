import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthState from "./context/auth-context/AuthState";
import ProductState from "./context/product-context/ProductState";
import "./index.css";
import Navigation from "./routes/Navigation";

function App() {
  return (
    <div id="app">
      <AuthState>
        <ProductState>
          <Router>
            <Navigation />
          </Router>
        </ProductState>
      </AuthState>
    </div>
  );
}

export default App;
