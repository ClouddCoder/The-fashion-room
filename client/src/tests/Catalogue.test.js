import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { CatalogueTest, productContextProps } from "./helpers";

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Catalogue component", () => {
  test("Calls the loadProducts function to load the products", async () => {
    CatalogueTest();
    expect(productContextProps.loadProducts).toHaveBeenCalledTimes(1);
  });

  test("Adds product to wishlist", async () => {
    const user = userEvent.setup();

    CatalogueTest("wishlist");
    await user.click(screen.getByRole("button", { name: /Add tenis-colegial to wishlist/i }));
    expect(productContextProps.handleWish).toHaveBeenCalledTimes(1);
  });

  test("Should render filtered products by gender", async () => {
    const user = userEvent.setup();

    CatalogueTest();
    await user.click(screen.getByRole("checkbox", { name: /hombre/i }));
    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(1);
  });
});
