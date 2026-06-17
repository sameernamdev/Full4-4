import { useParams, Link, useLocation } from "react-router-dom";
import { PRODUCTS } from "../data/data";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../config/axios";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const location = useLocation()
  const product = location?.state?.product
 const[prod,setProd]=useState(null)
  const [load, setLoad] = useState(false)


  console.log(id);

useEffect(()=>{
  if(product){
    setProd({...prod, ...product})
  }
}, [id])

console.log(prod);


  const fetchProduct = async (id) => {
    try {
      setLoad(true)
      const res = await api.get(`/products/get_product_by_id/${id}`);
      setProd(res.data?.data)
      console.log(res.data);
    } catch (error) {}
    finally{
      setLoad(false)
    }
  };
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
    return;
  }, []);

  return (
//     <div className="pt-24 min-h-screen bg-[#080808]">
//       <div className="max-w-7xl mx-auto px-4 py-10">
//         {/* Back Button */}
//         <Link
//           to="/products"
//           className="inline-flex items-center gap-2 text-white/70 hover:text-red-500 mb-8"
//         >
//           <ArrowLeft size={18} />
//           Back to Products
//         </Link>


// {load ? <p>Loading....</p> : (

//   <>
  
//    <div className="grid lg:grid-cols-2 gap-12">
//           {/* Product Image */}
//           <div className="bg-white rounded-3xl overflow-hidden">
//             <img
//               src={prod?.img}
//               alt={prod?.name}
//               className="w-full h-[500px] object-cover"
//             />
//           </div>

//           {/* Product Info */}
//           <div>
//             <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm">
//               {prod?.badge}
//             </span>

//             <h1 className="text-4xl font-bold text-white mt-5">
//               {prod?.name}
//             </h1>

//             <p className="text-white/60 mt-2">Brand: {product.brand}</p>

//             {/* <div className="flex items-center gap-2 mt-4">
//               <Star size={18} fill="#facc15" color="#facc15" />
//               <span className="text-white">{product.rating}</span>
//               <span className="text-white/50">({product.reviews} Reviews)</span>
//             </div> */}

//             {/* Price */}
//             <div className="flex items-center gap-4 mt-6">
//               <h2 className="text-4xl font-bold text-red-500">
//                 ₹{prod.price.toLocaleString()}
//               </h2>

//               <span className="text-white/40 line-through text-xl">
//                 {/* ₹{prod.oldPrice.toLocaleString()} */}
//               </span>

//               <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
//                 {discount}% OFF
//               </span>
//             </div>

//             {/* Compatibility */}
//             <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
//               <p className="text-white/60 text-sm">Compatibility</p>
//               {/* <p className="text-white font-medium">{prod.compatible}</p> */}
//             </div>

//             {/* Description */}
//             <div className="mt-8">
//               <h3 className="text-white text-xl font-semibold mb-3">
//                 Product Description
//               </h3>

//               {/* <p className="text-white/60 leading-relaxed">
//                 Premium quality {prod.name} by {prod.brand}. Designed for
//                 enhanced performance, durability, and reliability. Perfect for
//                 enthusiasts looking to upgrade their vehicle with genuine
//                 aftermarket components.
//               </p> */}
//             </div>

//             {/* Features */}
//             <div className="grid sm:grid-cols-3 gap-4 mt-8">
//               <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//                 <Truck className="text-red-500 mb-2" />
//                 <p className="text-white text-sm">Free Shipping</p>
//               </div>

//               <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//                 <ShieldCheck className="text-red-500 mb-2" />
//                 <p className="text-white text-sm">Genuine Product</p>
//               </div>

//               <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//                 <Star className="text-red-500 mb-2" />
//                 <p className="text-white text-sm">Top Rated</p>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-wrap gap-4 mt-10">
//               <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold">
//                 <ShoppingCart size={20} />
//                 Add to Cart
//               </button>

//               <button className="flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/10">
//                 <Heart size={20} />
//                 Wishlist
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-20">
//           <h2 className="text-3xl font-bold text-white mb-8">
//             Related Products
//           </h2>

//           <div className="grid md:grid-cols-4 gap-6">
//             {prod?.filter(
//               (p) => p.category === prod.category && p.id !== prod.id,
//             )
//               .slice(0, 4)
//               .map((item) => (
//                 <Link
//                   key={item.id}
//                   to={`/products/${item.id}`}
//                   className="bg-white rounded-2xl overflow-hidden"
//                 >
//                   <img
//                     src={item.img || ""}
//                     alt={item.name}
//                     className="w-full h-48 object-cover"
//                   />

//                   <div className="p-4">
//                     <h3 className="font-semibold">{item.name}</h3>

//                     <p className="text-red-600 font-bold mt-2">
//                       ₹{item.price.toLocaleString()}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//           </div>
//         </div> 
  
//   </>
// )}
       
//       </div>
//     </div>
<>

<>
  <div className="pt-24 min-h-screen bg-[#080808]   grid lg:grid-cols-2 gap-12">
    {/* Product Image */}
    <div className="bg-white rounded-3xl overflow-hidden flex items-center justify-center h-[500px]">
      <img
        src={
          prod?.primary_image_url ||
          "https://placehold.co/600x600?text=No+Image"
        }
        alt={prod?.name}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Product Info */}
    <div>
      <span
        className={`px-4 py-1 rounded-full text-sm ${
          prod?.status === "active"
            ? "bg-green-600 text-white"
            : "bg-gray-600 text-white"
        }`}
      >
        {prod?.status}
      </span>

      <h1 className="text-4xl font-bold text-white mt-5">
        {prod?.name}
      </h1>

      <p className="text-white/60 mt-2">
        Brand name: {prod?.brand_name}
      </p>

      <p className="text-white/60">
        Category name: {prod?.category_name}
      </p>


        <p className="text-white/60">
         Min Price: {product?.min_price
         }
      </p>
      <p className="text-white/60">
         Max Price: {product?.max_price
         }
      </p>
      
      

      {/* <p className="text-white/60">
        Sub Category ID: {prod?.sub_category_id}
      </p> */}

      {/* Short Description */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-2">
          Short Description
        </h3>

        <p className="text-white/70">
          {prod?.short_description}
        </p>
        <p className="text-white/70">
          {product?.min_price}
        </p>
      </div>

      {/* Long Description */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-3">
          Product Description
        </h3>

        <p className="text-white/60 leading-8">
          {prod?.long_description}
        </p>

      </div>

      {/* SEO */}
      {/* <div className="mt-8 p-5 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-lg text-white font-semibold mb-3">
          SEO Information
        </h3>

        <p className="text-white/70">
          <strong>Title:</strong> {prod?.seo_title}
        </p>

        <p className="text-white/70 mt-2">
          <strong>Description:</strong> {prod?.seo_description}
        </p>

        <p className="text-white/70 mt-2">
          <strong>Keywords:</strong> {prod?.seo_keywords}
        </p>
      </div> */}

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <Truck className="text-red-500 mb-2" />
          <p className="text-white text-sm">Free Shipping</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <ShieldCheck className="text-red-500 mb-2" />
          <p className="text-white text-sm">Genuine Product</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <Star className="text-red-500 mb-2" />
          <p className="text-white text-sm">Premium Quality</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl">
          <ShoppingCart size={20} />
          Add to Cart
        </button>

        <button className="flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/10">
          <Heart size={20} />
          Wishlist
        </button>
      </div>
    </div>
  </div>
</>
</>
    );
}
