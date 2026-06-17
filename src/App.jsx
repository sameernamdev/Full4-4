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

// export default function App() {
//   const [page, setPage] = useState("home");
//   const [showTop, setShowTop] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [page]);

//   useEffect(() => {
//     const h = () => setShowTop(window.scrollY > 400);
//     window.addEventListener("scroll", h);
//     return () => window.removeEventListener("scroll", h);
//   }, []);

//   const pages = {
//     home: HomePage,
//     products: ProductsPage,
//     brands: BrandsPage,
//     about: AboutPage,
//     contact: ContactPage,
//     ProductDetails:ProductDetailsPage
//   };

//   const PageComponent = pages[page] || HomePage;
//   const pageVariants = {
//     initial: { opacity: 0, y: 24, filter: "blur(8px)" },
//     animate: { opacity: 1, y: 0, filter: "blur(0px)" },
//     exit: { opacity: 0, y: -18, filter: "blur(8px)" },
//   };

//   return (
//     <>

//     <div className="light-theme min-h-screen bg-brand-dark text-brand-ink">
//       <Navbar currentPage={page} setPage={setPage} />
//       <main className="overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={page}
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <PageComponent setPage={setPage} />
//           </motion.div>
//         </AnimatePresence>
//       </main>
//       <Footer setPage={setPage} />

//       <AnimatePresence>
//         {showTop && (
//           <motion.button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="fixed bottom-8 right-8 w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center text-white shadow-2xl hover:bg-red-700 z-50"
//             initial={{ opacity: 0, y: 24, scale: 0.88 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 24, scale: 0.88 }}
//             whileHover={{ y: -4, scale: 1.06 }}
//             whileTap={{ scale: 0.94 }}
//             transition={{ duration: 0.22 }}
//           >
//             <ChevronUp size={20} />
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </div>
//         </>
//   );
// }



export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <AppRoutes/>
    <Footer/>
    </BrowserRouter>
  )
}

