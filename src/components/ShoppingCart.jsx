import React from "react";
import "./ShoppingCart.css";
import cartIcon from "/src/assets/shopping-cart.svg";
import { useContext } from "react";
import { CartCountContext } from "../context/CartCountContext.js";

function ShoppingCart() {
  const { cartCount } = useContext(CartCountContext);
  return (
    <div className="shopping-cart">
      <p>{cartCount}</p>
      <img src={cartIcon} alt="Shopping Cart" />
    </div>
  );
}

export default ShoppingCart;
