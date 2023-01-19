import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { CatalogueTest } from "../../tests/test.utils";
import { productContextProps } from "../../tests/mockedData";

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Catalogue component", () => {
  test("Should call loadProducts function to get the products", () => {
    CatalogueTest();
    expect(productContextProps.loadProducts).toHaveBeenCalledTimes(1);
  });

  test("Should add a product to the wishlist", async () => {
    const user = userEvent.setup();
    CatalogueTest();
    await user.click(screen.getByRole("button", { name: /tenis-colegial/i }));
    expect(productContextProps.handleWish).toHaveBeenCalledTimes(1);
  });

  test("Should render filtered products by gender", async () => {
    const user = userEvent.setup();
    CatalogueTest();
    await user.click(screen.getByRole("checkbox", { name: /hombre/i }));
    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(2);
  });
});
