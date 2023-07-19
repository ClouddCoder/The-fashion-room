import { screen } from "@testing-library/react";
import {
  StoreInfoTest,
  mockStores,
  mockStorePhone,
} from "../../../tests/test.utils";
import { getStoreAddress, getStorePhones } from "../../../services/store";

jest.mock("../../../services/store", () => ({
  __esModule: true,
  getStoreAddress: jest.fn(),
  getStorePhones: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("StoreInfo component", () => {
  it("Should call getStoreAddress method", () => {
    getStoreAddress.mockResolvedValue({ data: mockStorePhone });
    StoreInfoTest();
    expect(getStoreAddress).toHaveBeenCalledTimes(1);
  });

  it("Should render the phones of every store", async () => {
    getStorePhones.mockResolvedValue({ data: mockStorePhone });
    StoreInfoTest();
    expect(await screen.findByText(/123456789/)).toBeInTheDocument();
  });
});
