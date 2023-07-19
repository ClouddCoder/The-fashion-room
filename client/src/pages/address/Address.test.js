import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { AddressTest } from "../../tests/test.utils";
import { getAddress } from "../../services/user";

jest.mock("axios");
jest.mock("../../services/user");

beforeEach(() => {
  getAddress.mockResolvedValue({ data: [] });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Address component", () => {
  it("Should render the component", async () => {
    AddressTest();
    expect(
      await screen.findByText(/Selecciona o agrega una dirección/),
    ).toBeInTheDocument();
  });

  it.skip("Should navigate to the EditAddress component after click the button", async () => {
    const user = userEvent.setup();
    AddressTest();
    const button = screen.getByRole("button", {
      name: "Agregar una nueva dirección",
    });
    await user.click(button);
    expect(screen.getByText(/Editar domicilio/)).toBeInTheDocument();
    screen.getByRole("");
  });
});
