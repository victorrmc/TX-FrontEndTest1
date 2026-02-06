import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

const mockProducts = [
  { id: "ZmGrkLRPXOTpxsU4jjAcv", brand: "Acer", model: "Iconia Talk S" },
  { id: "cGjFJlmqNPIwU59AOcY8H", brand: "Acer", model: "Liquid Z6 Plus" },
  { id: "AasKFs5EGbyAEIKkcHQcF", brand: "alcatel", model: "Flash (2017)" },
];

describe("SearchBar", () => {
  test("filters products by brand", async () => {
    const user = userEvent.setup();
    const onFilterMock = vi.fn();
    render(<SearchBar products={mockProducts} onFilter={onFilterMock} />);

    const input = screen.getByPlaceholderText("Buscar productos...");
    await user.type(input, "Acer");

    expect(onFilterMock).toHaveBeenLastCalledWith([
      { id: "ZmGrkLRPXOTpxsU4jjAcv", brand: "Acer", model: "Iconia Talk S" },
      { id: "cGjFJlmqNPIwU59AOcY8H", brand: "Acer", model: "Liquid Z6 Plus" },
    ]);
  });

  test("filters products by model", async () => {
    const user = userEvent.setup();
    const onFilterMock = vi.fn();
    render(<SearchBar products={mockProducts} onFilter={onFilterMock} />);

    const input = screen.getByPlaceholderText("Buscar productos...");
    await user.type(input, "Liquid Z6 Plus");

    expect(onFilterMock).toHaveBeenLastCalledWith([
      { id: "cGjFJlmqNPIwU59AOcY8H", brand: "Acer", model: "Liquid Z6 Plus" },
    ]);
  });

  test("returns empty array when no matches", async () => {
    const user = userEvent.setup();
    const onFilterMock = vi.fn();
    render(<SearchBar products={mockProducts} onFilter={onFilterMock} />);

    const input = screen.getByPlaceholderText("Buscar productos...");
    await user.type(input, "Samsung");

    expect(onFilterMock).toHaveBeenLastCalledWith([]);
  });
});
