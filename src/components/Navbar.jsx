// import { useState } from "react";
// import { Menu, X, ChevronDown, Search, ShoppingCart } from "lucide-react";
// import { NAV_LINKS } from "../data/data";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openSub, setOpenSub] = useState(null);
//   const [cartCount] = useState(3);

//   return (
//     <nav className="site-nav fixed top-0 left-0 right-0 z-[9999] bg-[#080808]/34 backdrop-blur-md py-5 border-b border-white/10 shadow-xl transition-all duration-500">
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//         {/* ── LOGO ── */}
//         <button className="flex items-center gap-4 group">
//           {/* <svg className="brand-mark transition-transform duration-300 group-hover:scale-105" viewBox="0 0 96 96" aria-hidden="true">
//             <path
//               fill="currentColor"
//               d="M13 16h54l18 18-37 37H29l31-31H13V16Zm34 48 18-18 21 34H58L47 64Z"
//             />
//           </svg> */}
//           <img src="./newRD.png" alt="" className="w-10" />

//           <div className="text-left leading-none">
//             <div className="brand-wordmark">
//               DRIVE <span className="text-brand-red">RANGER</span>
//             </div>
//           </div>
//         </button>

//         {/* ── DESKTOP NAV ── */}
//        {/* ── DESKTOP NAV ── */}
// <ul className="hidden lg:flex items-center gap-8 list-none text-white">
//   {NAV_LINKS.map((link) => (
//     <li key={link.page} className="relative group">
//       {link.sub ? (
//         <>
//           <button
//             className="nav-link font-label font-semibold text-[13px] tracking-[0.15em] uppercase flex items-center gap-1 pb-1 transition-colors hover:text-brand-red"
//           >
//             {link.label}
//             <ChevronDown
//               size={13}
//               className="transition-transform duration-300 group-hover:rotate-180"
//             />
//           </button>

//           {/* Dropdown */}
//           <div
//             className="
//               absolute
//               left-0
//               top-full
//               pt-2
//               w-64
//               z-[9999]
//               opacity-0
//               invisible
//               translate-y-2
//               group-hover:opacity-100
//               group-hover:visible
//               group-hover:translate-y-0
//               transition-all
//               duration-300
//               ease-out
//             "
//           >
//             <div
//               className="
//                 bg-[#111111]/95
//                 backdrop-blur-xl
//                 border
//                 border-white/10
//                 rounded-2xl
//                 overflow-hidden
//                 shadow-[0_20px_50px_rgba(0,0,0,.45)]
//               "
//             >
//               {link.sub.map((s) => (
//                 <Link
//                   key={s}
//                   to={`/products/${s.toLowerCase().replace(/\s+/g, "-")}`}
//                   className="
//                     block
//                     px-5
//                     py-3
//                     text-[15px]
//                     font-semibold
//                     text-white/80
//                     hover:text-white
//                     hover:bg-brand-red
//                     transition-all
//                     duration-200
//                   "
//                 >
//                   {s}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </>
//       ) : (
//         <Link
//           to={`/${link.page}`}
//           className="nav-link font-label font-semibold text-[13px] tracking-[0.15em] uppercase hover:text-brand-red transition-colors"
//         >
//           {link.label}
//         </Link>
//       )}
//     </li>
//   ))}
// </ul>

