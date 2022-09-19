import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { InvoiceTest, productProps } from "./helpers";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Invoice component", () => {
  it("Should render invoice component", () => {
    InvoiceTest();
    expect(screen.getByText("Detalles de la compra")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("Productos")).toBeInTheDocument();
    //expect(screen.getByText("Blusa x0")).toBeInTheDocument();
  });

  it("Should call function clearCart after click button", async () => {
    const user = userEvent.setup();
    InvoiceTest();
    await user.click(screen.getByText("Seguir comprando"));
    expect(productProps.clearCart).toHaveBeenCalledTimes(1);
  });
});
