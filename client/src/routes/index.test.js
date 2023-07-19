import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import { GlobalContext } from "../tests/test.utils";
import CustomRoutes from "./CustomRoutes";

let router = null;
const routes = [
  "/",
  "/profile",
  "/my-data",
  "/edit-data/email",
  "/edit-address/1",
  "/phone",
];

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("CustomRoutes component", () => {
  it("Should render the homepage", () => {
    router = createMemoryRouter(CustomRoutes(), {
      initialEntries: routes,
      initialIndex: 0,
    });

    render(
      <GlobalContext>
        <RouterProvider router={router} />
      </GlobalContext>,
    );

    expect(screen.getByText("Calzado")).toBeInTheDocument();
  });

  it("Should render the Profile component", () => {
    router = createMemoryRouter(CustomRoutes(), {
      initialEntries: routes,
      initialIndex: 1,
    });

    render(
      <GlobalContext>
        <RouterProvider router={router} />
      </GlobalContext>,
    );

    expect(screen.getByText(/Mis datos/)).toBeInTheDocument();
  });

  it("Should render the MyData component", () => {
    router = createMemoryRouter(CustomRoutes(), {
      initialEntries: routes,
      initialIndex: 2,
    });

    render(
      <GlobalContext>
        <RouterProvider router={router} />
      </GlobalContext>,
    );

    expect(screen.getByText("Nombre elegido")).toBeInTheDocument();
  });

  it("Should render the page to change the email in the EditData component", () => {
    router = createMemoryRouter(CustomRoutes(), {
      initialEntries: routes,
      initialIndex: 3,
    });

    render(
      <GlobalContext>
        <RouterProvider router={router} />
      </GlobalContext>,
    );

    expect(screen.getByText("Editar email")).toBeInTheDocument();
  });

  it("Should render the page to change the address in the EditAddress component", () => {
    router = createMemoryRouter(CustomRoutes(), {
      initialEntries: routes,
      initialIndex: 4,
    });

    render(
      <GlobalContext>
        <RouterProvider router={router} />
      </GlobalContext>,
    );

    expect(screen.getByText(/Editar domicilio/)).toBeInTheDocument();
  });

  it("Should render the page to change the phone in the EditData component", () => {
    router = createMemoryRouter(CustomRoutes(), {
      initialEntries: routes,
      initialIndex: 5,
    });

    render(
      <GlobalContext>
        <RouterProvider router={router} />
      </GlobalContext>,
    );

    expect(
      screen.getByText(/Selecciona o agrega un número celular/),
    ).toBeInTheDocument();
  });
});
