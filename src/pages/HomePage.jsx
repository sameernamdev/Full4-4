import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Truck, Wrench, Award, Star, SprayCan, Gauge, Sparkles } from "lucide-react";
import { CATEGORIES, STATS, PRODUCTS, TESTIMONIALS, BRAND_NAMES, BRAND_PHOTOS } from "../data/data";
import { useReveal } from "../hooks/useReveal";
import ProductCard from "../components/ProductCard";
import StatCounter from "../components/StatCounter";
import fallbackImage from "../assets/hero.png";
import { useProducts } from "../hooks/useProducts";

const imageFallback = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallbackImage;
};


// adding categories in our services
export const categories = [
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
];



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

export default function HomePage({ setPage }) {
  useReveal();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const{products,loading,error}=useProducts()

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const brandsDouble = [...BRAND_NAMES, ...BRAND_NAMES];
  const marqueeWords = ["Premium Parts", "Genuine Quality", "Expert Support", "Pan India Delivery", "ISO Certified", "1 Year Product Warranty"];
  const marqueeDouble = [...marqueeWords, ...marqueeWords];

  return (
    <div className="bg-brand-off">
      <section className="dark-panel relative min-h-screen flex items-center overflow-hidden bg-[#080808]">
        <div className="absolute inset-0">
          <motion.img
            src="/hero.jpeg"
            alt="Sports Car"
            fetchPriority="high"
            decoding="async"
            onError={imageFallback}
            className="w-full h-auto object-cover opacity-95 brightness-[1.18] contrast-105 saturate-110"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081827]/68 via-[#081827]/26 to-transparent" />
          <div
            className="absolute inset-0 opacity-70 mix-blend-screen"
            style={{
              background: "radial-gradient(circle at 72% 35%, rgba(255,255,255,0.34), transparent 34%), linear-gradient(90deg, rgba(255,255,255,0.08), transparent 58%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage: "linear-gradient(rgba(227,30,36,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.6) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <motion.div
          data-anime-pulse
          className="absolute right-[13%] top-[34%] w-48 h-48 border border-white/60 rotate-45 pointer-events-none"
          animate={{ rotate: [45, 135, 45], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          data-anime-pulse
          className="absolute right-[10%] top-[30%] w-72 h-72 border border-brand-red/20 rotate-45 pointer-events-none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <motion.div
            data-anime-hero
            className="inline-flex items-center gap-3 border border-brand-red/45 px-5 py-2.5 mb-10 bg-black/25 backdrop-blur-sm"
            initial={{ opacity: 0, x: -42 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="blink w-2 h-2 bg-brand-red rounded-full" />
            <span className="font-label font-semibold text-[11px] tracking-[0.3em] uppercase text-white/70">
              New Gear Arrived
            </span>
          </motion.div>

          <motion.h1
            data-anime-hero
            className="font-display leading-[0.9] mb-8"
            style={{ fontSize: "clamp(76px, 11vw, 154px)" }}
            initial={{ opacity: 0, y: 55 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12 }}
          >
            <span className="block text-white">DRIVE</span>
            <span className="block text-brand-red">RANGER.</span>
            <span className="block text-white text-[0.54em] tracking-[0.08em]">PREMIUM AUTO PARTS</span>
          </motion.h1>

          <motion.p
            data-anime-hero
            className="font-body font-light text-[17px] text-white/62 max-w-md leading-relaxed mb-12"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.26 }}
          >
            Premium car parts & accessories from 20+ global brands. Genuine parts,
            expert fitment advice, pan-India delivery.
          </motion.p>

          <motion.div
            data-anime-hero
            className="flex flex-wrap gap-5 mb-16"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.38 }}
          >
            <motion.button
              onClick={() => setPage("products")}
              className="btn-clip btn-shine bg-brand-red text-white font-label font-bold text-[14px] tracking-[0.2em] uppercase px-10 py-4 flex items-center gap-3 hover:bg-brand-red2 transition-colors"
              whileHover={{ scale: 1.06, x: 6 }}
              whileTap={{ scale: 0.96 }}
            >
              Shop Parts <ArrowRight size={17} />
            </motion.button>
            <motion.button
              onClick={() => setPage("about")}
              className="btn-clip border border-white/25 bg-white/8 text-white font-label font-bold text-[14px] tracking-[0.15em] uppercase px-10 py-4 hover:border-brand-red/60 hover:text-brand-red transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              Our Story
            </motion.button>
          </motion.div>

          <div className="flex gap-10 flex-wrap">
            {[["40K+", "Parts in Stock"], ["20+", "Global Brands"], ["17Yr", "Experience"]].map(([val, lbl], i) => (
              <motion.div
                key={lbl}
                className={i > 0 ? "pl-10 border-l border-white/12" : ""}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.55 + i * 0.08 }}
              >
                <div className="font-display text-4xl text-white leading-none">{val}</div>
                <div className="font-label font-semibold text-[11px] tracking-[0.25em] uppercase text-white/40 mt-1">{lbl}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-brand-red overflow-hidden py-4">
        <div className="marquee-track">
          {marqueeDouble.map((item, i) => (
            <span key={i} className="font-display text-[18px] tracking-[0.12em] text-white px-10 whitespace-nowrap flex items-center gap-4">
              {item}
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full inline-block" />
            </span>
          ))}
        </div>
      </div>

      <section className="bg-brand-off py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal flex items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-0.5 bg-brand-red" />
                <span className="font-label font-semibold text-[11px] tracking-[0.35em] uppercase text-brand-red">
                  Shop By Category
                </span>
              </div>
              <h2 className="font-display text-brand-ink leading-[0.95]" style={{ fontSize: "clamp(48px, 7vw, 90px)" }}>
                EXPLORE<br />
                <span className="text-brand-red">CATEGORIES</span>
              </h2>
            </div>
            <motion.button
              onClick={() => setPage("products")}
              className="hidden md:flex btn-clip bg-[#0c2237] text-white px-8 py-4 font-label font-bold tracking-[0.2em] uppercase"
              whileHover={{ x: 6, scale: 1.04 }}
            >
              View All
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 reveal">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.name}
                onClick={() => setPage("products")}
                className="cat-card tilt-card relative overflow-hidden group text-left"
                style={{ aspectRatio: "1" }}
                data-scroll-float={i % 2 === 0 ? "1" : "-1"}
                data-tilt-3d
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 230, damping: 20 }}
              >
                <img src={cat.img} alt={cat.name} loading="lazy" decoding="async" onError={imageFallback} data-image-zoom className="cat-img w-full h-full object-cover transition-all duration-700 saturate-75 filter" />
                <div className="cat-overlay" />
                <div className="cat-arrow absolute top-5 right-5 w-10 h-10 border border-white/40 flex items-center justify-center opacity-0 translate-x-3 transition-all duration-300">
                  <ArrowRight size={15} className="text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-label font-semibold text-[10px] tracking-[0.3em] uppercase text-white/60 mb-1">{cat.count}+ Parts</div>
                  <div className="font-display text-[30px] text-white tracking-[0.03em]">{cat.name}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="dark-panel bg-[#080808] py-24 relative overflow-hidden">
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
            <h2 className="font-display text-white leading-[0.95]" style={{ fontSize: "clamp(48px, 7vw, 90px)" }}>
              THE NUMBERS<br />
              SPEAK <span className="text-brand-red">LOUD</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 reveal">
            {STATS.map((s) => <StatCounter key={s.label} {...s} start={statsVisible} />)}
          </div>
        </div>
      </section>

     <section className="dark-panel service-band relative py-28 overflow-hidden">
  <div className="absolute inset-0 bg-[#0c2237]/88" />

  <div className="relative max-w-7xl mx-auto px-6">
    {/* Heading */}
    <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end mb-16">
      <div className="reveal">
        <div className="font-label font-bold tracking-[0.35em] text-brand-red uppercase mb-5">
          Our Services
        </div>

        <h2
          className="font-display text-white leading-[0.92]"
          style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
        >
          MAKING THE BEST
          <br />
          <span className="text-brand-red">SERVICE</span> FOR OUR
          <br />
          CLIENTS
        </h2>

        <p className="font-body text-white/62 max-w-2xl mt-8 leading-relaxed">
          Premium car parts & accessories from 20+ global brands.
          Genuine parts, expert fitment advice, pan-India delivery.
        </p>
      </div>

      <motion.button
        onClick={() => setPage("products")}
        className="btn-clip bg-brand-red text-white px-12 py-6 font-label font-bold tracking-[0.18em] uppercase"
        whileHover={{ scale: 1.06, x: 8 }}
      >
        View All Services
      </motion.button>
    </div>

    {/* Categories Layout */}
    <div className="grid grid-cols-12 gap-3">

      {/* Top Left */}
      <motion.div
        className="col-span-12 lg:col-span-6 h-[320px] reveal relative overflow-hidden group"
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={categories[0].image}
          alt={categories[0].title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <h3 className="text-white text-4xl font-bold text-center">
            {categories[0].title}
          </h3>
        </div>
      </motion.div>

      {/* Top Right */}
      <motion.div
        className="col-span-12 lg:col-span-6 h-[320px] reveal relative overflow-hidden group"
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={categories[1].image}
          alt={categories[1].title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <h3 className="text-white text-4xl font-bold text-center">
            {categories[1].title}
          </h3>
        </div>
      </motion.div>

      {/* Bottom 3 Cards */}
      {categories.slice(2).map((item, index) => (
        <motion.div
          key={index}
          className="col-span-12 md:col-span-4 h-[320px] reveal relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full px-4">
            <h3 className="text-white text-3xl font-bold text-center">
              {item.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        <section className="bg-white py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <div className="reveal-left">
            <div className="font-label font-bold tracking-[0.28em] text-brand-red uppercase mb-5">Why Choose Us</div>
            <h2 className="font-display text-brand-ink leading-[0.95] mb-8" style={{ fontSize: "clamp(46px, 5.8vw, 82px)" }}>
              PROFESSIONAL CAR<br />
              PARTS SELLER SINCE<br />
              2009
            </h2>
            <p className="font-body text-brand-ink/62 leading-relaxed mb-10">
              With 15+ years serving car enthusiasts and professionals across India,
              Drive Ranger is synonymous with quality, authenticity, and service excellence.
            </p>
            <div className="space-y-8">
              {[
                { Icon: Shield, title: "100% Genuine Parts", desc: "Every part sourced directly from authorized distributors. Zero counterfeits, guaranteed." },
                { Icon: Truck, title: "Pan-India Delivery", desc: "Fast, reliable shipping to 27,000+ pin codes. Track in real-time from warehouse to doorstep." },
                { Icon: Wrench, title: "Expert Technical Support", desc: "Free fitment advice from our 50+ certified automotive engineers. Mon-Sat support." },
              ].map(({ Icon, title, desc }) => (
                <motion.div key={title} className="flex gap-5 items-start" whileHover={{ x: 8 }}>
                  <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center shrink-0">
                    <Icon size={27} className="text-white" />
                  </div>
                  <div>
                    <div className="font-label text-2xl font-bold text-brand-ink">{title}</div>
                    <div className="font-body text-brand-ink/58 leading-relaxed">{desc}</div>
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
              <img src={partsShowcase[0]} alt="Engine parts" loading="lazy" decoding="async" onError={imageFallback} className="w-full h-full object-cover grayscale contrast-125" />
            </motion.div>
            <motion.div
              className="absolute right-4 top-0 w-[42%] h-[34%] overflow-hidden border border-brand-ink/10 shadow-xl shadow-brand-ink/10"
              animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={partsShowcase[1]} alt="Auto spare parts" loading="lazy" decoding="async" onError={imageFallback} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              className="absolute right-0 bottom-16 w-[56%] h-[47%] overflow-hidden border border-brand-red/35 shadow-2xl shadow-brand-red/10"
              animate={{ y: [0, -20, 0], rotate: [1, -1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04 }}
            >
              <img src={partsShowcase[2]} alt="Workshop parts" loading="lazy" decoding="async" onError={imageFallback} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              className="absolute left-12 bottom-0 w-[38%] h-[31%] overflow-hidden bg-brand-red p-3 shadow-xl shadow-brand-red/25"
              animate={{ y: [0, 16, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.06, rotate: -2 }}
            >
              <img src={partsShowcase[3]} alt="Car accessories" loading="lazy" decoding="async" onError={imageFallback} className="w-full h-full object-cover grayscale-[35%]" />
            </motion.div>
            <motion.div
              className="absolute left-[42%] top-[42%] w-28 h-28 border border-brand-red/50"
              animate={{ rotate: [0, 360], scale: [1, 1.12, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </section>

      <section className="dark-panel bg-[#080808] py-28" id="products">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16 reveal">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-0.5 bg-brand-red" />
                <span className="font-label font-semibold text-[11px] tracking-[0.35em] uppercase text-brand-red">Top Picks</span>
              </div>
              <h2 className="font-display text-white leading-[0.95]" style={{ fontSize: "clamp(48px, 7vw, 90px)" }}>
                FEATURED<br />
                <span className="text-brand-red">PRODUCTS</span>
              </h2>
            </div>
            <motion.button onClick={() => setPage("products")} className="hidden md:flex items-center gap-2 font-label font-semibold text-[12px] tracking-[0.2em] uppercase text-white/55 hover:text-brand-red transition-colors" whileHover={{ x: 5 }}>
              View All <ArrowRight size={15} />
            </motion.button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? "Loading....." : (
            <>            
            {products?.slice(0, 4).map((p, i) => (
               <div key={p.id} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                 <ProductCard product={p} light={true} />
               </div>
             ))}
            </>
          )} 
          
          </div>
        </div>
      </section>

      <section className="bg-white py-28 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[45%] h-[42%] tire-splash opacity-[0.12]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="reveal text-center mb-16">
            <h2 className="font-display text-brand-ink leading-none" style={{ fontSize: "clamp(46px, 6vw, 82px)" }}>
              WHAT PEOPLE SAY
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className="reveal bg-white border border-brand-ink/8 p-10 min-h-[420px] shadow-xl shadow-brand-ink/5"
                whileHover={{ y: -12, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
              >
                <div className="flex items-center gap-4 mb-16">
                  <img src={avatarPhotos[i]} alt={t.name} loading="lazy" decoding="async" onError={imageFallback} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <div className="font-label text-2xl font-bold text-brand-ink leading-none">{t.name}</div>
                    <div className="font-label text-[13px] font-bold uppercase text-brand-ink/35 mt-1">{t.city} / {t.car}</div>
                  </div>
                </div>
                <div className="font-display text-6xl text-brand-red leading-none mb-6">"</div>
                <p className="font-body text-brand-ink/65 leading-relaxed">{t.text}</p>
                <div className="flex gap-1 mt-8">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-panel bg-[#080808] py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-brand-red" />
              <span className="font-label font-semibold text-[11px] tracking-[0.35em] uppercase text-brand-red">Our Partners</span>
              <span className="w-8 h-0.5 bg-brand-red" />
            </div>
            <h2 className="font-display text-white leading-[0.95]" style={{ fontSize: "clamp(48px, 7vw, 90px)" }}>
              20+ <span className="text-brand-red">TRUSTED</span><br />
              GLOBAL BRANDS
            </h2>
          </div>
          <div className="overflow-hidden mb-8 reveal">
            <div className="brands-track">
              {brandsDouble.map((b, i) => (
                <div key={i} className="flex-shrink-0 px-8 py-5 border border-white/10 bg-white/[0.03] mx-2 font-display text-[20px] tracking-[0.1em] text-white/45 hover:text-brand-red hover:border-brand-red hover:bg-brand-red/10 cursor-pointer transition-all duration-300 whitespace-nowrap">
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 reveal">
            {BRAND_PHOTOS.map((photo, i) => (
              <div key={i} className="overflow-hidden" style={{ aspectRatio: "16/7" }}>
                <img src={photo} alt={`Brand ${i + 1}`} loading="lazy" decoding="async" onError={imageFallback} className="w-full h-full object-cover grayscale-[80%] hover:grayscale-0 transition-all duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="dark-panel bg-brand-red py-28 relative overflow-hidden">
        <div className="absolute inset-0 font-display text-white/[0.06] flex items-center justify-center whitespace-nowrap pointer-events-none" style={{ fontSize: "clamp(90px, 16vw, 230px)", letterSpacing: "0.05em" }}>
          DRIVE RANGER
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="reveal">
            <div className="font-label font-semibold text-[12px] tracking-[0.4em] uppercase text-white/70 mb-5">
              Limited Time Offer - Weekend Special
            </div>
            <h2 className="font-display text-white leading-[0.88] mb-5" style={{ fontSize: "clamp(60px, 10vw, 140px)" }}>
              UP TO 40%<br />OFF THIS<br />WEEKEND
            </h2>
            <p className="font-body font-light text-[18px] text-white/75 mb-12">
              Don't miss our biggest sale. Premium parts at unbeatable prices.
            </p>
            <motion.button
              onClick={() => setPage("products")}
              className="btn-shine bg-white text-brand-red font-label font-bold text-[14px] tracking-[0.2em] uppercase px-14 py-5 inline-flex items-center gap-3 hover:bg-brand-off transition-all"
              whileHover={{ scale: 1.08, y: -4 }}
            >
              Shop the Sale <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
