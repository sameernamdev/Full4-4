import { useState } from "react";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import fallbackImage from "../assets/hero.png";
import { useProduct } from "../context/ProductProvider";
import { Link } from "react-router-dom";

export default function ProductCard({ product, light = false }) {
  console.log(product);
  
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  const handleAdd = () => { 
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link to={`/products/${product.id}`} state={{product}}>
    <div data-tilt-3d className={`product-card tilt-card overflow-hidden cursor-pointer group
      ${light
        ? "bg-white border border-brand-ink/10 hover:border-brand-red"
        : "glass hover:border-brand-red/40"
      }`}
    >
      {/* ── IMAGE ── */}
      <div className="relative h-52 overflow-hidden bg-brand-light">
        <img
          src={product.primary_image || "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80"}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
          className="w-full h-full object-cover transition-all duration-500
            group-hover:scale-105 saturate-75 group-hover:saturate-100"
        />
        {/* Hover overlay with Add to Cart */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          flex items-end justify-center pb-4">
          <button
            onClick={handleAdd}
            className="btn-shine bg-brand-red text-white font-label font-bold
              text-[12px] tracking-[0.15em] uppercase px-6 py-2.5 flex items-center gap-2
              transition-all"
          >
            <ShoppingCart size={14} />
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3">
          <span className="bg-brand-red text-white font-label font-bold
            text-[10px] tracking-[0.15em] uppercase px-2.5 py-1">
            {product.name}
          </span>
        </div>
        {/* <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white font-label font-bold
            text-[10px] px-2.5 py-1">
            -{discount}%
          </span>
        </div> */}
      </div>

      {/* ── BODY ── */}
      <div className="p-5">
        <div className={`font-label font-semibold text-[11px] tracking-[0.25em] uppercase mb-1
          text-brand-red`}>
          {product.brand_name} · {product.category_name}
        </div>
        <h3 className={`font-label font-bold text-lg leading-tight mb-2
          ${light ? "text-brand-ink" : "text-white"}`}>
          {product.name}
        </h3>

        {/* Stars */}
        {/* <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(product.rating)
                ? "text-brand-gold fill-brand-gold"
                : "text-gray-500"}
            />
          ))}
          <span className={`text-[11px] ml-1 font-body
            ${light ? "text-gray-500" : "text-gray-500"}`}>
            ({product.reviews})
          </span>
        </div> */}

        {/* <div className={`text-[11px] font-body mb-3
          ${light ? "text-gray-400" : "text-gray-600"}`}>
          🔧 {product.compatible}
        </div> */}

        {/* Footer */}
        <div className={`flex items-center justify-between pt-3
          ${light ? "border-t border-brand-ink/10" : "border-t border-white/6"}`}>
          <div>
            <div className={`font-display text-[15px]
              ${light ? "text-brand-ink" : "text-white"}`}>
              min $ {product.min_price}
            </div>
            <div className="font-body text-[15px] text-black">
             max $ {product.max_price}
            </div>
          </div>
          <button
            className={`w-9 h-9 flex items-center justify-center transition-all
              hover:bg-brand-red hover:text-white hover:border-brand-red
              ${light ? "border border-brand-ink/15 text-gray-400" : "glass text-gray-400"}`}
            onClick={handleAdd}
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
}
