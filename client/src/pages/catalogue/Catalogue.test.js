import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { CatalogueTest, productContextProps } from "../../tests/test.utils";

jest.mock("axios");

beforeEach(() => {
  CatalogueTest();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Catalogue component", () => {
  test("Should call loadProducts function to get the products", () => {
    expect(productContextProps.loadProducts).toHaveBeenCalledTimes(1);
  });

  test("Should add a product to the wishlist", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Add tenis-colegial to wishlist/i }));
    expect(productContextProps.handleWish).toHaveBeenCalledTimes(1);
  });

  test("Should render filtered products by gender", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("checkbox", { name: /hombre/i }));
    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(2);
  });
});
