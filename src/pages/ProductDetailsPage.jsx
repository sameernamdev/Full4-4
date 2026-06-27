import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../config/axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useImages from "../hooks/useImages";
import { useVehicleCompatibility } from "../hooks/useVehicleCompatibility";

export default function ProductDetailsPage() {
  const { id } = useParams();
  // console.log("id hai",id)
  const { addToCart } = useCart();
  const { images } = useImages(id); // array of image objects or strings

  const{vehiclecompat, loading: vehicleLoad } =  useVehicleCompatibility(id)
 

  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  // State for the main image (selected from thumbnails)
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  // Helper function to get image URL safely
  const getImageUrl = (img) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    if (img.url) return img.url;
    if (img.image_url) return img.image_url;
    if (img.image) return img.image;
    return null;
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart(selectedItem.id);
      toast.success("Product added to cart successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || "Failed to add product to cart.",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        }
      );
    } finally {
      setAdding(false);
    }
  };

  // Fetch product and items
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const productRes = await api.get(`/products/get_product_by_id/${id}`);
        setProduct(productRes.data?.data);

        const itemsRes = await api.get(
          `/products/get_all_items?product_id=${id}`
        );
        const productItems = itemsRes.data?.data || [];
        setItems(productItems);
        if (productItems.length > 0) {
          setSelectedItem(productItems[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Set first image as selected when images load
  useEffect(() => {
    if (images && images.length > 0) {
      console.log("Images received:", images); // debug
      setSelectedImage(images[0]);
    }
  }, [images]);

  // Loading and error states
  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!product || !selectedItem) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center text-white">
        No product found.
      </div>
    );
  }

  // Fallback values
  const productName = product.name || selectedItem?.product?.name || "Product";
  const productBrand =
    product.brand_name || selectedItem?.product?.brand || "Brand";
  const productCategory =
    product.category_name || selectedItem?.product?.category || "";
  const productSubCategory =
    product.subcategory_name || selectedItem?.product?.sub_category || "";
  const productDescription =
    product.long_description || selectedItem?.product?.long_description || "";

  // Main image URL: selected thumbnail or first product image or placeholder
  const mainImageUrl =
    getImageUrl(selectedImage) ||
    (selectedItem?.product?.images?.length > 0
      ? getImageUrl(selectedItem.product.images[0])
      : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png");

  const handleThumbnailClick = (img) => {
    // console.log("Thumbnail clicked:", img); // debug
    setSelectedImage(img);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Back button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Image Gallery - left column */}
          <div>
            {/* Main Image */}
            <div className="bg-white/5 rounded-2xl sm:rounded-3xl overflow-hidden aspect-square w-full max-h-[550px] flex items-center justify-center border border-white/10 relative">
              <img
                src={mainImageUrl}
                alt={productName}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Thumbnails - mapped from useImages */}
            {images && images.length > 0 && (
              <div className="flex gap-3 sm:gap-4 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
                {images.map((img, index) => {
                  const thumbUrl = getImageUrl(img);
                  if (!thumbUrl) return null; // skip if no URL
                  const isActive = getImageUrl(selectedImage) === thumbUrl;
                  return (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(img)}
                      className={`w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        isActive
                          ? "border-red-500 scale-95"
                          : "border-white/20 hover:border-white/50 hover:scale-105"
                      }`}
                    >
                      <img
                        src={thumbUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Details - right column */}
          <div className="space-y-6">
            {/* Stock badge */}
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                selectedItem.is_available ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {selectedItem.is_available ? "In Stock" : "Out of Stock"}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {productName}
            </h1>
            <p className="text-gray-400 text-lg">{productBrand}</p>

            {/* Price */}
            <div className="mt-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-red-500 font-bold">
                ₹{Number(selectedItem.price).toLocaleString()}
              </h2>
            </div>

            {/* Variation Selector */}
            {items.length > 1 && (
              <div className="mt-6">
                <p className="text-gray-400 text-sm mb-3">Select Variation</p>
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`px-5 py-2 rounded-full border transition-all flex items-center gap-2 text-sm sm:text-base ${
                        selectedItem.id === item.id
                          ? "border-red-500 bg-red-500/20 text-white"
                          : "border-white/20 hover:border-white/50 text-gray-300"
                      }`}
                    >
                      {item.variation_value}
                      {selectedItem.id === item.id && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Details table */}
            <div className="mt-6 space-y-3 text-sm sm:text-base">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">Variation</span>
                <span className="text-white font-medium">
                  {selectedItem.variation_value}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">SKU</span>
                <span className="text-white font-medium">
                  {selectedItem.sku}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">Weight</span>
                <span className="text-white font-medium">
                  {selectedItem.weight} kg
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">Dimensions</span>
                <span className="text-white font-medium">
                  {selectedItem.width} × {selectedItem.height} ×{" "}
                  {selectedItem.depth} cm
                </span>
              </div>
            </div>

            {/* Category */}
            <div className="mt-6 text-sm sm:text-base">
              <p className="text-gray-400">
                Category :{" "}
                <span className="text-white ml-2">{productCategory}</span>
              </p>
              <p className="text-gray-400 mt-1">
                Sub Category :{" "}
                <span className="text-white ml-2">{productSubCategory}</span>
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Description
              </h3>
              <p className="text-gray-400 leading-relaxed sm:leading-8">
                {productDescription}
              </p>
            </div>

{/* copatibility */}
            {/* Vehicle Compatibility */}
<div className="mt-8">
  <h3 className="text-2xl font-bold mb-4">
    Vehicle Compatibility
  </h3>

  {!vehicleLoad && vehiclecompat?.length === 0 ? (
    <p className="text-gray-400">
      No compatible vehicles found.
    </p>
  ) : (
    <div className="space-y-4">
      {!vehicleLoad && vehiclecompat?.map((vehicle) => (
        <div
          key={vehicle.id}
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-center"
        >
          <img
            src={vehicle.make_logo_url}
            alt={vehicle.make_name}
            className="w-14 h-14 rounded-full object-cover bg-white"
          />

          {vehicle.model_image_url && (
            <img
              src={vehicle.model_image_url}
              alt={vehicle.model_name}
              className="w-24 h-16 rounded-lg object-cover"
            />
          )}

          <div className="flex-1">
            <h4 className="text-lg font-semibold">
              {vehicle.make_name} {vehicle.model_name}
            </h4>

            <p className="text-gray-400">
              {vehicle.generation_name}
            </p>

            <p className="text-sm text-gray-500">
              {vehicle.year_from} - {vehicle.year_to ?? "Present"}
            </p>

            <p className="text-sm text-red-400">
              Country: {vehicle.make_country}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center">
                <Truck className="text-red-500 mx-auto mb-1 sm:mb-2" size={20} />
                <p className="text-xs sm:text-sm">Free Shipping</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center">
                <ShieldCheck className="text-red-500 mx-auto mb-1 sm:mb-2" size={20} />
                <p className="text-xs sm:text-sm">Genuine Product</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center">
                <Star className="text-red-500 mx-auto mb-1 sm:mb-2" size={20} />
                <p className="text-xs sm:text-sm">Premium Quality</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedItem.is_available || adding}
                className={`flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition text-sm sm:text-base ${
                  selectedItem.is_available
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-600 cursor-not-allowed text-gray-300"
                }`}
              >
                <ShoppingCart size={20} />
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}