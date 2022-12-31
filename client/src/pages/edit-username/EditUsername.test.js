import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { EditUsernameTest } from "../../tests/test.utils";
import { changeUsername } from "../../services/user";

jest.mock("../../services/user", () => ({
  changeUsername: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("EditUsername component", () => {
  it("Should type in the input", async () => {
    const user = userEvent.setup();
    EditUsernameTest();
    const input = screen.getByRole("textbox", { name: "new-username" });
    await user.type(input, "newUsername");
    expect(input).toHaveValue("newUsername");
  });

  it("The new message should not render before user's username is updated", async () => {
    changeUsername.mockRejectedValue({ response: { data: { message: "error" } } });
    const user = userEvent.setup();
    EditUsernameTest();
    const button = screen.getByRole("button", { name: "Cambiar" });
    await user.click(button);
    expect(screen.queryByText("El username se ha cambiado correctamente")).toBeNull();
    console.log(changeUsername.mock.results);
  });

  it("Should update the user's username", async () => {
    changeUsername.mockResolvedValue({ data: { message: "success" } });
    const user = userEvent.setup();
    EditUsernameTest();
    const button = screen.getByRole("button", { name: "Cambiar" });
    await user.click(button);
    expect(screen.getByText("El username se ha cambiado correctamente")).toBeInTheDocument();
  });
});
