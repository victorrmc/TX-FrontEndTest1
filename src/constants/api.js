export const API_BASE_URL = "https://itx-frontend-test.onrender.com/api";

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/product`,
  PRODUCT: (id) => `${API_BASE_URL}/product/${id}`,
  CART: `${API_BASE_URL}/cart`,
};

export const QUERY_KEYS = {
  PRODUCTS: "products",
  PRODUCT: "product",
};

export const CACHE_TIME = {
  ONE_HOUR: 1000 * 60 * 60,
};
