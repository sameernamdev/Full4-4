import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
// import { CATEGORIES, PRODUCTS } from "../data/data";
import { useReveal } from "../hooks/useReveal";
import ProductCard from "../components/ProductCard";
import { getallproducts } from "../config/axios";
import { useCategories } from "../hooks/usecatgories";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
  const { categories, loading, error } = useCategories();
  const {products}=useProducts()

  useReveal();

  // const [products, setProducts] = useState([]);

  const [selectedCat, setSelectedCat] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQ, setSearchQ] = useState("");
  const [load, setLoad] = useState(false);

  // useEffect(() => {
  //   const fetchproducts = async () => {
  //     try {
  //       setLoad(true);
  //       const data = await getallproducts();
  //       setProducts(data?.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoad(false);
  //     }
  //   };
  //   fetchproducts();
  // }, []);
  // console.log(products);

//  categories = ["All", ...products.map((c) => c.name)];
  const filtered = products.filter((p) => {
    const matchCat = selectedCat === "All" || p.category_name === selectedCat;
    const matchSearch =
      p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      p.brand_name.toLowerCase().includes(searchQ.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-[#080808]">
      <section className="dark-panel relative py-20 bg-[#080808] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="font-body text-brand-red text-xs tracking-[0.3em] uppercase mb-3">
            / Browse Our Catalog
          </div>
          <h1 className="font-display text-6xl lg:text-8xl font-black text-white">
            ALL <span className="text-gradient">PRODUCTS</span>
          </h1>
          <p className="font-body text-white/55 mt-4 max-w-xl mx-auto">
            40,000+ genuine parts from 20+ global brands. Find exactly what your
            car needs.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-10 reveal">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search parts, brands..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="w-full bg-white border border-brand-ink/10 rounded-xl pl-10 pr-4 py-3.5 text-brand-ink font-body text-sm focus:outline-none focus:border-brand-red/50 placeholder-gray-400 shadow-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-brand-ink/10 rounded-xl px-4 py-3.5 text-brand-ink font-body text-sm focus:outline-none focus:border-brand-red/50 lg:w-48 shadow-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>

          {/* {categories.map((category) => (
      <p key={category._id}>{category.name}</p>
    ))} */}

          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            <h2 className="my-2">Categories </h2>
            <button
              onClick={() => setSelectedCat("All")}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full ${
                selectedCat === "All"
                  ? "bg-brand-red text-white"
                  : "bg-white border border-brand-ink/10"
              }`}
            >
              All ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.name)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full ${
                  selectedCat === cat.name
                    ? "bg-brand-red text-white"
                    : "bg-white border border-brand-ink/10"
                }`}
              >
                {cat.name}
                <span className="text-xs opacity-60">
                  ({products.filter((p) => p.category_name === cat.name).length}
                  )
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-panel bg-[#080808] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="font-body text-white/45 text-sm mb-6">
            Showing products
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {!load &&
                filtered?.map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="reveal"
                    style={{ transitionDelay: `${(i % 4) * 0.1}s` }}
                    layout
                    initial={{ opacity: 0, y: 22, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.96 }}
                    transition={{
                      duration: 0.28,
                      delay: Math.min(i, 8) * 0.025,
                    }}
                  >
                    <ProductCard product={product} light={true} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">Search</div>
              <div className="font-display text-3xl font-bold text-white mb-2">
                No parts found
              </div>
              <div className="font-body text-white/45">
                Try adjusting your search or filters
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
