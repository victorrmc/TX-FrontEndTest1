import React from "react";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { Link } from "react-router";
import "./Header.css";
import ShoppingCart from "./ShoppingCart.jsx";
function Header({ itemName }) {
  return (
    <div className="header">
      <div className="header-main">
        <Link to="/">
          <h1>My Product Store</h1>
        </Link>
        <Breadcrumbs itemName={itemName} />
      </div>
      <ShoppingCart />
    </div>
  );
}

export default Header;
