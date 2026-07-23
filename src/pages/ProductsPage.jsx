// import { useMemo, useState } from "react";
// import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useReveal } from "../hooks/useReveal";
// import ProductCard from "../components/ProductCard";
// import { useCategories } from "../hooks/useCatgories";
// import { useProducts } from "../hooks/useProducts";
// import { useSubCategories } from "../hooks/useSubCategories";

// export default function ProductsPage() {
//   const [page, setPage] = useState(1);
//   const { categories = [], loading: catLoading } = useCategories();
//   const {
//     products = [],
//     loading: productLoading,
//     pagination,
//   } = useProducts({ page, limit: 10 });
//   const { sub = [] } = useSubCategories();
// console.log(products);

//   useReveal();

//   const [selectedCat, setSelectedCat] = useState(null);
//   const [selectedSubCat, setSelectedSubCat] = useState("All");
//   const [sortBy, setSortBy] = useState("featured");
//   const [searchQ, setSearchQ] = useState("");
//   const [filtersOpen, setFiltersOpen] = useState(false);
//   const [subCatDropdownOpen, setSubCatDropdownOpen] = useState(false);

//   const load = catLoading || productLoading;

//   // Selected Category ki Subcategories
//   const filteredSubCategories = useMemo(() => {
//     if (!selectedCat) return [];

//     return sub.filter((item) => item.category_id === selectedCat.id);
//   }, [sub, selectedCat]);

//   // Products Filter
//   const filteredProducts = useMemo(() => {
//     let data = [...products];

//     // Category Filter
//     if (selectedCat) {
//       data = data.filter((product) => product.category_id === selectedCat.id);
//     }

//     // SubCategory Filter
//     if (selectedSubCat !== "All") {
//       data = data.filter(
//         (product) => product.subcategory_name === selectedSubCat,
//       );
//     }

//     // Search Filter
//     if (searchQ.trim()) {
//       const search = searchQ.toLowerCase();

//       data = data.filter(
//         (product) =>
//           product.name?.toLowerCase().includes(search) ||
//           product.brand_name?.toLowerCase().includes(search),
//       );
//     }

//     switch (sortBy) {
//       case "price-low":
//         data.sort((a, b) => Number(a.min_price) - Number(b.min_price));
//         break;

//       case "price-high":
//         data.sort((a, b) => Number(b.max_price) - Number(a.max_price));
//         break;

//       default:
//         break;
//     }

//     return data;
//   }, [products, selectedCat, selectedSubCat, searchQ, sortBy]);

//   const hasActiveFilters =
//     selectedCat !== null || selectedSubCat !== "All" || searchQ.trim() !== "";

//   const clearAllFilters = () => {
//     setSelectedCat(null);
//     setSelectedSubCat("All");
//     setSearchQ("");
//     setSubCatDropdownOpen(false);
//   };

//   return (
//     <div className="pt-24 min-h-screen bg-[#080808]">
//       {/* Hero */}

//       <section className="dark-panel relative py-20 bg-[#080808] overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <div className="text-brand-red text-xs tracking-[0.3em] uppercase mb-3">
//             / Browse Our Catalog
//           </div>

//           <h1 className="text-6xl lg:text-8xl font-black text-white">
//             ALL <span className="text-gradient">PRODUCTS</span>
//           </h1>

//           <p className="text-white/55 mt-4 max-w-xl mx-auto">
//             40,000+ genuine parts from 20+ global brands.
//           </p>
//         </div>
//       </section>

//       {/* Search + Sort */}

//       <section className="bg-white pt-10">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search
//                 size={16}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 type="text"
//                 placeholder="Search by part name or brand..."
//                 value={searchQ}
//                 onChange={(e) => setSearchQ(e.target.value)}
//                 aria-label="Search products"
//                 className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition"
//               />

//               {searchQ && (
//                 <button
//                   onClick={() => setSearchQ("")}
//                   aria-label="Clear search"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
//                 >
//                   <X size={16} />
//                 </button>
//               )}
//             </div>

