import { useState, useEffect, useContext } from "react";
import "./ProductDetail.css";
import { useParams } from "react-router";
import { CartCountContext } from "../context/CartCountContext.js";
import { ProductNameContext } from "../context/ProductNameContext.js";
import { useProduct, useAddToCart } from "../hooks/useProducts";

function ProductDetail() {
  const { setCartCount } = useContext(CartCountContext);
  const { setProductName } = useContext(ProductNameContext);

  const { productId } = useParams();
  const {
    isLoading,
    error,
    data: product,
  } = useProduct(productId);

  const colors = product?.options?.colors || [];
  const storages = product?.options?.storages || [];

  const [selectedColor, setSelectedColor] = useState();
  const [selectedStorage, setSelectedStorage] = useState();

  const addToCartMutation = useAddToCart({
    onSuccess: (data) => {
      setCartCount(data?.count);
      localStorage.setItem("cartCount", JSON.stringify(data?.count));
    },
    onError: (error) => {
      console.error("Error adding product to cart:", error);
    },
  });

  useEffect(() => {
    if (product) {
      setSelectedColor(product.options?.colors[0]?.code);
      setSelectedStorage(product.options?.storages[0]?.code);
      setProductName(product?.model || "");
    }
  }, [product, setProductName]);

  const handleAddToCart = () => {
    const payload = {
      id: product.id,
      colorCode: selectedColor ?? colors[0]?.code,
      storageCode: selectedStorage ?? storages[0]?.code,
    };
    addToCartMutation.mutate(payload);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.imgUrl} alt={product.model} />
        </div>
        <div className="product-detail-info">
          <div className="product-detail-description">
            <h2>
              {product.brand} {product.model}
            </h2>
            <p>
              <strong>Precio:</strong> ${product.price}
            </p>
            <p>
              <strong>CPU:</strong> {product.cpu}
            </p>
            <p>
              <strong>RAM:</strong> {product.ram}
            </p>
            <p>
              <strong>Sistema Operativo:</strong> {product.os}
            </p>
            <p>
              <strong>Resolucion de pantalla:</strong> {product.displaySize}
            </p>
            <p>
              {product.battery ? <strong>Bateria:</strong> : null}{" "}
              {product.battery}
            </p>
            <p>
              <strong>Camaras:</strong> {product.primaryCamera}{" "}
              {product.secondaryCamera ? ` / ${product.secondaryCamera}` : null}
            </p>
            <p>
              {product.dimensions ? <strong>Dimensiones:</strong> : null}{" "}
              {product.dimensions}
            </p>
            <p>
              {product.weight ? <strong>Peso:</strong> : null} {product.weight}
            </p>
          </div>
          <div className="product-detail-actions">
            <h3>Opciones</h3>
            <label>
              <strong>Color:</strong>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(Number(e.target.value))}
              >
                {colors.map((color) => (
                  <option key={color.code} value={color.code}>
                    {color.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <strong>Almacenamiento:</strong>
              <select
                value={selectedStorage}
                onChange={(e) => setSelectedStorage(Number(e.target.value))}
              >
                {storages.map((storage) => (
                  <option key={storage.code} value={storage.code}>
                    {storage.name}
                  </option>
                ))}
              </select>
            </label>
            <button 
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
            >
              {addToCartMutation.isPending ? "Anadiendo..." : "Anadir"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
