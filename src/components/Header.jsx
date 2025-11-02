import Breadcrumbs from "./Breadcrumbs.jsx";
import { Link } from "react-router";
import "./Header.css";
import ShoppingCart from "./ShoppingCart.jsx";
function Header() {
  return (
    <div className="header">
      <div className="header-main">
        <Link to="/">
          <h1>My Product Store</h1>
        </Link>
        <Breadcrumbs />
      </div>
      <ShoppingCart />
    </div>
  );
}

export default Header;
