import React, { useEffect, useState, useContext } from "react";
import SearchBar from "../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import ProductList from "../components/ProductList.jsx";
import { ProductNameContext } from "../context/ProductNameContext.js";

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
  const [filteredProducts, setFilteredProducts] = useState();
  const { setProductName } = useContext(ProductNameContext);

  useEffect(() => {
    console.log("Clearing product name on ProductListPage mount");
    setProductName("");
  }, [setProductName]);

  const handleFilter = (filtered) => {
    setFilteredProducts(filtered);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <>
      <SearchBar products={data} onFilter={handleFilter} />
      <ProductList products={filteredProducts || data} />
    </>
  );
}

export default ProductListPage;
