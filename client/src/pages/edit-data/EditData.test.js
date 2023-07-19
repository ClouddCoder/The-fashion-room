import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { EditDataTest } from "../../tests/test.utils";
import * as services from "../../services/user";

jest.mock("../../services/user");

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("EditData component", () => {
  it("Should render the input", () => {
    EditDataTest();
    expect(screen.getByLabelText("new-email")).toBeInTheDocument();
  });

  it("Should render input's title", () => {
    EditDataTest();
    expect(screen.getByText("Email nuevo")).toBeInTheDocument();
  });

  it("Should type emails' input", async () => {
    const user = userEvent.setup();
    EditDataTest();
    const inputNewEmail = screen.getByRole("textbox", { name: "new-email" });
    await user.type(inputNewEmail, "lucas");
    expect(inputNewEmail).toHaveValue("lucas");
  });

  it("The new message should not render before user's email is updated", async () => {
    services.changeUserEmail.mockRejectedValue({
      response: { data: { message: "error" } },
    });
    const user = userEvent.setup();
    EditDataTest();
    const button = screen.getByRole("button", { name: "Cambiar" });
    await user.click(button);
    expect(
      screen.queryByText("El email se ha cambiado correctamente"),
    ).toBeNull();
  });

  it("Should update user's email", async () => {
    services.changeUserEmail.mockResolvedValue({
      data: { message: "success" },
    });
    const user = userEvent.setup();
    EditDataTest();
    const button = screen.getByRole("button", { name: "Cambiar" });
    await user.click(button);
    expect(
      screen.getByText("El email se ha cambiado correctamente"),
    ).toBeInTheDocument();
  });
});
