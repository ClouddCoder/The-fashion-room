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

  it("Should hide the input email after sending the email", async () => {
    getUserId.mockReturnValue({ data: { userId: 1 } });
    const user = userEvent.setup();
    EditPasswordTest();
    const button = screen.getByRole("button", { name: "Continuar" });
    await user.click(button);
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const emailInputClosestForm = emailInput.closest("form");
    const emailInputClosestFormParent = emailInputClosestForm.parentNode;
    expect(emailInputClosestFormParent.className).toMatch(/hidden/);
  });

  it("Should render the password inputs after submiting the email", async () => {
    getUserId.mockReturnValue({ data: { userId: 1 } });
    const user = userEvent.setup();
    EditPasswordTest();
    const button = screen.getByRole("button", { name: "Continuar" });
    await user.click(button);
    const currentPasswordInput = screen.getByLabelText(/Contraseña actual/);
    expect(currentPasswordInput).toBeInTheDocument();
    const newPasswordInput = screen.getByLabelText(/Contraseña nueva/);
    expect(newPasswordInput).toBeInTheDocument();
  });
});
