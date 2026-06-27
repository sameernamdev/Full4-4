import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import BrandsPage from "../pages/BrandsPage";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";
import ProductsDetails from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import RegisterPage from "../pages/login/RegisterPage";
import VerifyOTPPage from "../pages/login/VerifyOTPPage";
import LoginPage from "../pages/login/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import MyOrdersPage from "../pages/MyOrdersPage";
import OrderDetailsPage from "../pages/OrderDetailPage";
import CategoryPage from "../pages/CategoryPage";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products/:id" element={<ProductsDetails />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/category/:categoryId" element={<CategoryPage/>}/>

        {/* login */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* orders */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrdersPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
