import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavbarTest } from "./helpers";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Navbar component", () => {
  it("Should render the common options", () => {
    NavbarTest();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("Should render the user's options when auth is true", () => {
    NavbarTest();
    expect(screen.getByText("brayan")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Account settings" })).toBeInTheDocument();
    expect(screen.queryByText("Mi perfil")).toBeNull();
    expect(screen.queryByText("Mis compras")).toBeNull();
  });

  it("Should render My profile and My purchases when the profile button is clicked", async () => {
    const user = userEvent.setup();
    NavbarTest();
    const profileButton = screen.getByRole("button", { name: "Account settings" });
    await user.click(profileButton);
    expect(screen.getByText("Mi perfil")).toBeInTheDocument();
    expect(screen.getByText("Mis compras")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
