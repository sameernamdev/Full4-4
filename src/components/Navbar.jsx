import { useState, useRef, useEffect, useMemo } from "react";
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
  ChevronDown,
  ChevronUp,
  Ticket,
  MapPin,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
// import { useCategories } from "../hooks/useCategories";
import { useSubCategories } from "../hooks/useSubCategories";
import { useCategories } from "../hooks/useCatgories";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Mobile accordion states
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState(null);

  // Desktop dropdown state
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const closeTimeout = useRef(null);

  // Fetch categories and subcategories (hooks unchanged)
  const { categories, loading: catLoading } = useCategories({limit:50});
  const { sub: allSubcategories, loading: subLoading } = useSubCategories({limit:100});

  // Build a map: categoryId -> array of subcategories
  const subcategoryMap = useMemo(() => {
    const map = {};
    if (allSubcategories && allSubcategories.length) {
      allSubcategories.forEach((sub) => {
        const catId = sub.category_id || sub.category;
        if (catId) {
          if (!map[catId]) map[catId] = [];
          map[catId].push(sub);
        }
      });
    }
    return map;
  }, [allSubcategories]);

  // For desktop hover
  const hoveredSubs = hoveredCategoryId
    ? subcategoryMap[hoveredCategoryId] || []
    : [];

  // Close profile on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scrolling
  useEffect(() => {
    document.body.style.overflow = menuOpen || profileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen, profileOpen]);

  // Close drawers on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
    setMobileProductsOpen(false);
    setMobileExpandedCategory(null);
    setIsProductsOpen(false);
    setHoveredCategoryId(null);
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

  // Navigation helper for products
  const navigateToProducts = (cat, sub = null) => {
    //    console.log("Category:", cat);
    // console.log("Subcategory:", sub);
    setMenuOpen(false);
    setMobileProductsOpen(false);
    setMobileExpandedCategory(null);
    setIsProductsOpen(false);
    setHoveredCategoryId(null);
    const query = sub
      ? // ? `?category_id=${categoryId}&subcategory_id=${subcategoryId}`
        // : `?category_id=${categoryId}`;
        `?category=${cat.slug}&category_id=${cat.id}&subcategory=${sub.slug}&subcategory_id=${sub.id}`
      : `?category=${cat.slug}&category_id=${cat.id}`;

    // navigate(`/products${query}`);
    navigate(`/products${query}`);
  };

  const handleProductsMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsProductsOpen(true);
  };

  const handleProductsMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsProductsOpen(false);
      setHoveredCategoryId(null);
    }, 200);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[999] font-[Rajdhani,sans-serif] h-16 sm:h-[72px] lg:h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl h-full mx-auto px-3 sm:px-5 lg:px-8 flex items-center justify-between">
          {/* Logo */}
<Link
  to="/"
  className="flex items-center gap-1.5 sm:gap-1.5 shrink-0"
>
  <img
    src="/drivelogo.jpg"
    alt="Drive Ranger"
    className=" h-7 sm:h-10 lg:h-9  object-contain flex-shrink-0 "
  />

  <h1
    className="

      font-[Rajdhani]
      font-bold
      uppercase
      leading-10
      tracking-[0.02em]
      text-white
      text-[25px]
      sm:text-[35px]
      
      flex
      items-center
      whitespace-nowrap
    "
  >
    DRIVE
    <span className="text-brand-red ml-1">RANGER</span>
  </h1>
