import React from "react";
import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import Navigation from "./Navigation";
import { GlobalContext } from "../tests/test.utils";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Navigation component", () => {
  it("Should render the homepage", () => {
    const route = "/";

    render(
      <GlobalContext>
        <MemoryRouter initialEntries={[route]}>
          <Navigation />
        </MemoryRouter>
      </GlobalContext>,
    );

    expect(screen.getByText("Calzado")).toBeInTheDocument();
  });

  it("Should render the Profile component", () => {
    const route = "/profile";

    render(
      <GlobalContext>
        <MemoryRouter initialEntries={[route]}>
          <Navigation />
        </MemoryRouter>
      </GlobalContext>,
    );

    expect(screen.getByText("Mis datos")).toBeInTheDocument();
  });

  it("Should render the MyData component", () => {
    const route = "/my-data";

    render(
      <GlobalContext>
        <MemoryRouter initialEntries={[route]}>
          <Navigation />
        </MemoryRouter>
      </GlobalContext>,
    );

    expect(screen.getByText("Nombre elegido")).toBeInTheDocument();
  });

  it("Should render the page to change the email in the EditData component", () => {
    const route = "/edit-data/email";

    render(
      <GlobalContext>
        <MemoryRouter initialEntries={[route]}>
          <Navigation />
        </MemoryRouter>
      </GlobalContext>,
    );

    expect(screen.getByText("Editar email")).toBeInTheDocument();
  });

  it("Should render the page to change the phone in the EditData component", () => {
    const route = "/edit-data/phone";

    render(
      <GlobalContext>
        <MemoryRouter initialEntries={[route]}>
          <Navigation />
        </MemoryRouter>
      </GlobalContext>,
    );

    expect(screen.getByText("Editar teléfono")).toBeInTheDocument();
  });
});
