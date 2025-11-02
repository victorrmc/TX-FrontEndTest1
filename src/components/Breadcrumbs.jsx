import React from "react";
import { Link } from "react-router";
import "./breadcrumbs.css";
function Breadcrumbs({ itemName }) {
  return (
    <nav>
      <ul>
        <li key={"Products"}>
          <Link to={"/"}>Products</Link>
        </li>
        {itemName && (
          <li key={"item"}>
            <p>{itemName}</p>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
