import { useEffect, useState, useContext } from "react";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList.jsx";
import { ProductNameContext } from "../context/ProductNameContext.js";
import { useProducts } from "../hooks/useProducts";

function ProductListPage() {
  const { isLoading, error, data } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState();
  const { setProductName } = useContext(ProductNameContext);

  useEffect(() => {
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
