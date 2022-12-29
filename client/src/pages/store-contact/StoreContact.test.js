import { screen } from "@testing-library/react";
import { StoreContactTest, mockStores, mockStorePhone } from "../../tests/test.utils";
import { getStoreInformation, getStorePhones } from "../../services/store";

/**
 * Mocking the store services. It's important to set the return value
 * inside the test/it block, otherwise the mock will return undefined.
 */
jest.mock("../../services/store", () => ({
  __esModule: true,
  getStoreInformation: jest.fn(),
  getStorePhones: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Contact component", () => {
  it("Should fetch and render store's information", async () => {
    // All Testing Library utils are already wrapped in act.
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-unnecessary-act.md
    // https://www.robinwieruch.de/react-testing-library/}
    getStoreInformation.mockReturnValue({ data: mockStores });
    getStorePhones.mockReturnValue({ data: mockStorePhone });
    StoreContactTest();
    expect(await screen.findByText("Tienda 1")).toBeInTheDocument();
    expect(await screen.findByText(/123456789/)).toBeInTheDocument();
    expect(getStoreInformation).toHaveBeenCalledTimes(1);
    expect(getStorePhones).toHaveBeenCalledTimes(1);
  });
});
