import "./ProductCard.css";
import { Link } from "react-router";

function ProductCard({ id, model, price, brand, imgUrl }) {
  return (
    <Link to={`/product/${id}`} className="product-card">
      <h2>{model}</h2>
      <p>Price: ${price}</p>
      <p>{brand}</p>
      <img src={imgUrl} alt={model} width="200" />
    </Link>
  );
}

export default ProductCard;
