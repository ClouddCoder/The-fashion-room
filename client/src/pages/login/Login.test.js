import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { LoginTest } from "../../tests/test.utils";
import { authContextProps } from "../../tests/mockedData";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Login component", () => {
  it("Should render Login component", () => {
    LoginTest();
    expect(
      screen.getByRole("heading", { name: "Iniciar sesión" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("Email input should have user@user.com and Password input 1234 as values", () => {
    LoginTest();

    const inputEmail = screen.getByRole("textbox", { name: "Email" });

    const inputPassword = screen.getByLabelText("Password");

    expect(inputEmail).toHaveValue("user@user.com");
    expect(inputPassword).toHaveValue("1234");
  });

  it("Should type on the inputs and call the set method of the useState because of the onChange method", async () => {
    const user = userEvent.setup();
    LoginTest();

    const inputEmail = screen.getByRole("textbox", { name: "Email" });

    await user.type(inputEmail, "user@user.com");
    expect(authContextProps.setUserEmail).toHaveBeenCalledTimes(13);
  });

  it("Should call handlesubmit function to fetch data", async () => {
    const user = userEvent.setup();

    // Mock fetch data
    const userInfo = {
      userAuth: true,
      userId: 1,
      userName: "brayan",
      token: "token",
      status: 200,
    };

    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(userInfo),
      }),
    );

    LoginTest();

    const button = screen.getByRole("button", { name: "Login" });
    await user.click(button);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3050/api/login", {
      // eslint-disable-next-line quotes
      body: '{"userEmail":"user@user.com","userPassword":"1234"}',
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    expect(fetch).toReturnWith(
      Promise.resolve({ json: () => Promise.resolve(userInfo) }),
    );
    expect(authContextProps.setAuth).toHaveBeenCalledTimes(1);
    expect(authContextProps.setUserId).toHaveBeenCalledTimes(1);
    expect(authContextProps.setUser).toHaveBeenCalledTimes(1);
    expect(authContextProps.setUserEmail).toHaveBeenCalledTimes(1);
    expect(authContextProps.setUserPassword).toHaveBeenCalledTimes(1);
  });
});
