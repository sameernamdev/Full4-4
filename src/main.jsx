import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductProvider from "./context/ProductProvider.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <ProductProvider>
    <CartProvider>
    <App />
    </CartProvider>
    
  </ProductProvider>
  </AuthProvider>
);
