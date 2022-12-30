import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { EditEmailTest } from "../../tests/test.utils";
import { changeUserEmail } from "../../services/user";

jest.mock("../../services/user", () => ({
  changeUserEmail: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("EditEmail component", () => {
  it("Should render inputs", () => {
    EditEmailTest();
    expect(screen.getByLabelText("newEmail")).toBeInTheDocument();
  });

  it("Should render input's title", () => {
    EditEmailTest();
    expect(screen.getByText("Email nuevo")).toBeInTheDocument();
  });

  it("Should type emails' input", async () => {
    const user = userEvent.setup();
    EditEmailTest();
    const inputNewEmail = screen.getByRole("textbox", { name: "newEmail" });
    await user.type(inputNewEmail, "lucas");
    expect(inputNewEmail).toHaveValue("lucas");
  });

  it("The new message should not render before user's email is updated", async () => {
    changeUserEmail.mockRejectedValue(new Error("error"));
    const user = userEvent.setup();
    EditEmailTest();
    const button = screen.getByRole("button", { name: "Cambiar" });
    await user.click(button);
    expect(screen.queryByText("El email se ha cambiado correctamente")).toBeNull();
  });

  it("Should update user's email", async () => {
    changeUserEmail.mockResolvedValue({ data: { message: "success" } });
    const user = userEvent.setup();
    EditEmailTest();
    const button = screen.getByRole("button", { name: "Cambiar" });
    await user.click(button);
    expect(screen.getByText("El email se ha cambiado correctamente")).toBeInTheDocument();
  });
});
