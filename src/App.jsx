import React, { useState } from "react";
import mockdata from "./mock/mock-data.json";
import ProductListPage from "./pages/ProductListPage.jsx";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";

function App() {
  const [products] = useState(mockdata);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilter = (filtered) => {
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Header />
      <SearchBar products={products} onFilter={handleFilter} />
      <ProductListPage products={filteredProducts} />
    </>
  );
}

export default App;