//         {/* ── ACTIONS ── */}
//         <div className="flex items-center gap-3">
//           <button className="hidden md:flex text-white/50 hover:text-white transition-colors p-2">
//             <Search size={18} />
//           </button>
//           <button className="relative p-2">
//             <ShoppingCart
//               size={20}
//               className="text-white/60 hover:text-white transition-colors"
//             />
//             <span
//               className="absolute -top-1 -right-1 w-5 h-5 bg-brand-red rounded-full
//               font-label font-bold text-[10px] flex items-center justify-center text-white"
//             >
//               {cartCount}
//             </span>
//           </button>
//           <Link
//             to={`/contact`}
//             className="hidden md:block btn-clip btn-shine bg-brand-red text-white
//               font-label font-bold text-[13px] tracking-[0.2em] uppercase
//               px-6 py-2.5 hover:bg-brand-red2 transition-colors"
//           >
//             Get Quote
//           </Link>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="lg:hidden text-white p-1"
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* ── MOBILE MENU ── */}
//       {menuOpen && (
//         <div className="lg:hidden bg-[#080808]/58 backdrop-blur-lg border-t border-white/10 px-6 py-6 space-y-4 mt-2">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.page}
//               to={`/${link.page}`}
//               className="block w-full text-left font-label font-semibold text-[15px] tracking-wide
//                 text-white/70 hover:text-brand-red py-2 border-b border-white/5 transition-colors"
//             >
//               {link.label}
//             </Link>
//           ))}
//           <button
//             className="w-full btn-clip bg-brand-red text-white font-label font-bold
//               py-3 tracking-[0.15em] uppercase text-sm"
//           >
//             Get Quote
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }














import { useState } from "react";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <nav className="site-nav fixed top-0 left-0 right-0 z-[9999] bg-[#080808]/34 backdrop-blur-md py-5 border-b border-white/10 shadow-xl transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <img src="/newRD.png" alt="Drive Ranger" className="w-10" />

          <div className="text-left leading-none">
            <div className="brand-wordmark">
              DRIVE <span className="text-brand-red">RANGER</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 list-none text-white">

          <li>
            <Link
              to="/"
              className="nav-link font-label font-semibold text-[13px] tracking-[0.15em] uppercase transition-colors hover:text-brand-red"
            >
              Home
            </Link>
          </li>

          <li className="relative group">
            <Link
              to="/products"
              className="nav-link font-label font-semibold text-[13px] tracking-[0.15em] uppercase transition-colors hover:text-brand-red"
            >
              Products
            </Link>

            {/*
            Dropdown Future

            <div className="absolute left-0 top-full ...">
                ...
            </div>

            */}
          </li>

          <li>
            <Link
              to="/brands"
              className="nav-link font-label font-semibold text-[13px] tracking-[0.15em] uppercase transition-colors hover:text-brand-red"
            >
              Brands
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="nav-link font-label font-semibold text-[13px] tracking-[0.15em] uppercase transition-colors hover:text-brand-red"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="nav-link font-label font-semibold text-[13px] tracking-[0.15em] uppercase transition-colors hover:text-brand-red"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex text-white/50 hover:text-white transition-colors p-2">
            <Search size={18} />
          </button>

          <button className="relative p-2">
            <ShoppingCart
              size={20}
              className="text-white/60 hover:text-white transition-colors"
            />

            <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-red rounded-full font-label font-bold text-[10px] flex items-center justify-center text-white">
              {cartCount}
            </span>
          </button>

          <Link
            to="/contact"
            className="hidden md:block btn-clip btn-shine bg-brand-red text-white font-label font-bold text-[13px] tracking-[0.2em] uppercase px-6 py-2.5 hover:bg-brand-red2 transition-colors"
          >
            Get Quote
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-1"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#080808]/58 backdrop-blur-lg border-t border-white/10 px-6 py-6 space-y-4 mt-2">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block font-label font-semibold text-[15px] tracking-wide text-white/70 hover:text-brand-red py-2 border-b border-white/5 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block font-label font-semibold text-[15px] tracking-wide text-white/70 hover:text-brand-red py-2 border-b border-white/5 transition-colors"
          >
            Products
          </Link>

          <Link
            to="/brands"
            onClick={() => setMenuOpen(false)}
            className="block font-label font-semibold text-[15px] tracking-wide text-white/70 hover:text-brand-red py-2 border-b border-white/5 transition-colors"
          >
            Brands
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block font-label font-semibold text-[15px] tracking-wide text-white/70 hover:text-brand-red py-2 border-b border-white/5 transition-colors"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block font-label font-semibold text-[15px] tracking-wide text-white/70 hover:text-brand-red py-2 border-b border-white/5 transition-colors"
          >
            Contact
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block text-center btn-clip bg-brand-red text-white font-label font-bold py-3 tracking-[0.15em] uppercase text-sm"
          >
            Get Quote
          </Link>
        </div>
      )}
    </nav>
  );
}