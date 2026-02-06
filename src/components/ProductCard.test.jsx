import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import ProductCard from "./ProductCard";

const mockProduct = {
  id: "test-123",
  model: "Galaxy S21",
  price: "999",
  brand: "Samsung",
  imgUrl: "https://example.com/phone.jpg",
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProductCard", () => {
  test("renders product information", () => {
    renderWithRouter(<ProductCard {...mockProduct} />);

    expect(screen.getByText("Galaxy S21")).toBeInTheDocument();
    expect(screen.getByText("Price: $999")).toBeInTheDocument();
    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });

  test("renders product image", () => {
    renderWithRouter(<ProductCard {...mockProduct} />);

    const image = screen.getByAltText("Galaxy S21");
    expect(image).toHaveAttribute("src", "https://example.com/phone.jpg");
  });

  test("links to product detail page", () => {
    renderWithRouter(<ProductCard {...mockProduct} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/product/test-123");
  });

  test("has correct CSS class", () => {
    renderWithRouter(<ProductCard {...mockProduct} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("product-card");
  });
});
