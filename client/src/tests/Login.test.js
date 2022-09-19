import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { LoginTest, loginAuthContextProps } from "./helpers";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Login component", () => {
  it("Render login", () => {
    LoginTest();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("Should type email and password inputs", async () => {
    const user = userEvent.setup();
    LoginTest();

    const inputEmail = await screen.findByLabelText("Email");
    await user.type(inputEmail, "brayan");
    const inputPassword = await screen.findByLabelText("Password");
    await user.type(inputPassword, "1234");
    expect(loginAuthContextProps.setUserEmail).toHaveBeenCalledTimes(6);
    expect(loginAuthContextProps.setUserPassword).toHaveBeenCalledTimes(4);
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
      "body": '{"userEmail":"","userPassword":""}',
      "headers": { "Content-Type": "application/json" },
      "method": "POST",
    });
    expect(fetch).toReturnWith(Promise.resolve({ json: () => Promise.resolve(userInfo) }));
    expect(loginAuthContextProps.setAuth).toHaveBeenCalledTimes(1);
    expect(loginAuthContextProps.setUserId).toHaveBeenCalledTimes(1);
    expect(loginAuthContextProps.setUser).toHaveBeenCalledTimes(1);
    expect(loginAuthContextProps.setUserEmail).toHaveBeenCalledTimes(1);
    expect(loginAuthContextProps.setUserPassword).toHaveBeenCalledTimes(1);
    //expect(loginAuthContextProps.setToken).toHaveBeenCalledTimes(1);
  });
});
