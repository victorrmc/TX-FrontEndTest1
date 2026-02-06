import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetail from "../pages/ProductDetail";
import { CartCountContext } from "../context/CartCountContext";
import { ProductNameContext } from "../context/ProductNameContext";
import * as productService from "../services/productService";

vi.mock("../services/productService");

const mockProduct = {
  id: "test-123",
  brand: "Samsung",
  model: "Galaxy S21",
  price: "999",
  cpu: "Exynos 2100",
  ram: "8GB",
  os: "Android 11",
  displaySize: "6.2 inches",
  imgUrl: "https://example.com/s21.jpg",
  options: {
    colors: [{ code: 1, name: "Gray" }],
    storages: [{ code: 1, name: "128GB" }],
  },
};

function renderProductDetail(setCartCount = vi.fn()) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <CartCountContext.Provider value={{ cartCount: 0, setCartCount }}>
        <ProductNameContext.Provider value={{ productName: "", setProductName: vi.fn() }}>
          <BrowserRouter>
            <Routes>
              <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
          </BrowserRouter>
        </ProductNameContext.Provider>
      </CartCountContext.Provider>
    </QueryClientProvider>
  );
}

describe("ProductDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, "", "/product/test-123");
  });

  test("shows loading state", () => {
    productService.fetchProductById.mockImplementation(() => new Promise(() => {}));
    renderProductDetail();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders product data", async () => {
    productService.fetchProductById.mockResolvedValue(mockProduct);
    renderProductDetail();

    await waitFor(() => {
      expect(screen.getByText("Samsung Galaxy S21")).toBeInTheDocument();
    });
    expect(screen.getByText(/\$999/)).toBeInTheDocument();
  });

  test("shows error on API failure", async () => {
    productService.fetchProductById.mockRejectedValue(new Error("API Error"));
    renderProductDetail();

    await waitFor(() => {
      expect(screen.getByText("Error loading product")).toBeInTheDocument();
    });
  });

  test("adds product to cart", async () => {
    const user = userEvent.setup();
    const setCartCount = vi.fn();

    productService.fetchProductById.mockResolvedValue(mockProduct);
    productService.addToCart.mockResolvedValue({ count: 1 });

    renderProductDetail(setCartCount);

    await waitFor(() => {
      expect(screen.getByText("Samsung Galaxy S21")).toBeInTheDocument();
    });

    const addButton = screen.getByRole("button", { name: /anadir/i });
    await user.click(addButton);

    await waitFor(() => {
      expect(productService.addToCart).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(setCartCount).toHaveBeenCalledWith(1);
    });
  });
});