//             <div className="flex items-center gap-2">
//               <label
//                 htmlFor="sortSelect"
//                 className="text-sm text-gray-500 whitespace-nowrap"
//               >
//                 Sort by
//               </label>
//               <select
//                 id="sortSelect"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main layout: sidebar filters + product grid */}

//       <section className="bg-white py-10">
//         <div className="max-w-7xl mx-auto px-4">
//           {/* Filter trigger — same on mobile and desktop */}
//           <button
//             onClick={() => setFiltersOpen(true)}
//             className="mb-6 w-full lg:w-auto flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-5 py-3 text-sm font-medium text-gray-700 hover:border-gray-400 transition"
//           >
//             <SlidersHorizontal size={16} />
//             Filters
//             {hasActiveFilters && (
//               <span className="ml-1 px-1.5 py-0.5 rounded-full bg-brand-red text-white text-xs">
//                 {[selectedCat ? 1 : 0, selectedSubCat !== "All" ? 1 : 0].reduce(
//                   (a, b) => a + b,
//                   0,
//                 )}
//               </span>
//             )}
//           </button>

//           <div>
//             {/* Drawer backdrop — starts below the navbar, both mobile and desktop */}
//             <AnimatePresence>
//               {filtersOpen && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   onClick={() => setFiltersOpen(false)}
//                   className="fixed top-24 bottom-0 left-0 right-0 bg-black/50 z-40"
//                 />
//               )}
//             </AnimatePresence>

//             {/* Sidebar: always a slide-in drawer, starts below navbar */}
//             <aside
//               className={`fixed top-24 bottom-0 left-0 z-40 w-[85%] max-w-sm lg:max-w-md bg-white p-6 overflow-y-auto shadow-xl transition-transform duration-300 ${
//                 filtersOpen ? "translate-x-0" : "-translate-x-full"
//               }`}
//             >
//               {/* Drawer header */}
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-base font-bold text-gray-900">Filters</h2>
//                 <button
//                   onClick={() => setFiltersOpen(false)}
//                   aria-label="Close filters"
//                   className="p-2 rounded-lg hover:bg-gray-100"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>

//               <div>
//                 {/* Category */}

//                 <div className="mb-8">
//                   <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
//                     Category
//                   </h3>

//                   {catLoading ? (
//                     <div className="space-y-2">
//                       {[1, 2, 3, 4].map((i) => (
//                         <div
//                           key={i}
//                           className="h-9 rounded-lg bg-gray-100 animate-pulse"
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <ul className="space-y-1">
//                       <li>
//                         <button
//                           onClick={() => {
//                             setSelectedCat(null);
//                             setSelectedSubCat("All");
//                             setSubCatDropdownOpen(false);
//                             setFiltersOpen(false);
//                           }}
//                           aria-pressed={selectedCat === null}
//                           className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
//                             selectedCat === null
//                               ? "bg-brand-red text-white font-medium"
//                               : "text-gray-700 hover:bg-gray-100"
//                           }`}
//                         >
//                           <span>All Categories</span>
//                           <span
//                             className={
//                               selectedCat === null
//                                 ? "text-white/80"
//                                 : "text-gray-400"
//                             }
//                           >
//                             {products.length}
//                           </span>
//                         </button>
//                       </li>

//                       {categories.map((cat) => {
//                         const count = products.filter(
//                           (p) => p.category_id === cat.id,
//                         ).length;
//                         const active = selectedCat?.id === cat.id;

//                         return (
//                           <li key={cat.id}>
//                             <button
//                               onClick={() => {
//                                 setSelectedCat(cat);
//                                 setSelectedSubCat("All");
//                                 setSubCatDropdownOpen(false);
//                               }}
//                               aria-pressed={active}
//                               disabled={count === 0}
//                               className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
//                                 active
//                                   ? "bg-brand-red text-white font-medium"
//                                   : count === 0
//                                     ? "text-gray-300 cursor-not-allowed"
//                                     : "text-gray-700 hover:bg-gray-100"
//                               }`}
//                             >
//                               <span>{cat.name}</span>
//                               <span
//                                 className={
//                                   active ? "text-white/80" : "text-gray-400"
//                                 }
//                               >
//                                 {count}
//                               </span>
//                             </button>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   )}
//                 </div>

