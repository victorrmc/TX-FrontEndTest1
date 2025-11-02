import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { CartCountContext } from "../context/CartCountContext.js";
import ProductList from "../components/ProductList.jsx";
const fetchProducts = () => {
  const response = fetch(
    "https://itx-frontend-test.onrender.com/api/product"
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

  return response;
};
function ProductListPage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [cartCount, setCartCount] = useState(() => {
    const storedCount = localStorage.getItem("cartCount");
    return storedCount ? JSON.parse(storedCount) : 0;
  });

  const [filteredProducts, setFilteredProducts] = useState();

  const handleFilter = (filtered) => {
    setFilteredProducts(filtered);
  };

  const cartCountProviderValue = {
    cartCount,
    setCartCount,
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <CartCountContext.Provider value={cartCountProviderValue}>
      <SearchBar products={data} onFilter={handleFilter} />
      <ProductList products={filteredProducts || data} />
    </CartCountContext.Provider>
  );
}

export default ProductListPage;
