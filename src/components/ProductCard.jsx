import React from "react";
import "./ProductCard.css";
import { Link } from "react-router";

function ProductCard(item) {
  return (
    <Link to={`/product/${item.id}`} className="product-card">
      <h2>{item.model}</h2>
      <p>Price: ${item.price}</p>
      <p>{item.brand}</p>
      <img src={item.imgUrl} alt={item.model} width="200" />
    </Link>
  );
}

export default ProductCard;
