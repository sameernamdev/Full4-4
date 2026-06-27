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



import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  UserCircle,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const profileRef = useRef(null);

  // Close profile on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // Prevent scrolling
  useEffect(() => {
    document.body.style.overflow =
      menuOpen || profileOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen, profileOpen]);

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Don't allow both together
  useEffect(() => {
    if (menuOpen) setProfileOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (profileOpen) setMenuOpen(false);
  }, [profileOpen]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setProfileOpen((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[999] font-[Rajdhani,sans-serif] h-16 sm:h-[72px] lg:h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg">

        <div className="max-w-7xl h-full mx-auto px-3 sm:px-5 lg:px-8 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0"
          >
            <img
              src="/newRD.png"
              alt="Drive Ranger"
              className="w-8 sm:w-9 lg:w-10"
            />

            <div className="leading-none">
              <h1 className="text-white font-bold tracking-[0.12em] text-lg sm:text-md lg:text-[20px]">
                DRIVE{" "}
                <span className="text-brand-red">
                  RANGER
                </span>
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}

          <ul className="hidden lg:flex items-center gap-8 text-white font-semibold">

            <li>
              <Link
                to="/"
                className="uppercase text-[13px] tracking-[0.18em] hover:text-brand-red duration-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="uppercase text-[13px] tracking-[0.18em] hover:text-brand-red duration-300"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/brands"
                className="uppercase text-[13px] tracking-[0.18em] hover:text-brand-red duration-300"
              >
                Brands
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="uppercase text-[13px] tracking-[0.18em] hover:text-brand-red duration-300"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="uppercase text-[13px] tracking-[0.18em] hover:text-brand-red duration-300"
              >
                Contact
              </Link>
            </li>

          </ul>

          {/* Right Side */}

          <div className="flex items-center gap-2 sm:gap-3">

            <Link to="/cart">
              <button className="relative p-2 rounded-lg hover:bg-white/10 transition">

                <ShoppingCart
                  size={18}
                  className="text-white"
                />

                <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] rounded-full bg-brand-red flex items-center justify-center text-[9px] font-bold text-white px-1">
                  {totalItems}
                </span>

              </button>
            </Link>

            {/* Profile */}

            <button
              onClick={handleProfileClick}
              className="relative p-1 rounded-full hover:bg-white/10 transition"
            >

              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-brand-red/40 bg-brand-red/10 flex items-center justify-center">

                {isAuthenticated &&
                user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt={user.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    size={15}
                    className="text-white"
                  />
                )}

              </div>

              {isAuthenticated && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
              )}

            </button>

            <Link
              to="/contact"
              className="hidden lg:flex btn-clip btn-shine bg-brand-red text-white px-6 py-3 uppercase tracking-[0.18em] text-[13px]"
            >
              Get Quote
            </Link>

            {/* Hamburger */}

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
            >
              {menuOpen ? (
                <X
                  size={28}
                  className="text-white"
                />
              ) : (
                <Menu
                  size={28}
                  className="text-white"
                />
              )}
            </button>

          </div>

        </div>

        {/* MOBILE MENU */}

        <div
          className={`fixed top-16 sm:top-[72px] left-0 w-full h-[calc(100vh-64px)] sm:h-[calc(100vh-72px)] bg-[#080808]/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >

          <div className="flex flex-col px-6 py-8 h-full">

            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() =>
                setMenuOpen(false)
              }
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              Products
            </Link>

            <Link
              to="/brands"
              onClick={() =>
                setMenuOpen(false)
              }
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              Brands
            </Link>

            <Link
              to="/about"
              onClick={() =>
                setMenuOpen(false)
              }
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() =>
                setMenuOpen(false)
              }
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              Contact
            </Link>
                        <div className="mt-auto space-y-4 pt-8">

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-brand-red text-white uppercase tracking-[0.18em] py-4 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Get Quote
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center border border-white/20 text-white py-4 rounded-lg hover:bg-white/10 transition"
              >
                View Cart ({totalItems})
              </Link>

            </div>

          </div>

        </div>

      </nav>

      {/* Mobile Overlay */}

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998] lg:hidden"
        />
      )}

      {/* ========================= */}
      {/* PROFILE DRAWER */}
      {/* ========================= */}

      <div
        ref={profileRef}
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#0b0b0b] border-l border-white/10 shadow-2xl z-[1000] transition-transform duration-500 ${
          profileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <button
          onClick={() => setProfileOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-lg hover:bg-white/10 transition"
        >
          <X className="text-white" size={24} />
        </button>

        <div className="pt-20 px-6 pb-10 h-full overflow-y-auto">

          {/* User */}

          <div className="flex flex-col items-center">

            <div className="w-24 h-24 rounded-full border-2 border-brand-red overflow-hidden bg-brand-red/10 flex items-center justify-center">

              {isAuthenticated && user?.profile_image ? (

                <img
                  src={user.profile_image}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />

              ) : (

                <User
                  size={42}
                  className="text-white"
                />

              )}

            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">

              {isAuthenticated
                ? user?.full_name || "User"
                : "Guest"}

            </h2>

            <p className="text-gray-400 mt-2 text-sm">

              {isAuthenticated
                ? user?.email
                : "Not Logged In"}

            </p>

            {user?.phone && (

              <p className="text-gray-500 text-sm mt-1">

                {user.phone}

              </p>

            )}

          </div>

          <div className="my-8 border-t border-white/10" />

          {isAuthenticated ? (

            <div className="space-y-2">

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/profile");
                }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/5 transition text-white"
              >
                <UserCircle size={22} />
                <span className="flex-1 text-left">
                  My Profile
                </span>
                <ChevronRight size={18} />
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/orders");
                }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/5 transition text-white"
              >
                <ShoppingBag size={22} />
                <span className="flex-1 text-left">
                  My Orders
                </span>
                <ChevronRight size={18} />
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/settings");
                }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/5 transition text-white"
              >
                <Settings size={22} />
                <span className="flex-1 text-left">
                  Settings
                </span>
                <ChevronRight size={18} />
              </button>

              <div className="border-t border-white/10 my-4" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-red-500/10 transition text-red-400"
              >
                <LogOut size={22} />
                <span className="flex-1 text-left font-semibold">
                  Logout
                </span>
                <ChevronRight size={18} />
              </button>

            </div>

          ) : (

            <div className="space-y-3">

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/login");
                }}
                className="w-full py-4 rounded-xl bg-brand-red text-white font-semibold"
              >
                Login
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/register");
                }}
                className="w-full py-4 rounded-xl border border-white/20 text-white"
              >
                Create Account
              </button>

            </div>

          )}
                    <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-6 bg-[#0b0b0b]">

            {isAuthenticated ? (
              <p className="text-center text-xs text-gray-500">
                Logged in as{" "}
                <span className="text-gray-300">
                  {user?.email}
                </span>
              </p>
            ) : (
              <p className="text-center text-xs text-gray-500">
                You are not logged in
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Profile Overlay */}

      {profileOpen && (
        <div
          onClick={() => setProfileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
        />
      )}

    </>
  );
}