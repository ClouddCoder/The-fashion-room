import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { EditEmailTest } from "../../tests/test.utils";

describe.skip("EditEmail component", () => {
  it("Should render inputs", () => {
    EditEmailTest();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("newEmail")).toBeInTheDocument();
  });

  it("Should render input's title", () => {
    EditEmailTest();
    expect(screen.getByText("Email anterior")).toBeInTheDocument();
    expect(screen.getByText("Email nuevo")).toBeInTheDocument();
  });

  it("Should type emails' input", async () => {
    const user = userEvent.setup();
    EditEmailTest();
    const inputEmail = screen.getByRole("textbox", { name: "email" });
    const inputNewEmail = screen.getByRole("textbox", { name: "newEmail" });
    await user.type(inputEmail, "brayan");
    await user.type(inputNewEmail, "lucas");
    expect(inputEmail).toHaveValue("brayan");
    expect(inputNewEmail).toHaveValue("lucas");
  });
});
