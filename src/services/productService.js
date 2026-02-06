import { API_ENDPOINTS } from "../constants/api";

export const fetchProducts = async () => {
  const response = await fetch(API_ENDPOINTS.PRODUCTS);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchProductById = async (productId) => {
  const response = await fetch(API_ENDPOINTS.PRODUCT(productId));

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const addToCart = async (payload) => {
  const response = await fetch(API_ENDPOINTS.CART, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
