import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../context/auth-context/AuthContext";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import Login from "../pages/login/Login";

const mockSetAuth = jest.fn();

test("render login", () => {
  render(
    <AuthContext.Provider value={{ mockSetAuth }}>
      <Router>
        <Login />
      </Router>
    </AuthContext.Provider>,
  );

  //screen.getByText("Iniciar sesión");
  expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
});
