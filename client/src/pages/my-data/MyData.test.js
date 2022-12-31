import React from "react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { MyDataTest } from "../../tests/test.utils";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("MyData component", () => {
  it("Should redirect to /edit-data/email", async () => {
    const user = userEvent.setup();
    const route = "/edit-data/email";

    // eslint-disable-next-line react/jsx-indent
    <MemoryRouter initialEntries={[route]}>{MyDataTest()}</MemoryRouter>;

    //const link = screen.getByText("Email");
    //await user.click(link);
    //expect(window.location.pathname).toEqual("/edit-data/email");
    expect(screen.getByText("Mis datos")).toBeInTheDocument();
  });
});
