import React from "react";
import AuthState from "./context/auth-context/AuthState";
import "./App.css";
import Navigation from "./routes/Navigation";

function App() {
  return (
    <div className="app">
      <AuthState>
        <Navigation />
      </AuthState>
    </div>
  );
}

export default App;
