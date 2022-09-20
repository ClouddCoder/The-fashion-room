import { screen } from "@testing-library/react";
import { NavbarTest } from "./helpers";

describe("Navbar component", () => {
  it("Should render the common options", () => {
    NavbarTest();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("Should render the user's options when auth is true", () => {
    NavbarTest();
    expect(screen.getByText("brayan")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Account settings" })).toBeInTheDocument();
    expect(screen.queryByText("Login")).toBeNull();
    expect(screen.queryByText("Register")).toBeNull();
  });
});
