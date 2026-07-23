// import { useState, useEffect } from "react";
// import { ChevronUp, } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";
// import ProductsPage from "./pages/ProductsPage";
// import BrandsPage from "./pages/BrandsPage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import ProductDetailsPage from "./pages/ProductDetailsPage";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./appRoutes/appRoute";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { getGuestToken } from "./config/axios";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const initGuest = async () => {
      // Check if token already exists, if not, fetch it
      if (!localStorage.getItem("guestToken")) {
        await getGuestToken();
      }
      setIsTokenReady(true);
    };
    initGuest();
  }, []);

  if (!isTokenReady) {
    return <div>Loading...</div>; // Prevents api calls before token is ready
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        <Footer />
      </BrowserRouter>
    </>
  );
}
