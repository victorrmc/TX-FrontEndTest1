import React from "react";
import "./ShoppingCart.css";

function ShoppingCart() {
  const cartCount = localStorage.getItem("cartCount");
  return (
    <div className="shopping-cart">
      <p>{cartCount}</p>
      <img src="/src/assets/shopping-cart.svg" alt="Shopping Cart" />
    </div>
  );
}

export default ShoppingCart;