//                 {/* Subcategory — only shown once a category is picked */}

//                 <AnimatePresence>
//                   {selectedCat && filteredSubCategories.length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -8 }}
//                       transition={{ duration: 0.2 }}
//                       className="relative"
//                     >
//                       <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
//                         Subcategory
//                       </h3>

//                       <button
//                         type="button"
//                         onClick={() => setSubCatDropdownOpen((v) => !v)}
//                         aria-haspopup="listbox"
//                         aria-expanded={subCatDropdownOpen}
//                         className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-left focus:outline-none focus:ring-2 focus:ring-brand-red"
//                       >
//                         <span className="truncate">
//                           {selectedSubCat === "All"
//                             ? `All ${selectedCat.name}`
//                             : selectedSubCat}
//                         </span>
//                         <ChevronDown
//                           size={16}
//                           className={`text-gray-400 shrink-0 ml-2 transition-transform ${
//                             subCatDropdownOpen ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>

//                       <AnimatePresence>
//                         {subCatDropdownOpen && (
//                           <motion.ul
//                             role="listbox"
//                             initial={{ opacity: 0, y: -4 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -4 }}
//                             transition={{ duration: 0.15 }}
//                             className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10"
//                           >
//                             <li
//                               role="option"
//                               aria-selected={selectedSubCat === "All"}
//                               onClick={() => {
//                                 setSelectedSubCat("All");
//                                 setSubCatDropdownOpen(false);
//                               }}
//                               className={`px-3 py-2.5 text-sm cursor-pointer ${
//                                 selectedSubCat === "All"
//                                   ? "bg-brand-red text-white"
//                                   : "text-gray-700 hover:bg-gray-100"
//                               }`}
//                             >
//                               All {selectedCat.name}
//                             </li>

//                             {filteredSubCategories.map((item) => (
//                               <li
//                                 key={item.id}
//                                 role="option"
//                                 aria-selected={selectedSubCat === item.name}
//                                 onClick={() => {
//                                   setSelectedSubCat(item.name);
//                                   setSubCatDropdownOpen(false);
//                                 }}
//                                 className={`px-3 py-2.5 text-sm cursor-pointer ${
//                                   selectedSubCat === item.name
//                                     ? "bg-brand-red text-white"
//                                     : "text-gray-700 hover:bg-gray-100"
//                                 }`}
//                               >
//                                 {item.name}
//                               </li>
//                             ))}
//                           </motion.ul>
//                         )}
//                       </AnimatePresence>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {hasActiveFilters && (
//                   <button
//                     onClick={clearAllFilters}
//                     className="mt-8 w-full text-sm text-brand-red hover:underline text-left"
//                   >
//                     Clear all filters
//                   </button>
//                 )}

//                 {/* Apply button — closes the drawer on any screen size */}
//                 <button
//                   onClick={() => setFiltersOpen(false)}
//                   className="mt-8 w-full py-3 rounded-lg bg-brand-red text-white text-sm font-medium hover:bg-brand-red/90 transition"
//                 >
//                   Show {filteredProducts.length} Results
//                 </button>
//               </div>
//             </aside>

//             {/* Products */}

//             <div className="w-full">
//               <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
//                 <div>
//                   <h2 className="text-gray-900 text-lg font-semibold">
//                     {load
//                       ? "Loading products..."
//                       : `${filteredProducts.length} ${filteredProducts.length === 1 ? "Product" : "Products"}`}
//                   </h2>

//                   {!load && (selectedCat || selectedSubCat !== "All") && (
//                     <p className="text-sm text-gray-500 mt-1">
//                       {selectedCat?.name}
//                       {selectedSubCat !== "All" && (
//                         <> &rsaquo; {selectedSubCat}</>
//                       )}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <motion.div
//                 layout
//                 className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
//               >
//                 <AnimatePresence mode="popLayout">
//                   {!load &&
//                     filteredProducts.map((product, i) => (
//                       <motion.div
//                         key={product.id}
//                         layout
//                         initial={{ opacity: 0, y: 25 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -25 }}
//                         transition={{
//                           duration: 0.3,
//                           delay: (i % 8) * 0.05,
//                         }}
//                       >
//                         <ProductCard product={product} light />
//                       </motion.div>
//                     ))}
//                 </AnimatePresence>
//               </motion.div>

