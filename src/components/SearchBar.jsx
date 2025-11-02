import React, { useState } from "react";
import "./SearchBar.css"; // Importa el CSS

function SearchBar({ products, onFilter }) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filtered = products.filter(
      (product) =>
        product.brand.toLowerCase().includes(value.toLowerCase()) ||
        product.model.toLowerCase().includes(value.toLowerCase())
    );
    onFilter(filtered);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchText}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
