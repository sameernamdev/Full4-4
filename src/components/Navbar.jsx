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
  Star,
  Shield,
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
      {/* PROFILE DRAWER (FIXED)    */}
      {/* ========================= */}

      <div
        ref={profileRef}
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#0b0b0b] border-l border-white/10 shadow-2xl z-[1000] transition-transform duration-500 flex flex-col ${
          profileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* ----- Header (close button) ----- */}
        <div className="flex-shrink-0 px-6 pt-5 pb-3 flex justify-end">
          <button
            onClick={() => setProfileOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <X className="text-white" size={24} />
          </button>
        </div>

        {/* ----- Scrollable Content ----- */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">

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
    navigate("/my-reviews");
  }}
  className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/5 transition text-white"
>
  <Star size={22} />   {/* or any icon you like */}
  <span className="flex-1 text-left">My Reviews</span>
  <ChevronRight size={18} />
</button>




        <button
  onClick={() => {
    setProfileOpen(false);
    navigate("/my-warranties");
  }}
  className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/5 transition text-white"
>
  <Shield size={22} />
  <span className="flex-1 text-left">My Warranty</span>
  <ChevronRight size={18} />
</button>

              {/* <button
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
              </button> */}

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

        </div>

        {/* ----- Fixed Footer ----- */}
        <div className="flex-shrink-0 border-t border-white/10 p-6 bg-[#0b0b0b]">

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