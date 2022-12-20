import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { EditPasswordTest, mockCustomers } from "../../tests/test.utils";
import { changeUserPassword, getUserId } from "../../services/user";

jest.mock("../../services/user", () => ({
  changeUserPassword: jest.fn(),
  getUserId: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("EditPassword component", () => {
  it("Should render the email input", () => {
    EditPasswordTest();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("Should not render the password inputs", () => {
    EditPasswordTest();
    expect(screen.queryByRole("textbox", { name: "Contraseña actual" })).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Contraseña nueva" })).toBeNull();
  });

  it("Should type the email", async () => {
    EditPasswordTest();
    const user = userEvent.setup();
    const inputEmail = screen.getByLabelText("Email");
    await user.type(inputEmail, "brayan");
    expect(inputEmail).toHaveValue("brayan");
  });

  it("Should get the user's id after submit the email and render the password inputs", async () => {
    getUserId.mockReturnValue({ data: { userId: 1 } });
    const user = userEvent.setup();
    EditPasswordTest();
    const button = screen.getByRole("button", { name: "Continuar" });
    await user.click(button);
    const passwordInput = await screen.findByRole("textbox", { name: "Email" });
    expect(passwordInput).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Contraseña nueva" })).toBeInTheDocument();
  });
});
