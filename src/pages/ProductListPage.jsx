import React from "react";
import ProductCard from "../components/ProductCard";
import "./ProductListPage.css";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = () => {
  const response = fetch("https://itx-frontend-test.onrender.com/api/product")
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching products:", error);
      return [];
    });

  return response;
};

function ProductListPage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <>
      <div className="product-list">
        {data?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}

export default ProductListPage;
