import { screen } from "@testing-library/react";
import { ProductTest } from "./helpers";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Catalogue component", () => {
  test("Should render Product component", async () => {
    ProductTest();
    expect(screen.getByText("negro")).toBeInTheDocument();
  });
});
