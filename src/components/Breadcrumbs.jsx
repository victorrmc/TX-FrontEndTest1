import { Link } from "react-router";
import "./breadcrumbs.css";
import { useContext } from "react";
import { ProductNameContext } from "../context/ProductNameContext.js";

function Breadcrumbs() {
  const { productName: itemName } = useContext(ProductNameContext);

  return (
    <nav aria-label="Breadcrumb">
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
