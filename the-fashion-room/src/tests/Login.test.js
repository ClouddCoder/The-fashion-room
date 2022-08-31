import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import Login from "../pages/login/Login";

test("render login", () => {
  render(<Login />);
  //console.log(component);
  screen.getByText("Iniciar sesión");
});
