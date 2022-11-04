import { screen } from "@testing-library/react";
import { HomeTest } from "./helpers";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Home component", () => {
  it("Offers component should fetch data to render the offer products' cards", async () => {
    HomeTest();
    expect(screen.getByText("Calzado")).toBeInTheDocument();
    expect(screen.getByText("Camisetas")).toBeInTheDocument();
    expect(screen.getByText("Ropa deportiva")).toBeInTheDocument();
    expect(screen.getByText("Bolsos y maletas")).toBeInTheDocument();
  });
});
