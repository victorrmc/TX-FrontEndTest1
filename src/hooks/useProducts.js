import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProducts, fetchProductById, addToCart } from "../services/productService";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useProduct(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });
}

export function useAddToCart(callbacks = {}) {
  return useMutation({
    mutationFn: addToCart,
    onSuccess: callbacks.onSuccess,
    onError: callbacks.onError,
  });
}
