import React, { use, useState } from "react";
import "./ProductDetail.css";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { CartCountContext } from "../context/CartCountContext.js";
import { ProductNameContext } from "../context/ProductNameContext.js";
import { useEffect } from "react";

const fetchProduct = (productId) => {
  return fetch(
    "https://itx-frontend-test.onrender.com/api/product/" + productId
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      return null;
    });
};

function ProductDetail() {
  const { setCartCount } = useContext(CartCountContext);
  const { setProductName } = useContext(ProductNameContext);

  const { productId } = useParams();
  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
  });

  const colors = product?.options?.colors || [];
  const storages = product?.options?.storages || [];

  const [selectedColor, setSelectedColor] = useState();
  const [selectedStorage, setSelectedStorage] = useState();

  useEffect(() => {
    if (product) {
      setSelectedColor(product.options?.colors[0]?.code);
      setSelectedStorage(product.options?.storages[0]?.code);
      setProductName(product?.model || "");
    }
  }, [product]);

  const handleAddToCart = () => {
    const payload = {
      id: product.id,
      colorCode: selectedColor ?? colors[0]?.code,
      storageCode: selectedStorage ?? storages[0]?.code,
    };
    fetch("https://itx-frontend-test.onrender.com/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCartCount(data?.count);
        localStorage.setItem("cartCount", JSON.stringify(data?.count));
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
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
              <strong>Resolución de pantalla:</strong> {product.displaySize}
            </p>
            <p>
              {product.battery ? <strong>Batería:</strong> : null}{" "}
              {product.battery}
            </p>
            <p>
              <strong>Cámaras:</strong> {product.primaryCamera}{" "}
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
            <button onClick={handleAddToCart}>Añadir</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
