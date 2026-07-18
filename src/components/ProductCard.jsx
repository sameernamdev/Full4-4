import { useState } from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import fallbackImage from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product, light = true }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
console.log(product);

  const [added, setAdded] = useState(false);

  const handleCardClick = () => {
    navigate(`/products/${product.slug}`, {
      state: { product },
    });
  };
const handleAdd = async (e) => {
  e.stopPropagation();

  await addToCart(product);

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
  }, 2000);
};

  return (
    <div
      data-tilt-3d
      onClick={handleCardClick}
      className={`product-card tilt-card overflow-hidden cursor-pointer group
        ${
          light
            ? "bg-white border border-brand-ink/10 hover:border-brand-red"
            : "glass hover:border-brand-red/40"
        }`}
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden bg-brand-light">
        <img
          src={
            // product.primary_image ||
            product.media[0]?.image_url ||
            // "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80"
             "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
          }
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 saturate-75 group-hover:saturate-100"
        />

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          flex items-end justify-center pb-4"
        >
          {/* <button
            onClick={handleAdd}
            className="btn-shine bg-brand-red text-white font-label font-bold
            text-[12px] tracking-[0.15em] uppercase px-6 py-2.5
            flex items-center gap-2"
          >
            <ShoppingCart size={14} />
            {added ? "✓ Added!" : "Add to Cart"}
          </button> */}
        </div>

        {/* Product Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="bg-brand-red text-white font-label font-bold
            text-[10px] tracking-[0.15em] uppercase px-2.5 py-1"
          >
            {product.name}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-5">
        <div
          className={`font-label font-semibold text-[11px] tracking-[0.25em] uppercase mb-1 text-brand-red`}
        >
          {product.brand_name} · {product.category_name}
        </div>

        <h3
          className={`font-label font-bold text-lg leading-tight mb-2 ${
            light ? "text-brand-ink" : "text-white"
          }`}
        >
          {product.name}
        </h3>

        <div
          className={`flex items-center justify-between pt-3 ${
            light
              ? "border-t border-brand-ink/10"
              : "border-t border-white/6"
          }`}
        >
          <div>
            <div
              className={`font-display text-[15px] ${
                light ? "text-brand-ink" : "text-white"
              }`}
            >
              Price ₹ {product.price} 
            </div>

           
          </div>
              
          <button
            onClick={handleCardClick}
            className={`w-9 h-9 flex items-center justify-center transition-all
              hover:bg-brand-red hover:text-white hover:border-brand-red
              ${
                light
                  ? "border border-brand-ink/15 text-gray-400"
                  : "glass text-gray-400"
              }`}
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}











// import { useState } from "react";
// import { ShoppingCart, ArrowRight } from "lucide-react";
// import fallbackImage from "../assets/hero.png";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../hooks/useCart";

// export default function ProductCard({ product, light = false }) {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [added, setAdded] = useState(false);

//   // actual product object
//   const item = product.product || {};

//   // image
//   const image =
//     item.images?.length > 0
//       ? item.images[0].image ||
//         item.images[0].image_url ||
//         item.images[0].url
//       : fallbackImage;

//   const handleCardClick = () => {
//     navigate(`/products/${item.id}`, {
//       state: { product },
//     });
//   };

//   const handleAdd = async (e) => {
//     e.stopPropagation();

//     await addToCart(product);

//     setAdded(true);

//     setTimeout(() => setAdded(false), 2000);
//   };

//   return (
//     <div
//       data-tilt-3d
//       onClick={handleCardClick}
//       className={`product-card tilt-card overflow-hidden cursor-pointer group ${
//         light
//           ? "bg-white border border-brand-ink/10 hover:border-brand-red"
//           : "glass hover:border-brand-red/40"
//       }`}
//     >
//       {/* IMAGE */}
//       <div className="relative h-52 overflow-hidden bg-brand-light">
//         <img
//           src={image}
//           alt={item.name}
//           loading="lazy"
//           onError={(e) => {
//             e.currentTarget.src = fallbackImage;
//           }}
//           className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
//         />

//         {/* Overlay */}
//         <div
//           className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent
//           opacity-0 group-hover:opacity-100 transition duration-300
//           flex items-end justify-center pb-4"
//         >
//           <button
//             onClick={handleAdd}
//             className="btn-shine bg-brand-red text-white px-6 py-2.5 flex items-center gap-2"
//           >
//             <ShoppingCart size={15} />
//             {added ? "✓ Added!" : "Add to Cart"}
//           </button>
//         </div>

//         {/* Variation Badge */}
//         <div className="absolute top-3 left-3">
//           <span className="bg-brand-red text-white text-[10px] uppercase px-2 py-1">
//             {product.variation_value}
//           </span>
//         </div>
//       </div>

//       {/* BODY */}
//       <div className="p-5">
//         <div className="text-brand-red text-[11px] uppercase tracking-[0.2em] mb-1">
//           {item.brand} • {item.category}
//         </div>

//         <h3
//           className={`font-bold text-lg mb-2 ${
//             light ? "text-brand-ink" : "text-white"
//           }`}
//         >
//           {item.name}
//         </h3>

//         <p
//           className={`text-sm line-clamp-2 mb-4 ${
//             light ? "text-gray-600" : "text-gray-300"
//           }`}
//         >
//           {item.short_description}
//         </p>

//         <div
//           className={`flex items-center justify-between pt-3 ${
//             light
//               ? "border-t border-brand-ink/10"
//               : "border-t border-white/10"
//           }`}
//         >
//           <div>
//             <div
//               className={`font-bold text-lg ${
//                 light ? "text-brand-ink" : "text-white"
//               }`}
//             >
//               ₹ {Number(product.price).toLocaleString()}
//             </div>

//             <div className="text-xs text-green-500">
//               Stock : {product.available_stock}
//             </div>

//             <div className="text-xs text-gray-500 mt-1">
//               SKU : {product.sku}
//             </div>
//           </div>

//           <button
//             onClick={handleCardClick}
//             className={`w-9 h-9 flex items-center justify-center transition-all
//               hover:bg-brand-red hover:text-white ${
//                 light
//                   ? "border border-brand-ink/15 text-gray-500"
//                   : "glass text-gray-400"
//               }`}
//           >
//             <ArrowRight size={15} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }