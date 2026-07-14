import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Truck,
  Wrench,
  Award,
  Star,
  SprayCan,
  Gauge,
  Sparkles,
  ArrowUpRight,
  BadgeCheck,
  ScanSearch,
} from "lucide-react";
import {
  CATEGORIES,
  STATS,
  PRODUCTS,
  TESTIMONIALS,
  BRAND_NAMES,
  BRAND_PHOTOS,
} from "../data/data";
import { useReveal } from "../hooks/useReveal";
import ProductCard from "../components/ProductCard";
import StatCounter from "../components/StatCounter";
import fallbackImage from "../assets/hero.png";
import { useProducts } from "../hooks/useProducts";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCatgories";
import { useBrands } from "../hooks/useBrands";
import { useReviews } from "../hooks/useReviews";

const imageFallback = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallbackImage;
};

// adding categories in our services
export const dummycategories = [
  {
    title: "Suspension",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStcm386cvgxXlldNhD3TtW0BNdMxFHSf_hkaJDGk7Gf3uOlKqNviduEXw&s=10",
  },
  {
    title: "Suspension",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStcm386cvgxXlldNhD3TtW0BNdMxFHSf_hkaJDGk7Gf3uOlKqNviduEXw&s=10",
  },
  {
    title: "Bull Bars",
    image:
      "https://res.cloudinary.com/total-dealer/image/upload/w_1920,f_auto,q_75/v1/production/tciu1cx03irp5m2pdjkoy89pojfl",
  },
  {
    title: "Camping & Touring",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvgYq3iNRpq2Xs7_9AlENgYArqdE6HLW8gPiEoq7JoDMnwtyNlwlAaoQQ&s=10",
  },
  {
    title: "Winch & Recovery",
    image:
      "https://7bfd457553.clvaw-cdnwnd.com/f8dbf3bf6af4cfad9b2cdf3375dc50e4/200000438-31d8331d85/HNTR-001%20%2866%20von%2070%29.jpeg?ph=7bfd457553",
  },
  {
    title: "Vehicle Lighting",
    image:
      "https://apollooffroad.com/cdn/shop/files/50-gravity-titan-led-light-bar-8-light-apollo-off-road-34411.jpg?v=1745164209&width=2000",
  },
  {
    title: "Vehicle ghting",
    image:
      "https://apollooffroad.com/cdn/shop/files/50-gravity-titan-led-light-bar-8-light-apollo-off-road-34411.jpg?v=1745164209&width=2000",
  },
  {
    title: "Vehicle Lightg",
    image:
      "https://apollooffroad.com/cdn/shop/files/50-gravity-titan-led-light-bar-8-light-apollo-off-road-34411.jpg?v=1745164209&width=2000",
  },
  {
    title: "Vehicle Ligting",
    image:
      "https://apollooffroad.com/cdn/shop/files/50-gravity-titan-led-light-bar-8-light-apollo-off-road-34411.jpg?v=1745164209&width=2000",
  },
  {
    title: "Vehicle Lighting",
    image:
      "https://apollooffroad.com/cdn/shop/files/50-gravity-titan-led-light-bar-8-light-apollo-off-road-34411.jpg?v=1745164209&width=2000",
  },
  {
    title: "Vehicle Lightng",
    image:
      "https://apollooffroad.com/cdn/shop/files/50-gravity-titan-led-light-bar-8-light-apollo-off-road-34411.jpg?v=1745164209&width=2000",
  },
];
// ---------- Helper functions ----------
// 1. Generate row sizes: 2, 3, 2, 3, ...
const getRowSizes = (total) => {
  const sizes = [];
  let index = 0;
  let nextSize = 2;
  while (index < total) {
    const take = Math.min(nextSize, total - index);
    sizes.push(take);
    index += take;
    nextSize = nextSize === 2 ? 3 : 2;
  }
  return sizes;
};

// 2. Chunk the array into rows based on the sizes
const chunkArray = (arr, sizes) => {
  const chunks = [];
  let start = 0;
  for (const size of sizes) {
    chunks.push(arr.slice(start, start + size));
    start += size;
  }
  return chunks;
};

const servicePhotos = [
  "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=720&q=80",
  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=720&q=80",
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=720&q=80",
];

const avatarPhotos = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&q=80",
];

const partsShowcase = [
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=760&q=80",
  "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=760&q=80",
  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=760&q=80",
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=760&q=80",
];