</Link>

          {/* ===== DESKTOP MENU ===== */}
          <ul className="hidden lg:flex items-center gap-8 text-white font-semibold">
            <li>
              <Link
                to="/"
                className="uppercase text-[13px] tracking-[0.18em] hover:text-brand-red duration-300"
              >
                Home
              </Link>
            </li>

            {/* Products - Desktop */}
            <li
              className="relative"
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={handleProductsMouseLeave}
            >
              <button
                onClick={() => {
                  setIsProductsOpen(false);
                  navigate("/products");
                }}
                className="uppercase text-[13px] tracking-[0.18em] hover:text-brand-red duration-300 flex items-center gap-1 mt-1"
              >
                Products
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProductsOpen && (
                <div
                  className="products-dropdown absolute left-0 top-full mt-2 w-64 bg-[#0b0b0b] border border-white/10 rounded-lg shadow-2xl py-2 z-50"
                  // onMouseEnter={() => setIsProductsOpen(true)}
                  // onMouseLeave={() => {
                  //   setIsProductsOpen(false);
                  //   setHoveredCategoryId(null);
                  // }}
                  onMouseEnter={handleProductsMouseEnter}
                  onMouseLeave={handleProductsMouseLeave}
                >
                  {catLoading ? (
                    <div className="text-center py-4 text-gray-400">
                      Loading categories...
                    </div>
                  ) : categories.length === 0 ? (
                    <div className="text-center py-4 text-gray-400">
                      No categories
                    </div>
                  ) : (
                    categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="relative group"
                        onMouseEnter={() => setHoveredCategoryId(cat.id)}
                      >
                        <div
                          className="flex items-center justify-between px-4 py-2 hover:bg-white/5 cursor-pointer text-white transition"
                          onClick={() => navigateToProducts(cat)}
                        >
                          <span>{cat.name}</span>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>

                        {hoveredCategoryId === cat.id && (
                          <div
                            className="absolute left-full top-0 ml-0 w-56 bg-[#0b0b0b] border border-white/10 rounded-lg shadow-2xl py-2 z-50"
                            onMouseEnter={() => setHoveredCategoryId(cat.id)}
                          >
                            {subLoading ? (
                              <div className="text-center py-2 text-gray-400">
                                Loading...
                              </div>
                            ) : hoveredSubs.length > 0 ? (
                              hoveredSubs.map((sub) => (
                                <div
                                  key={sub.id}
                                  className="px-4 py-2 hover:bg-white/5 cursor-pointer text-gray-200 transition"
                                  onClick={() => navigateToProducts(cat, sub)}
                                >
                                  {sub.name}
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-gray-400">
                                No subcategories
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
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
              <Link to="find-vehicle" className="uppercase text-[13px] tracking-[0.18em] hover:text-brand-red duration-300">
                vehicle
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
                <ShoppingCart size={18} className="text-white" />
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
                {isAuthenticated && user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt={user.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={15} className="text-white" />
                )}
              </div>
              {isAuthenticated && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
              )}
            </button>

            {!isAuthenticated && (
              <Link
                to="/login"
                className="hidden lg:flex btn-clip btn-shine bg-brand-red text-white px-6 py-3 uppercase tracking-[0.18em] text-[13px]"
              >
                Login
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
            >
              {menuOpen ? (
                <X size={28} className="text-white" />
              ) : (
                <Menu size={28} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div
          className={`fixed top-16 sm:top-[72px] left-0 w-full h-[calc(100vh-64px)] sm:h-[calc(100vh-72px)] bg-[#080808]/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 py-8 h-full overflow-y-auto">
            {/* Home */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              Home
            </Link>

            {/* Products - Mobile (split: left link + right chevron) */}
            <div className="border-b border-white/10">
              <div className="flex items-center py-4">
                <Link
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-lg font-semibold text-white hover:text-brand-red transition"
                >
                  Products
                </Link>
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  {mobileProductsOpen ? (
                    <ChevronUp size={20} className="text-white" />
                  ) : (
                    <ChevronDown size={20} className="text-white" />
                  )}
                </button>
              </div>

              {mobileProductsOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  {catLoading ? (
                    <div className="py-2 text-gray-400">
                      Loading categories...
                    </div>
                  ) : categories.length === 0 ? (
                    <div className="py-2 text-white">No categories</div>
                  ) : (
                    categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="border-b border-white/5 last:border-0"
                      >
                        {/* Category button with chevron to toggle subcategories */}
                        <button
                          onClick={() => {
                            setMobileExpandedCategory(
                              mobileExpandedCategory === cat.id ? null : cat.id,
                            );
                          }}
                          className="w-full flex items-center justify-between py-2 text-white hover:text-brand-red transition text-left"
                        >
                          <span>{cat.name}</span>
                          <ChevronRight
                            size={16}
                            className={`transition-transform ${mobileExpandedCategory === cat.id ? "rotate-90" : ""}`}
                          />
                        </button>

                        {/* Subcategories */}
                        {mobileExpandedCategory === cat.id && (
                          <div className="pl-4 pb-2 space-y-1">
                            {subLoading ? (
                              <div className="py-1 text-gray-400">
                                Loading...
                              </div>
                            ) : (subcategoryMap[cat.id] || []).length > 0 ? (
                              subcategoryMap[cat.id].map((sub) => (
                                <div
                                  key={sub.id}
                                  className="py-2 text-sm text-white font-medium hover:text-brand-red cursor-pointer transition tracking-wide"
                                  onClick={() => navigateToProducts(cat, sub)}
                                >
                                  {sub.name}
                                </div>
                              ))
                            ) : (
                              <div className="py-1 text-white text-sm">
                                No subcategories
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Brands */}
            <Link
              to="/brands"
              onClick={() => setMenuOpen(false)}
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              Brands
            </Link>
            <Link
              to="/find-vehicle"
              onClick={() => setMenuOpen(false)}
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              Vehicle
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="py-4 text-lg font-semibold text-white border-b border-white/10 hover:text-brand-red transition"
            >
              Contact
            </Link>

            <div className="mt-auto space-y-4 pt-8">
              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center bg-brand-red text-white uppercase tracking-[0.18em] py-4 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Login
                </Link>
              )}
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

      {/* ===== PROFILE DRAWER ===== */}
      <div
        ref={profileRef}
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#0b0b0b] border-l border-white/10 shadow-2xl z-[1000] transition-transform duration-500 flex flex-col ${
          profileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex-shrink-0 px-6 pt-5 pb-3 flex justify-end">
          <button
            onClick={() => setProfileOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <X className="text-white" size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-brand-red overflow-hidden bg-brand-red/10 flex items-center justify-center">
              {isAuthenticated && user?.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={42} className="text-white" />
              )}
            </div>
            <h2 className="mt-5 text-2xl font-bold text-white">
              {isAuthenticated ? user?.full_name || "User" : "Guest"}
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              {isAuthenticated ? user?.email : "Not Logged In"}
            </p>
            {user?.phone && (
              <p className="text-gray-500 text-sm mt-1">{user.phone}</p>
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
                <UserCircle size={22} />{" "}
                <span className="flex-1 text-left">My Profile</span>{" "}
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/orders");
                }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/5 transition text-white"
              >
                <ShoppingBag size={22} />{" "}
                <span className="flex-1 text-left">My Orders</span>{" "}
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/my-reviews");
                }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/5 transition text-white"
              >
                <Star size={22} />{" "}
                <span className="flex-1 text-left">My Reviews</span>{" "}
                <ChevronRight size={18} />
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/coupons");
                }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/5 transition text-white"
              >
                <Ticket size={22} />{" "}
                <span className="flex-1 text-left">My Coupons</span>{" "}
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/my-addresses");
                }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/5 transition text-white"
              >
                <MapPin size={22} />
                <span className="flex-1 text-left">My Addresses</span>
                <ChevronRight size={18} />
              </button>

              <div className="border-t border-white/10 my-4" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-red-500/10 transition text-red-400"
              >
                <LogOut size={22} />{" "}
                <span className="flex-1 text-left font-semibold">Logout</span>{" "}
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
        <div className="flex-shrink-0 border-t border-white/10 p-6 bg-[#0b0b0b]">
          {isAuthenticated ? (
            <p className="text-center text-xs text-gray-500">
              Logged in as <span className="text-gray-300">{user?.email}</span>
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
