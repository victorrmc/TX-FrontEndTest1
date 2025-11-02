import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import Breadcrumbs from "./components/Breadcrumbs.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1h
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
