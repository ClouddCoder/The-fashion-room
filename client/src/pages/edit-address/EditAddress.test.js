import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { EditAddressTest } from "../../tests/test.utils";

describe.skip("EditAddress component", () => {
  it("Should render the component", () => {
    EditAddressTest();
    expect(screen.getByText(/Editar domicilio/)).toBeInTheDocument();
  });

  it("Should render address's inputs", () => {
    EditAddressTest();
    expect(screen.getByText("Nombre y apellido")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "name" })).toBeInTheDocument();
  });

  it("Should type address's inputs", async () => {
    const user = userEvent.setup();
    EditAddressTest();
    const inputName = screen.getByRole("textbox", { name: "name" });
    await user.type(inputName, "Brayan Sanchez");
    expect(inputName).toHaveValue("Brayan Sanchez");
  });
});