//               {!load && pagination?.totalPages > 1 && (
//   <div className="flex items-center justify-center gap-4 mt-10">
//     <button
//       onClick={() => setPage((prev) => prev - 1)}
//       disabled={page === 1}
//       className={`px-5 py-2 rounded-lg border transition ${
//         page === 1
//           ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//           : "bg-white text-gray-700 hover:bg-gray-100"
//       }`}
//     >
//       Previous
//     </button>

//     <span className="font-medium text-gray-700">
//       Page {pagination.page} of {pagination.totalPages}
//     </span>

//     <button
//       onClick={() => setPage((prev) => prev + 1)}
//       disabled={page === pagination.totalPages}
//       className={`px-5 py-2 rounded-lg transition ${
//         page === pagination.totalPages
//           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//           : "bg-brand-red text-white hover:bg-brand-red/90"
//       }`}
//     >
//       Next
//     </button>
//   </div>
// )}

//               {!load && filteredProducts.length === 0 && (
//                 <div className="text-center py-24">
//                   <div className="text-7xl mb-4">🔍</div>

//                   <h2 className="text-3xl font-bold text-gray-900">
//                     No Products Found
//                   </h2>

//                   <p className="text-gray-500 mt-3 max-w-md mx-auto">
//                     Nothing matches your current filters. Try a different
//                     category, or clear your filters to see everything.
//                   </p>

//                   {hasActiveFilters && (
//                     <button
//                       onClick={clearAllFilters}
//                       className="mt-6 px-6 py-3 rounded-lg bg-brand-red text-white text-sm font-medium hover:bg-brand-red/90 transition"
//                     >
//                       Clear all filters
//                     </button>
//                   )}
//                 </div>
//               )}

//               {load && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {[1, 2, 3, 4, 5, 6].map((i) => (
//                     <div
//                       key={i}
//                       className="rounded-lg bg-gray-100 aspect-[3/4] animate-pulse"
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useMemo, useState, useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import ProductCard from "../components/ProductCard";
import { useCategories } from "../hooks/useCatgories";
import { useProducts } from "../hooks/useProducts";
import { useSubCategories } from "../hooks/useSubCategories";
import { useDebounce } from "../hooks/useDebounce";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
 const brandIdFromUrl = searchParams.get("brand_id") || null;
