import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { LoginTest, authContextProps } from "../../tests/test.utils";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Login component", () => {
  it("Should render Login component", () => {
    LoginTest();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("Should type email and password's inputs", async () => {
    const user = userEvent.setup();
    LoginTest();

    const inputEmail = screen.getByLabelText("Email");
    await user.type(inputEmail, "brayan");
    const inputPassword = screen.getByLabelText("Password");
    await user.type(inputPassword, "1234");
    expect(inputEmail).toHaveValue("brayan");
    expect(inputPassword).toHaveValue("1234");
    expect(authContextProps.setUserEmail).toHaveBeenCalledTimes(6);
    expect(authContextProps.setUserPassword).toHaveBeenCalledTimes(4);
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
    expect(fetch).toReturnWith(Promise.resolve({ json: () => Promise.resolve(userInfo) }));
    expect(authContextProps.setAuth).toHaveBeenCalledTimes(1);
    expect(authContextProps.setUserId).toHaveBeenCalledTimes(1);
    expect(authContextProps.setUser).toHaveBeenCalledTimes(1);
    expect(authContextProps.setUserEmail).toHaveBeenCalledTimes(1);
    expect(authContextProps.setUserPassword).toHaveBeenCalledTimes(1);
  });
});
