import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { CatalogueTest, productContextProps, contextPropstToAddToCart } from "./helpers";
import axios from "axios";

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Catalogue component", () => {
  test("Calls the loadProducts function to load the products", async () => {
    CatalogueTest("catalogue");
    expect(productContextProps.loadProducts).toHaveBeenCalledTimes(1);
  });

  test("Calls the addToCart function", async () => {
    const user = userEvent.setup();

    CatalogueTest("cart");
    await user.click(screen.getByRole("button", { name: /Agregar al carrito/i }));
    expect(contextPropstToAddToCart.addToCart).toHaveBeenCalledTimes(1);
  });

  test("Press the wishlist button to add a product to the wishlist", async () => {
    const user = userEvent.setup();
    const postData = { productId: 62, remove: false };
    axios.post.mockImplementationOnce(() => Promise.resolve({ data: postData }));

    CatalogueTest("wishlist");
    await user.click(screen.getByRole("button", { name: /Wishlist/i }));
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
