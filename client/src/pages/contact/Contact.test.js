import { ContactTest } from "../../tests/test.utils";
import { getStoreInformation } from "../../services/store";

jest.mock("../../services/store", () => ({
  getStoreInformation: jest.fn(),
  getStorePhones: jest.fn(),
}));

beforeEach(() => {
  ContactTest();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Contact component", () => {
  it("Should fetch store's information", async () => {
    // All Testing Library utils are already wrapped in act.
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-unnecessary-act.md
    // https://www.robinwieruch.de/react-testing-library/}
    getStoreInformation.mockReturnValue({ data: {} });
    expect(getStoreInformation).toHaveBeenCalledTimes(1);
  });
});
