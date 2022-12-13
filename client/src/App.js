import React from "react";
import AuthState from "./context/auth-context/AuthState";
import "./index.css";
import Navigation from "./routes/Navigation";

function App() {
  return (
    <div id="app">
      <AuthState>
        <Navigation />
      </AuthState>
    </div>
  );
}

export default App;
