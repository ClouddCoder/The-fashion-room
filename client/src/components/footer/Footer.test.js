import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { FooterTest } from "../../tests/test.utils";

describe.skip("Footer component", () => {
  it("Should render the footer component", () => {
    FooterTest();
    expect(screen.getByText("Conócenos")).toBeInTheDocument();
    expect(screen.getByText("Trabaja en The Fashion Room")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Acerca de The Fashion Room")).toBeInTheDocument();
    expect(screen.getByText("Gana dinero con nosotros")).toBeInTheDocument();
    expect(
      screen.getByText("Vender productos en The Fashion Room"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Vender en The Fashion Room business"),
    ).toBeInTheDocument();
    expect(screen.getByText("Programa de afiliados")).toBeInTheDocument();
    expect(screen.getByText("Redes sociales")).toBeInTheDocument();
  });
});
