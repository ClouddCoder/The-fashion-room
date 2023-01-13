import ReactDOM from "react-dom";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { PhoneTest, mockUserPhone } from "../../tests/test.utils";
import { getPhone } from "../../services/user";

jest.mock("../../services/user");

beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element, node) => element);
});

afterEach(() => {
  jest.clearAllMocks();
  ReactDOM.createPortal.mockClear();
});

describe.skip("Phone component", () => {
  it("Should render the differents phones", async () => {
    getPhone.mockResolvedValue({ data: mockUserPhone });
    PhoneTest();
    expect(await screen.findByText("123456789")).toBeInTheDocument();
    expect(await screen.findByText("987654321")).toBeInTheDocument();
  });
});
