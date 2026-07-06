// import { useParams, Link } from "react-router-dom";
// import {
//   Star,
//   ShoppingCart,
//   ArrowLeft,
//   Truck,
//   ShieldCheck,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { getProductId } from "../config/axios";
// import { useCart } from "../context/CartContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useVehicleCompatibility } from "../hooks/useVehicleCompatibility";
// import { useReviews } from "../hooks/useReviews";

// export default function ProductDetailsPage() {
//   const { id } = useParams();
//   const { addToCart } = useCart();
//   const { vehiclecompat, loading: vehicleLoad } = useVehicleCompatibility(id);
//   const { reviews, loading: reviewsLoad } = useReviews(id);

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [adding, setAdding] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const getImageUrl = (mediaItem) => {
//     if (!mediaItem) return null;
//     return mediaItem.image_url || null;
//   };

//   const handleAddToCart = async () => {
//     try {
//       setAdding(true);
//       await addToCart(product.id);
//       toast.success("Product added to cart!");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to add.");
//     } finally {
//       setAdding(false);
//     }
//   };

//   useEffect(() => {
//     if (!id) return;

//     const fetchProduct = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await getProductId(id);
//         if (data) {
//           setProduct(data);
//           if (data.media && data.media.length > 0) {
//             setSelectedImage(data.media[0]);
//           }
//         } else {
//           setProduct(null);
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError(err);
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center text-gray-700">
//         Loading...
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center text-gray-700">
//         {error ? "Failed to load product." : "Product not found."}
//       </div>
//     );
//   }

//   const {
//     name,
//     price,
//     sku,
//     weight,
//     width,
//     height,
//     depth,
//     is_available,
//     available_stock,
//     media = [],
//     category_id,
//     sub_category_id,
//     brand_id,
//     long_description,
//     short_description,
//     warranty_months
//   } = product;

//   const productName = name || "Product";
//   const productPrice = price ? `₹${Number(price).toLocaleString()}` : "Price on request";
//   const isInStock = is_available === 1 && available_stock > 0;

//   const mainImageUrl =
//     selectedImage?.image_url ||
//     (media.length > 0 ? media[0].image_url : null) ||
//     "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

//   const handleThumbnailClick = (mediaItem) => setSelectedImage(mediaItem);

//   return (
//     <div className="pt-24 min-h-screen bg-gray-50 text-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
//         <Link
//           to="/products"
//           className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
//         >
//           <ArrowLeft size={18} />
//           Back to Products
//         </Link>

//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
//           {/* Image Gallery */}
//           <div>
//             <div className="bg-white rounded-2xl overflow-hidden aspect-square w-full max-h-[550px] flex items-center justify-center border border-gray-200 shadow-sm">
//               <img
//                 src={mainImageUrl}
//                 alt={productName}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             {media.length > 0 && (
//               <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
//                 {media.map((item) => {
//                   const thumbUrl = item.image_url;
//                   if (!thumbUrl) return null;
//                   const isActive = selectedImage?.id === item.id;
//                   return (
//                     <button
//                       key={item.id}
//                       onClick={() => handleThumbnailClick(item)}
//                       className={`w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
//                         isActive
//                           ? "border-red-500 scale-95 shadow-md"
//                           : "border-gray-200 hover:border-gray-400 hover:scale-105"
//                       }`}
//                     >
//                       <img
//                         src={thumbUrl}
//                         alt={`Thumb ${item.id}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Product Details */}
//           <div className="space-y-6">
//             <span
//               className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
//                 isInStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//               }`}
//             >
//               {isInStock ? "In Stock" : "Out of Stock"}
//             </span>

//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               {productName}
//             </h1>

//             {brand_id && (
//               <p className="text-gray-500 text-lg">Brand ID: {brand_id}</p>
//             )}

//             <div className="mt-2">
//               <h2 className="text-3xl sm:text-4xl text-red-600 font-bold">
//                 {productPrice}
//               </h2>
//             </div>

//             {/* Details table */}
//             <div className="mt-6 space-y-3 text-sm border-t border-gray-200 pt-4">
//               <div className="flex justify-between border-b border-gray-100 pb-3">
//                 <span className="text-gray-500">SKU</span>
//                 <span className="text-gray-800 font-medium">{sku || "N/A"}</span>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-3">
//                 <span className="text-gray-500">Weight</span>
//                 <span className="text-gray-800 font-medium">{weight ? `${weight} kg` : "N/A"}</span>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-3">
//                 <span className="text-gray-500">Dimensions</span>
//                 <span className="text-gray-800 font-medium">
//                   {width && height && depth
//                     ? `${width} × ${height} × ${depth} cm`
//                     : "N/A"}
//                 </span>
//               </div>
//               {/* Optional: show available stock if desired */}
//               {/* <div className="flex justify-between border-b border-gray-100 pb-3">
//                 <span className="text-gray-500">Available Stock</span>
//                 <span className="text-gray-800 font-medium">{available_stock ?? 0}</span>
//               </div> */}
//             </div>

//             {/* Description */}
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {long_description || short_description || "No description available."}
//               </p>
//             </div>

//             {/* Vehicle Compatibility */}
//             <div className="mt-8">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">Vehicle Compatibility</h3>
//               {!vehicleLoad && vehiclecompat?.length === 0 ? (
//                 <p className="text-gray-500">No compatible vehicles found.</p>
//               ) : (
//                 <div className="space-y-4">
//                   {!vehicleLoad &&
//                     vehiclecompat?.map((v) => (
//                       <div
//                         key={v.id}
//                         className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-center shadow-sm"
//                       >
//                         <img
//                           src={v.make_logo_url}
//                           alt={v.make_name}
//                           className="w-14 h-14 rounded-full object-cover bg-gray-100"
//                         />
//                         {v.model_image_url && (
//                           <img
//                             src={v.model_image_url}
//                             alt={v.model_name}
//                             className="w-24 h-16 rounded-lg object-cover"
//                           />
//                         )}
//                         <div className="flex-1">
//                           <h4 className="text-lg font-semibold text-gray-800">
//                             {v.make_name} {v.model_name}
//                           </h4>
//                           <p className="text-gray-500">{v.generation_name}</p>
//                           <p className="text-sm text-gray-400">
//                             {v.year_from} - {v.year_to ?? "Present"}
//                           </p>
//                           <p className="text-sm text-red-500">
//                             Country: {v.make_country}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-3 gap-3 mt-6">
//               <div className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
//                 <Truck className="text-red-500 mx-auto mb-1" size={20} />
//                 <p className="text-xs text-gray-600">Free Shipping</p>
//               </div>
//               <div className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
//                 <ShieldCheck className="text-red-500 mx-auto mb-1" size={20} />
//                 <p className="text-xs text-gray-600">Genuine Product</p>
//               </div>

//               <div className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
//                 <Star className="text-red-500 mx-auto mb-1" size={20} />
//                 <p className="text-xs text-gray-600">Premium Quality {warranty_months && ` (${warranty_months} months warranty)`}</p>
//               </div>
//             </div>

//             {/* Add to Cart */}
//             <div className="flex flex-wrap gap-4 mt-8">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={!isInStock || adding}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
//                   isInStock
//                     ? "bg-red-600 hover:bg-red-700 text-white shadow-md"
//                     : "bg-gray-300 cursor-not-allowed text-gray-500"
//                 }`}
//               >
//                 <ShoppingCart size={20} />
//                 {adding ? "Adding..." : "Add to Cart"}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">

//   <h2 className="mb-6 text-2xl font-bold">
//     Customer Reviews ({reviews.length})
//   </h2>

//   {reviewsLoad ? (

//     <p className="text-gray-500">
//       Loading reviews...
//     </p>

//   ) : reviews.length === 0 ? (

//     <p className="text-gray-500">
//       No reviews yet.
//     </p>

//   ) : (

//     <div className="space-y-6">

//       {reviews.map((review) => (

//         <div
//           key={review.id}
//           className="border-b border-gray-200 pb-5 last:border-0"
//         >

//           <div className="flex items-center justify-between">

//             <h4 className="font-semibold">
//               {review.full_name}
//             </h4>

//             <span className="text-sm text-gray-500">
//               {new Date(review.created_at).toLocaleDateString("en-IN")}
//             </span>

//           </div>

//           <div className="mt-2 flex items-center gap-1">

//             {[1,2,3,4,5].map((star) => (

//               <Star
//                 key={star}
//                 size={18}
//                 className={
//                   star <= review.rating
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                 }
//               />