const features = [
  {
    icon: BadgeCheck,
    title: "TS16949 PREMIUM STANDARD",
    desc: "Manufacturing follows international automotive high quality standards.",
  },
  {
    icon: ScanSearch,
    title: "3D VEHICLE SCANNING FITMENT",
    desc: "Guaranteed bolt-on fit matching original factory bumpers and rails.",
  },
  {
    icon: Sparkles,
    title: "INDIVIDUALLY SERIALIZED",
    desc: "Each product exhibits a laser engraved serial plate of authenticity.",
  },
];

export default function HomePage() {
  useReveal();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  // const { products, loading, error } = useProducts({ is_front: true });
  const { products, loading, error } = useProducts({ is_featured: true });
  const { brands } = useBrands();
  const { categories, loading: categoriesLoading } = useCategories({
    is_front: true,
  });
  // taking load state for categories
  const [load, setLoad] = useState(false);

  const categoriesToShow = categories.slice();

  // Build rows
  const rowSizes = getRowSizes(categoriesToShow.length);
  const rows = chunkArray(categoriesToShow, rowSizes);

  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.4 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const brandsDouble = [...BRAND_NAMES, ...BRAND_NAMES];
  // const marqueeWords = [
  //   "Premium Parts",
  //   "Genuine Quality",
  //   "Expert Support",
  //   "Pan India Delivery",
  //   "ISO Certified",
  //   // "1 Year Product Warranty",
  // ];
  const marqueeWords = [
    "4x4 Specialists",
    "Premium Accessories",
    "Performance Parts",
    "Adventure Ready",
    "Quality Assured",
    "Nationwide Delivery",
    "Expert Support",
    "Built for Every Terrain",
  ];
  const marqueeDouble = [...marqueeWords, ...marqueeWords];

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  const { featuredReviews, fetchFeaturedReviews, featuredLoading } =
    useReviews();
  // console.log("featuredReviews",featuredReviews)
  // console.log(fetchFeaturedReviews)
  useEffect(() => {
    fetchFeaturedReviews();
  }, []);

  return (
    <div className="bg-brand-off">
      <section className="dark-panel relative overflow-hidden bg-[#ece7db] min-h-screen">
        <div className="absolute inset-0">
          <motion.img
            src="/newhero.png"
            alt="Sports Car"
            fetchPriority="high"
            decoding="async"
            onError={imageFallback}
            className="absolute inset-0 w-full h-full object-cover object-[80%_center] md:object-center opacity-95 brightness-[1.08] contrast-105 saturate-110"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/12 to-black/10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full min-h-screen flex flex-col justify-center lg:justify-end px-5 sm:px-8 lg:px-10 pt-[75px] sm:pt-24 lg:pt-28 pb-8 sm:pb-14 lg:pb-20">
          <motion.div
            data-anime-hero
            className="inline-flex w-fit items-center gap-3 border border-brand-red/45 px-4 sm:px-5 py-2.5 mb-5 sm:mb-8 bg-black/25 backdrop-blur-sm"
            initial={{ opacity: 0, x: -42 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="blink w-2 h-2 bg-brand-red rounded-full" />

            <span className="font-label font-semibold text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white">
              New Gear Arrived
            </span>
          </motion.div>

          <motion.h1
            data-anime-hero
            className="font-display leading-[0.88] mb-4"
            style={{ fontSize: "clamp(46px,11vw,154px)" }}
            initial={{ opacity: 0, y: 55 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12 }}
          >
            <span className="block text-white">DRIVE</span>

            <span className="block text-brand-red">RANGER.</span>

            {/* <span className="block text-white text-[0.36em] sm:text-[0.48em] lg:text-[0.36em] tracking-[0.08em]">
        CAR ACCESSORIES AND CAMPING GEAR
      </span> */}
          </motion.h1>

          <motion.p
            data-anime-hero
            className="font-body font-semibold text-white text-[15px] sm:text-[16px] lg:text-[20px] leading-relaxed max-w-xs sm:max-w-md lg:max-w-lg mb-5 drop-shadow-lg"
            // className="font-body font-semibold text-white text-[20px] sm:text-[12px] lg:text-[20px] leading-relaxed max-w-xs sm:max-w-md lg:max-w-lg mb-5 drop-shadow-lg"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.26 }}
          >
            Car Accessories and Camping Gears from 20+ global brands.
          </motion.p>

          <motion.div
            data-anime-hero
            className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5 mb-10"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.38 }}
          >
            <motion.button
              // onClick={() => setPage("products")}
              onClick={() => navigate("products")}
              className="btn-clip btn-shine bg-brand-red text-white font-label font-bold text-[12px] sm:text-[14px] tracking-[0.18em] uppercase px-7 sm:px-10 py-3.5 sm:py-4 inline-flex items-center justify-center gap-3 w-auto min-w-[170px] hover:bg-brand-red2 transition-colors"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.96 }}
            >
              Shop Parts <ArrowRight size={16} />
            </motion.button>

            <motion.button
              // onClick={() => setPage("about")}
               onClick={() => navigate("about")}
              className="btn-clip border border-white/40 bg-white/10 backdrop-blur-sm text-white font-label font-bold text-[12px] sm:text-[14px] tracking-[0.15em] uppercase px-7 sm:px-10 py-3.5 sm:py-4 inline-flex items-center justify-center w-auto min-w-[170px] hover:border-brand-red hover:text-brand-red transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              Our Story
            </motion.button>
          </motion.div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-10">
            {[
              ["15K+", "Parts in Stock"],
              ["20+", "Global Brands"],
              ["9Yr", "Experience"],
            ].map(([val, lbl], i) => (
              <motion.div
                key={lbl}
                className={`text-center sm:text-left ${
                  i > 0 ? "sm:pl-10 sm:border-l sm:border-white/30" : ""
                }`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.55 + i * 0.08 }}
              >
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-none">
                  {val}
                </div>

                <div className="font-label font-semibold text-[9px] sm:text-[11px] tracking-[0.22em] uppercase text-white/80 mt-2">
                  {lbl}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-brand-red overflow-hidden py-4">
        <div className="marquee-track">
          {marqueeDouble.map((item, i) => (
            <span
              key={i}
              className="font-display text-[18px] tracking-[0.12em] text-white px-10 whitespace-nowrap flex items-center gap-4"
            >
              {item}
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full inline-block" />
            </span>
          ))}
        </div>
      </div>

      <section className="dark-panel  relative py-28 overflow-hidden ">
        {/* <div className="absolute inset-0 bg-[#0c2237]/88" /> */}
        <div className="absolute inset-0 bg-white " />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end mb-16">
            <div className="reveal">
              <div className="font-label font-bold tracking-[0.35em] uppercase mb-5 text-black">
                Explore
              </div>

              <h2
                className="font-display text-white leading-[0.92]"
                style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
              >
                <span className="text-brand-red">Categories</span>
              </h2>

              <p className="font-body max-w-2xl mt-8 leading-relaxed text-black">
                Equip your vehicle with high-performance parts built to
                withstand the extreme. Quality you can trust, wherever the road
                takes you.
              </p>
            </div>

            <motion.button
              onClick={() => navigate("products")}
              className="btn-clip bg-brand-red text-white px-12 py-6 font-label font-bold tracking-[0.18em] uppercase"
              whileHover={{ scale: 1.06, x: 8 }}
            >
              View All Categories
            </motion.button>
          </div>
          {categoriesLoading ? (
            <div className="flex items-center justify-center py-12">
              <span className="text-brand-red">Loading Categories </span>&nbsp;
              <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-4 w-full">
              {load
                ? "Loading...."
                : rows.map((row, rowIndex) => {
                    // Determine column span for each item based on row length
                    // Tailwind doesn't allow dynamic class strings like `md:col-span-${span}`
                    // so we use a conditional string.
                    let spanClass = "";
                    if (row.length === 2) spanClass = "md:col-span-6";
                    else if (row.length === 3) spanClass = "md:col-span-4";
                    else if (row.length === 1) spanClass = "md:col-span-12"; // full width if only one left

                    return (
                      <div
                        key={rowIndex}
                        className="col-span-12 grid grid-cols-12 gap-4"
                      >
                        {row.map((item, itemIndex) => (
                          <Link
                            className={`col-span-12 ${spanClass} h-[320px] relative overflow-hidden group`}
                            // to={`/products?${item.slug}`}
                            // to={`/products?category=${item.id}`}
                           to={`/products?category=${item.slug}&category_id=${item.id}`}
                            key={item.id}
                          >
                            {/* {console.log(item.id)} */}
                            <motion.div
                              onClick={() => handleCategoryClick(item.slug)}
                              // whileHover={{ scale: 1.02 }}
                              className="h-full"
                            >
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                  // Fallback image in case the URL fails
                                  e.target.src =
                                    "https://via.placeholder.com/600x400?text=Image+Not+Found";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full px-4">
                                <h3 className="text-white text-3xl font-bold text-center">
                                  {item.name}
                                </h3>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      </section>

      <section className="dark-panel bg-[#080808] py-28" id="products">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16 reveal">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-0.5 bg-brand-red" />
                <span className="font-label font-semibold text-[11px] tracking-[0.35em] uppercase text-brand-red">
                  Top Picks
                </span>
              </div>
              <h2
                className="font-display text-white leading-[0.95]"
                style={{ fontSize: "clamp(48px, 7vw, 90px)" }}
              >
                FEATURED
                <br />
                <span className="text-brand-red">PRODUCTS</span>
              </h2>
            </div>
            <motion.button
              onClick={() => setPage("products")}
              className="hidden md:flex items-center gap-2 font-label font-semibold text-[12px] tracking-[0.2em] uppercase text-white/55 hover:text-brand-red transition-colors"
              whileHover={{ x: 5 }}
            >
              <Link to="/products"> View All</Link> <ArrowRight size={15} />
            </motion.button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <span className="text-brand-red">Loading products </span>&nbsp;
              <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                "Loading....."
              ) : (
                <>
                  {products?.slice(0, 4).map((p, i) => (
                    <div
                      key={p.id}
                      className="reveal"
                      style={{ transitionDelay: `${i * 0.08}s` }}
                    >
                      <ProductCard product={p} light={true} />
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <div className="reveal-left">
            <div className="font-label font-bold tracking-[0.28em] text-brand-red uppercase mb-5">
              Why Choose Us
            </div>
            <h2
              className="font-display text-brand-ink leading-[0.95] mb-8"
              style={{ fontSize: "clamp(46px, 5.8vw, 82px)" }}
            >
              PROFESSIONAL CAR
              <br />
              PARTS SELLER SINCE
              <br />
              2017
            </h2>
            <p className="font-body text-brand-ink/62 leading-relaxed mb-10">
              {/* With 9+ years serving car enthusiasts and professionals across
              India, Drive Ranger is synonymous with quality, authenticity, and
              service excellence. */}
              Every part we stock is forged from high-grade materials and
              rigorously tested to endure extreme off-road punishment.
            </p>
            <div className="space-y-8">
              {[
                {
                  Icon: Shield,
                  title: "100% Genuine Parts",
                  desc: "Every part sourced directly from authorized distributors. Zero counterfeits, guaranteed.",
                },
                {
                  Icon: Truck,
                  title: "Pan-India Delivery",
                  desc: "Fast, reliable shipping to 27,000+ pin codes. Track in real-time from warehouse to doorstep.",
                },
                {
                  Icon: Wrench,
                  title: "Expert Technical Support",
                  desc: "Free fitment advice from our 50+ certified automotive engineers. Mon-Sat support.",
                },
              ].map(({ Icon, title, desc }) => (
                <motion.div
                  key={title}
                  className="flex gap-5 items-start"
                  whileHover={{ x: 8 }}
                >
                  <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center shrink-0">
                    <Icon size={27} className="text-white" />
                  </div>
                  <div>
                    <div className="font-label text-2xl font-bold text-brand-ink">
                      {title}
                    </div>
                    <div className="font-body text-brand-ink/58 leading-relaxed">
                      {desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="reveal-right relative min-h-[650px]">
            <motion.div
              className="absolute left-0 top-8 w-[58%] h-[46%] overflow-hidden border border-brand-red/40 shadow-2xl shadow-brand-ink/20"
              animate={{ y: [0, -14, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04 }}
            >
              <img
                src={partsShowcase[0]}
                alt="Engine parts"
                loading="lazy"
                decoding="async"
                onError={imageFallback}
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </motion.div>
            <motion.div
              className="absolute right-4 top-0 w-[42%] h-[34%] overflow-hidden border border-brand-ink/10 shadow-xl shadow-brand-ink/10"
              animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={partsShowcase[1]}
                alt="Auto spare parts"
                loading="lazy"
                decoding="async"
                onError={imageFallback}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute right-0 bottom-16 w-[56%] h-[47%] overflow-hidden border border-brand-red/35 shadow-2xl shadow-brand-red/10"
              animate={{ y: [0, -20, 0], rotate: [1, -1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04 }}
            >
              <img
                src={partsShowcase[2]}
                alt="Workshop parts"
                loading="lazy"
                decoding="async"
                onError={imageFallback}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute left-12 bottom-0 w-[38%] h-[31%] overflow-hidden bg-brand-red p-3 shadow-xl shadow-brand-red/25"
              animate={{ y: [0, 16, 0], rotate: [0, 2, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.06, rotate: -2 }}
            >
              <img
                src={partsShowcase[3]}
                alt="Car accessories"
                loading="lazy"
                decoding="async"
                onError={imageFallback}
                className="w-full h-full object-cover grayscale-[35%]"
              />
            </motion.div>
            <motion.div
              className="absolute left-[42%] top-[42%] w-28 h-28 border border-brand-red/50"
              animate={{ rotate: [0, 360], scale: [1, 1.12, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </section>

      <section
        ref={statsRef}
        // className="dark-panel bg-[#080808] py-24 relative overflow-hidden"
        className="dark-panel bg-white border border-gray-300 py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 tire-track opacity-[0.04]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="reveal text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-brand-red" />
              <span className="font-label font-semibold text-[11px] tracking-[0.35em] uppercase text-brand-red">
                Performance Numbers
              </span>
              <span className="w-8 h-0.5 bg-brand-red" />
            </div>
            <h2
              className="font-display text-black leading-[0.95]"
              style={{ fontSize: "clamp(48px, 7vw, 90px)" }}
            >
              THE NUMBERS
              <br />
              SPEAK <span className="text-brand-red">LOUD</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 reveal">
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} start={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-28 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[45%] h-[42%] tire-splash opacity-[0.12]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="reveal text-center mb-16">
            <h2
              className="font-display text-brand-ink leading-none"
              style={{ fontSize: "clamp(46px, 6vw, 82px)" }}
            >
              WHAT PEOPLE SAY
            </h2>
          </div>
          {/* <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className="reveal bg-white border border-brand-ink/8 p-10 min-h-[420px] shadow-xl shadow-brand-ink/5"
                whileHover={{ y: -12, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
              >
                <div className="flex items-center gap-4 mb-16">
                  <img
                    src={avatarPhotos[i]}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    onError={imageFallback}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-label text-2xl font-bold text-brand-ink leading-none">
                      {t.name}
                    </div>
                    <div className="font-label text-[13px] font-bold uppercase text-brand-ink/35 mt-1">
                      {t.city} / {t.car}
                    </div>
                  </div>
                </div>
                <div className="font-display text-6xl text-brand-red leading-none mb-6">
                  "
                </div>
                <p className="font-body text-brand-ink/65 leading-relaxed">
                  {t.text}
                </p>
                <div className="flex gap-1 mt-8">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-brand-gold fill-brand-gold"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div> */}

          <div className="overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scroll-smooth">
            {featuredLoading ? (
              <div className="flex items-center justify-center py-12">
                <span className="text-brand-red font-medium ">
                  Loading reviews{" "}
                </span>
                &nbsp;
                <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : featuredReviews.length === 0 ? (
              <div className="py-16 text-center text-brand-ink/60">
                No customer reviews yet.
              </div>
            ) : (
              <div className="flex gap-6 w-max px-1">
                {featuredReviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    whileHover={{
                      y: -8,
                      rotate: i % 2 === 0 ? -1 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    className="snap-start w-[320px] sm:w-[340px] lg:w-[360px] flex-shrink-0 rounded-3xl border border-brand-ink/10 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-xl font-bold uppercase text-white">
                        {review.full_name?.charAt(0)}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-label text-lg font-bold text-brand-ink">
                          {review.full_name}
                        </h3>

                        <p className="mt-1 text-sm text-brand-ink/50">
                          {review.product_name}
                        </p>

                        {review.is_verified_purchase === 1 && (
                          <span className="mt-2 inline-flex rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mt-6 flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= review.rating
                              ? "fill-brand-gold text-brand-gold"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="mt-5 min-h-[80px] text-[15px] leading-7 text-brand-ink/70">
                      "{review.review}"
                    </p>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-xs text-brand-ink/40">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>

                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-brand-red">
                        {review.rating}.0 ★
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="dark-panel bg-[#080808] py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-brand-red" />
              <span className="font-label font-semibold text-[11px] tracking-[0.35em] uppercase text-brand-red">
                Our Partners
              </span>
              <span className="w-8 h-0.5 bg-brand-red" />
            </div>
            <h2
              className="font-display text-white leading-[0.95]"
              style={{ fontSize: "clamp(48px, 7vw, 90px)" }}
            >
              20+ <span className="text-brand-red">TRUSTED</span>
              <br />
              GLOBAL BRANDS
            </h2>
          </div>
     <div className="overflow-hidden mb-8 reveal">
  <div className="brands-track">
    {brands.map((b) => (
      <div
        key={b.id}
        className="flex-shrink-0 mx-4 flex h-24 w-44 items-center justify-center rounded-2xl border border-white/10  p-4 hover:border-brand-red hover:bg-white/10 transition-all duration-300"
      >
        <img
          src={b.logo_url}
          alt={b.name}
          className="max-h-16 w-auto object-contain  hover:grayscale-0 transition duration-300"
        />
      </div>
    ))}
  </div>
</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 reveal">
            {BRAND_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="overflow-hidden"
                style={{ aspectRatio: "16/7" }}
              >
                <img
                  src={photo}
                  alt={`Brand ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  onError={imageFallback}
                  className="w-full h-full object-cover grayscale-[80%] hover:grayscale-0 transition-all duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
