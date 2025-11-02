import ProductListPage from "./pages/ProductListPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductDetail from "./pages/ProductDetail.jsx";
import Header from "./components/Header.jsx";
import { ProductNameContext } from "./context/ProductNameContext.js";
import { useState } from "react";
import { CartCountContext } from "./context/CartCountContext.js";

function App() {
  const [productName, setProductName] = useState("");
  const [cartCount, setCartCount] = useState(() => {
    const storedCount = localStorage.getItem("cartCount");
    return storedCount ? JSON.parse(storedCount) : 0;
  });

  return (
    <BrowserRouter>
      <ProductNameContext.Provider value={{ productName, setProductName }}>
        <CartCountContext.Provider value={{ cartCount, setCartCount }}>
          <Header />
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
          </Routes>
        </CartCountContext.Provider>
      </ProductNameContext.Provider>
    </BrowserRouter>
  );
}

export default App;
