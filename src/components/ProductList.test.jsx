import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import ProductList from "./ProductList";

const mockProducts = [
  { id: "1", model: "Galaxy S21", price: "999", brand: "Samsung", imgUrl: "https://example.com/s21.jpg" },
  { id: "2", model: "iPhone 13", price: "1099", brand: "Apple", imgUrl: "https://example.com/iphone13.jpg" },
  { id: "3", model: "Pixel 6", price: "599", brand: "Google", imgUrl: "https://example.com/pixel6.jpg" },
];

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProductList", () => {
  test("renders all products", () => {
    renderWithRouter(<ProductList products={mockProducts} />);

    expect(screen.getByText("Galaxy S21")).toBeInTheDocument();
    expect(screen.getByText("iPhone 13")).toBeInTheDocument();
    expect(screen.getByText("Pixel 6")).toBeInTheDocument();
  });

  test("renders correct number of product cards", () => {
    renderWithRouter(<ProductList products={mockProducts} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  test("renders empty list when no products", () => {
    renderWithRouter(<ProductList products={[]} />);

    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(0);
  });

  test("handles undefined products", () => {
    renderWithRouter(<ProductList products={undefined} />);

    const container = document.querySelector(".product-list");
    expect(container).toBeInTheDocument();
  });

  test("displays product prices", () => {
    renderWithRouter(<ProductList products={mockProducts} />);

    expect(screen.getByText("Price: $999")).toBeInTheDocument();
    expect(screen.getByText("Price: $1099")).toBeInTheDocument();
    expect(screen.getByText("Price: $599")).toBeInTheDocument();
  });

  test("displays product brands", () => {
    renderWithRouter(<ProductList products={mockProducts} />);

    expect(screen.getByText("Samsung")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
  });
});