const brandSlugFromUrl = searchParams.get("brand") || null;

  // ─── Mobile drawer state ──────────────────────────────
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // ─── Filters state ─────────────────────────────────────
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    brand_id: brandIdFromUrl,
      brand: brandSlugFromUrl,
    category_id: searchParams.get("category_id") || "",
    sub_category_id:  searchParams.get("subcategory_id") || "",
    search: "",
    sort_by: "",
  });

  const debouncedSearch=useDebounce(filters.search,500)

  // ─── Data fetching ─────────────────────────────────────
  const { categories = [], loading: catLoading } = useCategories({
    limit:20
  });
  const { sub = [] } = useSubCategories({category_id: filters.category_id,});
  const {
    products = [],
    loading: productLoading,
    pagination,
    hasLoadedOnce,
  // } = useProducts(filters);
  } = useProducts({...filters,search:debouncedSearch});



  useReveal();

  // ─── Sync URL params to filters ──────────────────────
  useEffect(() => {
    const categoryId = searchParams.get("category_id") || undefined;

    const subcategoryId = searchParams.get("subcategory_id");
    const brandId = searchParams.get("brand_id");
const brandSlug = searchParams.get("brand");

    setFilters((prev) => ({
      ...prev,
      category_id: categoryId ? Number(categoryId) : null,
      sub_category_id: subcategoryId ? Number(subcategoryId) : null,
       brand_id: brandId || null,
        brand: brandSlug || null,
      page: 1,
    }));
  }, [searchParams]);




  // ─── Handlers ──────────────────────────────────────────
  const updateFilter = (key, value) => {
    console.log(key, value);
    
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      if (key !== "page") newFilters.page = 1;
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      brand_id: null,
      category_id: null,
      sub_category_id: null,
      search: "",
      sort_by: "",
    });
  //   searchParams.delete("brand_id");
  //   searchParams.delete("brand");

  //   params.delete("category");
  // params.delete("category_id");

  // params.delete("subcategory");
  // params.delete("subcategory_id");

    // setSearchParams(searchParams); 
     //iske alawa niche ye bhi kar sakte hai taaki sabhi searchparams khali ho jaye
    setSearchParams({})
  };

  // ─── Derived state ────────────────────────────────────
  const hasActiveFilters = useMemo(
    () =>
      filters.brand_id !== null ||
      filters.category_id !== null ||
      filters.sub_category_id !== null ||
      filters.search.trim() !== "" ||
      filters.sort_by !== "",
    [filters]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.brand_id) count++;
    if (filters.category_id) count++;
    if (filters.sub_category_id) count++;
    if (filters.search.trim()) count++;
    if (filters.sort_by) count++;
    return count;
  }, [filters]);

  const selectedCat = categories.find((c) => c.id === filters.category_id) || null;

  const filteredSubCategories = useMemo(() => {
    if (!selectedCat) return [];
    return sub.filter((item) => item.category_id === selectedCat.id)
    .sort((a,b)=>a.id-b.id) //latest first
  }, [sub, selectedCat]);

  const selectedSubCategoryName = useMemo(() => {
    if (!filters.sub_category_id) return null;
    const found = filteredSubCategories.find(
      (item) => item.id === filters.sub_category_id
    );
    return found?.name || null;
  }, [filters.sub_category_id, filteredSubCategories]);

  const brandName = useMemo(() => {
    if (!filters.brand_id || products.length === 0) return null;
    const matched = products.find(
      (p) => String(p.brand_id) === String(filters.brand_id)
    );
    return matched?.brand_name || null;
  }, [products, filters.brand_id]);

  // ─── Loading state ────────────────────────────────────
  // Resolves flickering when backspacing/searching by showing the initial loader only
  // on the first load and keeping the previous results visible during later refreshes.
  if (productLoading && !hasLoadedOnce) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading products...</p>
        </div>
      </div>
    );
  }

  // ─── Filter Sidebar Content (only categories + subcategories) ──
  const FilterSidebar = ({ closeDrawer }) => (
    <div className="h-full  flex flex-col ">
      {/* Drawer Header (only visible on mobile) */}
      <div className="flex md:hidden items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Categories</h2>
        <button
          onClick={closeDrawer}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Categories
        </h3>
        {catLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 rounded-lg bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => {
                  updateFilter("category_id", null);
                  updateFilter("sub_category_id", null);
                  if (closeDrawer) closeDrawer();
                }}
                aria-pressed={!filters.category_id}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition ${
                  !filters.category_id
                    ? "bg-brand-red text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>All Categories</span>
              </button>
            </li>
            {categories.map((cat) => {
              const active = filters.category_id === cat.id;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      updateFilter("category_id", cat.id);
                      updateFilter("sub_category_id", null);
                      if (closeDrawer) closeDrawer();
                    }}
                    aria-pressed={active}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition ${
                      active
                        ? "bg-brand-red text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Subcategories */}
      {filters.category_id && filteredSubCategories.length > 0 && (
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Subcategory
          </label>
          <select
            value={filters.sub_category_id || ""}
            onChange={(e) => {
              const val = e.target.value ? Number(e.target.value) : null;
              updateFilter("sub_category_id", val);
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red bg-white"
          >
            <option value="">All {selectedCat?.name}</option>
            {filteredSubCategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="mt-4 w-full text-sm text-brand-red hover:underline text-left"
        >
          Clear all filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      )}
    </div>
  );

  // ─── Main Render ──────────────────────────────────────
  return (
    <div className="pt-24 min-h-screen bg-[#080808]">
      {/* Hero */}
      <section className="dark-panel relative py-20 bg-[#080808] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-brand-red text-xs tracking-[0.3em] uppercase mb-3">
            / Browse Our Catalog
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-white">
            ALL <span className="text-gradient">PRODUCTS</span>
          </h1>
          <p className="text-white/55 mt-4 max-w-xl mx-auto">
            15,000+ genuine parts from 20+ global brands.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* ─── DESKTOP SIDEBAR (hidden on mobile) ─── */}
            <aside className="hidden md:block w-72  lg:w-80 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pb-4">
              <FilterSidebar />
            </aside>

            {/* ─── PRODUCTS / RIGHT COLUMN ─── */}
            <div className="flex-1 min-w-0">
              {/* ─── SEARCH + SORT BAR (outside filter) ─── */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                {/* Search - always visible */}
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search by part or brand..."
                    value={filters.search}
                    onChange={(e) => updateFilter("search", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                  {filters.search && (
                    <button
                      onClick={() => updateFilter("search", "")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                  
                {/* Sort - hidden on mobile, visible from sm upwards */}
                <div className=" sm:flex items-center gap-2 shrink-0">
                  <label htmlFor="sortSelect" className="text-md text-gray-500 whitespace-nowrap ">
                    Sort
                  </label> &nbsp;
                  <select
                    id="sortSelect"
                    value={filters.sort_by}
                    onChange={(e) => updateFilter("sort_by", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red bg-white"
                  >
                    <option value="">View All</option>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price_low_high">Price: Low to High</option>
                    <option value="price_high_low">Price: High to Low</option>
                  </select>
                </div>
              </div>
              

              {/* ─── RESULTS HEADER + MOBILE FILTER BUTTON ─── */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-gray-900 text-lg font-semibold">
                    {productLoading
                      ? "Loading..."
                      : `${pagination?.total || 0} ${
                          pagination?.total === 1 ? "Product" : "Products"
                        }`}
                  </h2>
                  {!productLoading &&
                    (filters.brand_id ||
                      filters.category_id ||
                      filters.sub_category_id) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {filters.brand_id && brandName && (
                          <span>Brand: {brandName}</span>
                        )}
                        {filters.category_id && selectedCat && (
                          <span>
                            {filters.brand_id ? " | " : ""}
                            {selectedCat.name}
                          </span>
                        )}
                        {filters.sub_category_id && selectedSubCategoryName && (
                          <span> &rsaquo; {selectedSubCategoryName}</span>
                        )}
                      </p>
                    )}
                </div>

                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileDrawerOpen(true)}
                  className="md:hidden flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 transition"
                >
                  <SlidersHorizontal size={16} />
                  Filter
                  {hasActiveFilters && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-brand-red text-white text-xs">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Product Grid */}
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {(products.length > 0 || !productLoading) &&
                    products.map((product, i) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -25 }}
                        transition={{
                          duration: 0.3,
                          delay: (i % 8) * 0.05,
                        }}
                      >
                        <ProductCard product={product} light />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              
              {!productLoading && pagination?.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button
                    onClick={() => updateFilter("page", filters.page - 1)}
                    disabled={filters.page === 1}
                    className={`px-5 py-2 rounded-lg border transition ${
                      filters.page === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="font-medium text-gray-700">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => updateFilter("page", filters.page + 1)}
                    disabled={filters.page === pagination.totalPages}
                    className={`px-5 py-2 rounded-lg transition ${
                      filters.page === pagination.totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-brand-red text-white hover:bg-brand-red/90"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}

              {/* No Results */}
              {!productLoading && products.length === 0 && (
                <div className="text-center py-24">
                  <div className="text-7xl mb-4">🔍</div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    No Products Found
                  </h2>
                  <p className="text-gray-500 mt-3 max-w-md mx-auto">
                    Nothing matches your current filters. Try a different
                    category, or clear your filters.
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="mt-6 px-6 py-3 rounded-lg bg-brand-red text-white text-sm font-medium hover:bg-brand-red/90 transition"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}

              {/* Loading Skeleton */}
              {productLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-gray-100 aspect-[3/4] animate-pulse"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MOBILE DRAWER (overlay) ─── */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-12 left-0 bottom-0 z-50 w-[85%] max-w-sm bg-white p-6 overflow-y-auto shadow-2xl md:hidden"
            >
              <FilterSidebar closeDrawer={() => setMobileDrawerOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}