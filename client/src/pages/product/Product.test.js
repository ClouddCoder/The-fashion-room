import { screen } from "@testing-library/react";
import { ProductTest } from "../../tests/test.utils";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Catalogue component", () => {
  test("Should render variant's color buttons", async () => {
    ProductTest();
    expect(screen.getByRole("button", { name: /negro/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /rojo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /blanco/i })).toBeInTheDocument();
  });
});