//             ))}

//           </div>

//           <p className="mt-3 text-gray-700 leading-7">
//             {review.review}
//           </p>

//         </div>

//       ))}

//     </div>

//   )}

// </div>
//       </div>
//     </div>
//   );
// }

import { useParams, Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Info,
  Car,
  MessageCircle,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getProductId } from "../config/axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVehicleCompatibility } from "../hooks/useVehicleCompatibility";
import { useReviews } from "../hooks/useReviews";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  // ── Lightbox state (UI only) ──
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { vehiclecompat, loading: vehicleLoad } =
    useVehicleCompatibility(product);
  const { reviews, loading: reviewsLoad } = useReviews(product?.id);

  // ─── ALL LOGIC UNCHANGED ──────────────────────────────
  const getImageUrl = (mediaItem) => {
    if (!mediaItem) return null;
    return mediaItem.image_url || null;
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart(product.id);
      toast.success("Product added to cart!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add.");
    } finally {
      setAdding(false);
    }
  };
  // console.log(product);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductId(id);
        if (data) {
          setProduct(data);
          if (data.media && data.media.length > 0) {
            setSelectedImage(data.media[0]);
          }
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ── Lightbox helpers ──
  const openLightbox = (images, index = 0) => {
    setLightboxImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const goPrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? lightboxImages.length - 1 : prev - 1,
    );
  };

  const goNext = () => {
    setCurrentImageIndex((prev) =>
      prev === lightboxImages.length - 1 ? 0 : prev + 1,
    );
  };

  // ─── RENDER ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center text-gray-700">
        <div className="animate-pulse text-xl">Loading…</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center text-gray-700">
        {error ? "Failed to load product." : "Product not found."}
      </div>
    );
  }

  const {
    name,
    price,
    sku,
    weight,
    width,
    height,
    depth,
    is_available,
    available_stock,
    media = [],
    brand_id,
    long_description,
    short_description,
    warranty_months,
    brand_name,
  } = product;

  const productName = name || "Product";
  const productPrice = price
    ? `₹${Number(price).toLocaleString()}`
    : "Price on request";
  const isInStock = is_available === 1 && available_stock > 0;

  const mainImageUrl =
    selectedImage?.image_url ||
    (media.length > 0 ? media[0].image_url : null) ||
    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

  const handleThumbnailClick = (mediaItem) => setSelectedImage(mediaItem);

  return (
    <div className="pt-24 min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ─── LEFT: Image Gallery ─────────────────────────── */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-square w-full max-h-[550px] flex items-center justify-center">
              <img
                src={mainImageUrl}
                alt={productName}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            {media.length > 0 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
                {media.map((item) => {
                  const thumbUrl = item.image_url;
                  if (!thumbUrl) return null;
                  const isActive = selectedImage?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleThumbnailClick(item)}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        isActive
                          ? "border-red-500 shadow-md scale-95"
                          : "border-gray-200 hover:border-gray-400 hover:scale-105"
                      }`}
                    >
                      <img
                        src={thumbUrl}
                        alt={`Thumb ${item.id}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ─── RIGHT: Product Info ────────────────────────── */}
          <div className="space-y-6">
            {/* Stock & Name */}
            <div>
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
                  isInStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isInStock ? "✓ In Stock" : "✗ Out of Stock"}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 leading-tight">
                {productName}
              </h1>
              {/* {brand_id && (
                <p className="text-sm text-gray-500 mt-1">Brand ID: {brand_id}</p>
              )} */}

              {brand_name && (
                <p className="text-sm text-gray-500 mt-1">
                  Brand Name: {brand_name}
                </p>
              )}
            </div>

            {/* ─── PRICE & CART ──────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  Price
                </p>
                <span className="text-4xl font-bold text-red-600">
                  {productPrice}
                </span>
                {/* {isInStock && (
                  <p className="text-sm text-gray-500 mt-1">
                    {available_stock} available
                  </p>
                )} */}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!isInStock || adding}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all ${
                  isInStock
                    ? "bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                <ShoppingCart size={22} />
                {adding ? "Adding…" : "Add to Cart"}
              </button>
            </div>

            {/* ─── TABS ────────────────────────────────────────── */}
            <div className="border-b border-gray-200">
              <div className="flex gap-6 text-sm font-medium">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-3 transition ${
                    activeTab === "description"
                      ? "border-b-2 border-red-500 text-red-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Info size={16} className="inline mr-1" /> Description
                </button>
                <button
                  onClick={() => setActiveTab("compatibility")}
                  className={`pb-3 transition ${
                    activeTab === "compatibility"
                      ? "border-b-2 border-red-500 text-red-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Car size={16} className="inline mr-1" /> Compatibility
                </button>


                {reviewsLoad ? (
                  <button
                   disabled
                    className={`pb-3 transition flex items-center gap-2 ${
                      activeTab === "reviews"
                        ? "border-b-2 border-red-500 text-red-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <MessageCircle size={16} className="inline mr-1" /> Reviews
                    <div className="w-6 h-6 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto"></div>

                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`pb-3 transition ${
                      activeTab === "reviews"
                        ? "border-b-2 border-red-500 text-red-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <MessageCircle size={16} className="inline mr-1" /> Reviews
                    ({reviews.length})
                  </button>
                )}
              </div>
            </div>

            {/* ─── TAB CONTENT ────────────────────────────────── */}
            <div className="pt-2">
              {activeTab === "description" && (
                <div className="space-y-4">
                  {short_description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {short_description}
                    </p>
                  )}
                  <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500">SKU</span>
                      <span className="font-medium">{sku || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500">Weight</span>
                      <span className="font-medium">
                        {weight ? `${weight} kg` : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dimensions</span>
                      <span className="font-medium">
                        {width && height && depth
                          ? `${width} × ${height} × ${depth} cm`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Full Description
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {long_description || "No description available."}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
                      <Truck className="text-red-500 mx-auto mb-1" size={20} />
                      <p className="text-xs text-gray-600">Free Shipping</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
                      <ShieldCheck
                        className="text-red-500 mx-auto mb-1"
                        size={20}
                      />
                      <p className="text-xs text-gray-600">Genuine Product</p>
                    </div>
                    {warranty_months ? (
                      <div className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
                        <Star className="text-red-500 mx-auto mb-1" size={20} />
                        <p className="text-xs text-gray-600">
                          Premium quality{" "}
                          {warranty_months &&
                            `(${warranty_months}month warranty)`}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}

              {activeTab === "compatibility" && (
                <div>
                  {!vehicleLoad && vehiclecompat?.length === 0 ? (
                    <p className="text-gray-500">
                      No compatible vehicles found.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {!vehicleLoad &&
                        vehiclecompat?.map((v) => (
                          <div
                            key={v.id}
                            className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-center shadow-sm"
                          >
                            <img
                              src={v.make_logo_url}
                              alt={v.make_name}
                              className="w-14 h-14 rounded-full object-cover bg-gray-100"
                            />
                            {v.model_image_url && (
                              <img
                                src={v.model_image_url}
                                alt={v.model_name}
                                className="w-24 h-16 rounded-lg object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-800">
                                {v.make_name} {v.model_name}
                              </h4>
                              <p className="text-gray-500">
                                {v.generation_name}
                              </p>
                              <p className="text-sm text-gray-400">
                                {v.year_from} - {v.year_to ?? "Present"}
                              </p>
                              <p className="text-sm text-red-500">
                                Country: {v.make_country}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* ─── REVIEWS TAB ──────────────────────────────── */}
              {activeTab === "reviews" && (
                <div>
                  {reviewsLoad ? (
                    <p className="text-gray-500">Loading reviews…</p>
                  ) : reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                  ) : (
                    <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                      {reviews.map((review) => {
                        // Extract image URLs from the review
                        const reviewImages =
                          review.images?.map((img) => img.url) || [];
                        return (
                          <div
                            key={review.id}
                            className="border-b border-gray-200 pb-5 last:border-0"
                          >
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-gray-800">
                                  {review.full_name}
                                </h4>
                                {review.is_verified_purchase === 1 && (
                                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    <CheckCircle size={12} />
                                    Verified
                                  </span>
                                )}
                                {/* {review.status && (
                                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                                    review.status === "approved"
                                      ? "bg-green-100 text-green-700"
                                      : review.status === "pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }`}>
                                    {review.status}
                                  </span>
                                )} */}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString(
                                  "en-IN",
                                )}
                              </span>
                            </div>

                            <div className="mt-2 flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={18}
                                  className={
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>

                            <p className="mt-3 text-gray-700 leading-7">
                              {review.review}
                            </p>

                            {/* ─── Review Images with click-to-open lightbox ─── */}
                            {reviewImages.length > 0 && (
                              <div className="mt-3 flex gap-2 flex-wrap">
                                {reviewImages.map((url, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() =>
                                      openLightbox(reviewImages, idx)
                                    }
                                    className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-red-400 transition focus:outline-none focus:ring-2 focus:ring-red-300"
                                  >
                                    <img
                                      src={url}
                                      alt={`Review image ${idx + 1}`}
                                      className="w-full h-full object-cover hover:scale-110 transition duration-200"
                                    />
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── STICKY BOTTOM BAR ─────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-red-600">
              {productPrice}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {isInStock ? "In stock" : "Out of stock"}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!isInStock || adding}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${
              isInStock
                ? "bg-red-600 hover:bg-red-700 text-white shadow-md"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
            }`}
          >
            <ShoppingCart size={20} />
            {adding ? "Adding…" : "Add to Cart"}
          </button>
        </div>
      </div>
      <div className="h-24 lg:h-0" />

      {/* ─── LIGHTBOX MODAL ─────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            >
              <X size={28} />
            </button>

            {/* Previous */}
            <button
              onClick={goPrev}
              className="absolute left-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next */}
            <button
              onClick={goNext}
              className="absolute right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={lightboxImages[currentImageIndex]}
                alt={`Review image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {lightboxImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
