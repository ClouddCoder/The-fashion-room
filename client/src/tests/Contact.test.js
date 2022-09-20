import { screen } from "@testing-library/react";
import { ContactTest, mockStores, mockStorePhone } from "./helpers";
import axios from "axios";

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip("Contact component", () => {
  it("Should fetch store information", async () => {
    //const promise = Promise.resolve();
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockStores }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockStorePhone }));

    // All Testing Library utils are already wrapped in act.
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-unnecessary-act.md
    // https://www.robinwieruch.de/react-testing-library/
    ContactTest();

    /*
    await act(async () => {
      await promise;
    });
    */

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(await screen.findByText("Tienda 1")).toBeInTheDocument();
    expect(await screen.findByText("Teléfono: 987654321")).toBeInTheDocument();
  });
});
