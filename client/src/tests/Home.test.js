import { screen } from "@testing-library/react";
import { HomeTest } from "./helpers";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Home component", () => {
  it("Should fetch data from Offers component to render the offer products", async () => {
    HomeTest();
    expect(screen.getByText("Calzado")).toBeInTheDocument();
    expect(screen.getByText("Camisetas")).toBeInTheDocument();
    expect(screen.getByText("Ropa deportiva")).toBeInTheDocument();
    expect(screen.getByText("Bolsos y maletas")).toBeInTheDocument();
  });
});
