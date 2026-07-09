// import { Link, useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock, MapPin, CreditCard } from "lucide-react";
// import { useOrderDetails } from "../hooks/useOrderDetails";
// import { useAuth } from "../context/AuthContext";

// export default function OrderDetailsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const { order, loading, error } = useOrderDetails(id);

//   if (!isAuthenticated) {
//     navigate("/login");
//     return null;
//   }

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending": return <Clock className="text-yellow-500" size={24} />;
//       case "confirmed":
//       case "processing": return <Truck className="text-blue-500" size={24} />;
//       case "shipped": return <Truck className="text-purple-500" size={24} />;
//       case "delivered": return <CheckCircle className="text-green-500" size={24} />;
//       case "cancelled": return <XCircle className="text-red-500" size={24} />;
//       default: return <Package className="text-gray-400" size={24} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending": return "bg-yellow-500/20 text-yellow-500";
//       case "confirmed":
//       case "processing": return "bg-blue-500/20 text-blue-500";
//       case "shipped": return "bg-purple-500/20 text-purple-500";
//       case "delivered": return "bg-green-500/20 text-green-500";
//       case "cancelled": return "bg-red-500/20 text-red-500";
//       default: return "bg-gray-500/20 text-gray-400";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
//         <div className="text-white">Loading order details...</div>
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
//         <div className="text-center">
//           <Package size={64} className="text-white/20 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-white">Order Not Found</h2>
//           <p className="text-gray-400 mt-2">{error || "The order you're looking for doesn't exist."}</p>
//           <Link
//             to="/orders"
//             className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
//           >
//             Back to Orders
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const subtotal = parseFloat(order.subtotal) || 0;
//   const shipping = parseFloat(order.shipping_cost) || 0;
//   const tax = parseFloat(order.tax_amount) || 0;
//   const discount = parseFloat(order.discount_amount) || 0;
//   const total = parseFloat(order.total_amount) || 0;

//   return (
//     <div className="pt-24 min-h-screen bg-[#080808] py-10">
//       <div className="max-w-4xl mx-auto px-4">
//         <Link
//           to="/orders"
//           className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-6"
//         >
//           <ArrowLeft size={18} />
//           Back to Orders
//         </Link>

//         <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-white">Order #{order.id}</h1>
//             <p className="text-gray-400 mt-1">
//               Placed on {new Date(order.order_date).toLocaleDateString("en-IN", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </p>
//           </div>
//           <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.order_status)}`}>
//             {order.order_status || "Pending"}
//           </div>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white/5 rounded-xl p-6 border border-white/10">
//             <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
//               <Package size={18} />
//               <span>Order Status</span>
//             </div>
//             <div className="flex items-center gap-2 text-white font-semibold">
//               {getStatusIcon(order.order_status)}
//               {order.order_status || "Pending"}
//             </div>
//           </div>
//           <div className="bg-white/5 rounded-xl p-6 border border-white/10">
//             <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
//               <CreditCard size={18} />
//               <span>Payment</span>
//             </div>
//             <div className="text-white font-semibold">{order.payment_method || "N/A"}</div>
//             <div className="text-sm text-gray-400">{order.payment_status || "Pending"}</div>
//           </div>
//           <div className="bg-white/5 rounded-xl p-6 border border-white/10">
//             <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
//               <Truck size={18} />
//               <span>Total</span>
//             </div>
//             <div className="text-white font-bold text-xl">₹{total.toFixed(2)}</div>
//           </div>
//         </div>

//         <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
//           <h2 className="text-xl font-semibold text-white mb-4">Order Items</h2>
//           <div className="space-y-3">
//             {order.items?.map((item) => {
//               let productName = item.product_name || "Product";
//               let sku = item.sku || "";
//               let unitPrice = parseFloat(item.unit_price) || 0;
//               if (item.product_data_snapshot) {
//                 try {
//                   const snapshot = typeof item.product_data_snapshot === "string"
//                     ? JSON.parse(item.product_data_snapshot)
//                     : item.product_data_snapshot;
//                   productName = snapshot.product_name || productName;
//                   sku = snapshot.sku || sku;
//                 } catch (e) {}
//               }
//               return (
//                 <div key={item.id} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
//                   <div>
//                     <p className="text-white font-medium">{productName}</p>
//                     <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
//                     {sku && <p className="text-xs text-gray-500">SKU: {sku}</p>}
//                   </div>
//                   <div className="text-right">
//                     <p className="text-white font-semibold">₹{(unitPrice * item.quantity).toFixed(2)}</p>
//                     <p className="text-sm text-gray-400">₹{unitPrice.toFixed(2)} each</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
//             <div className="flex justify-between text-sm text-gray-400">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             {shipping > 0 && (
//               <div className="flex justify-between text-sm text-gray-400">
//                 <span>Shipping</span>
//                 <span>₹{shipping.toFixed(2)}</span>
//               </div>
//             )}
//             {tax > 0 && (
//               <div className="flex justify-between text-sm text-gray-400">
//                 <span>Tax</span>
//                 <span>₹{tax.toFixed(2)}</span>
//               </div>
//             )}
//             {discount > 0 && (
//               <div className="flex justify-between text-sm text-green-500">
//                 <span>Discount</span>
//                 <span>-₹{discount.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
//               <span>Total</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {order.shipping_address && (
//           <div className="bg-white/5 rounded-xl p-6 border border-white/10">
//             <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
//               <MapPin size={18} />
//               <span>Shipping Address</span>
//             </div>
//             <div className="text-white">
//               <p>{order.shipping_address.full_name || "N/A"}</p>
//               <p>{order.shipping_address.line1 || ""}</p>
//               {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
//               <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
//               <p>{order.shipping_address.country}</p>
//               <p>Phone: {order.shipping_address.phone || "N/A"}</p>
//             </div>
//           </div>
//         )}

//         {order.customer_notes && (
//           <div className="mt-6 bg-white/5 rounded-xl p-6 border border-white/10">
//             <h3 className="text-white font-semibold mb-2">Order Notes</h3>
//             <p className="text-gray-400">{order.customer_notes}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











// import { Link, Navigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Package,
//   Truck,
//   CheckCircle,
//   XCircle,
//   Clock,
//   MapPin,
//   CreditCard,
// } from "lucide-react";

// import { useOrderDetails } from "../hooks/useOrderDetails";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";
// import ReviewModal from "../components/reviews/ReviewModal";
// import { useReviews } from "../hooks/useReviews";

// export default function OrderDetailsPage() {
//   const { id } = useParams();
//   const { isAuthenticated } = useAuth();
//   const { order, loading, error } = useOrderDetails(id);

//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [selectedItem,setSelectedItem] = useState(null);
//   // const{reviews}=useReviews(selectedItem?.product_id)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return <Clock className="text-yellow-600" size={22} />;

//       case "confirmed":
//       case "processing":
//         return <Truck className="text-blue-600" size={22} />;

//       case "shipped":
//         return <Truck className="text-purple-600" size={22} />;

//       case "delivered":
//         return <CheckCircle className="text-green-600" size={22} />;

//       case "cancelled":
//         return <XCircle className="text-red-600" size={22} />;

//       default:
//         return <Package className="text-gray-500" size={22} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-700";

//       case "confirmed":
//       case "processing":
//         return "bg-blue-100 text-blue-700";

//       case "shipped":
//         return "bg-purple-100 text-purple-700";

//       case "delivered":
//         return "bg-green-100 text-green-700";

//       case "cancelled":
//         return "bg-red-100 text-red-700";

//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const handleOpenReview = (item) => {
//   setSelectedItem(item);
//   setShowReviewModal(true);
// };

// const handleCloseReview = () => {
//   setSelectedItem(null);
//   setShowReviewModal(false);
// };

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
//         <div className="flex flex-col items-center gap-5">
//           <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"></div>

//           <p className="text-lg font-medium text-gray-700">
//             Loading Order...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 flex items-center justify-center px-4">

//         <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-center max-w-md w-full">

//           <Package
//             size={70}
//             className="mx-auto mb-6 text-red-600 bg-red-100 rounded-full p-4"
//           />

//           <h2 className="text-2xl font-bold text-gray-900">
//             Order Not Found
//           </h2>

//           <p className="text-gray-600 mt-3">
//             {error || "The order you're looking for doesn't exist."}
//           </p>

//           <Link
//             to="/orders"
//             className="inline-flex mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
//           >
//             Back to Orders
//           </Link>

//         </div>

//       </div>
//     );
//   }

//   const subtotal = parseFloat(order.subtotal) || 0;
//   const shipping = parseFloat(order.shipping_cost) || 0;
//   const tax = parseFloat(order.tax_amount) || 0;
//   const discount = parseFloat(order.discount_amount) || 0;
//   const total = parseFloat(order.total_amount) || 0;

//   return (
//     <section className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">

//       <div className="max-w-5xl mx-auto">

//         <Link
//           to="/orders"
//           className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition mb-8"
//         >
//           <ArrowLeft size={18} />
//           Back to Orders
//         </Link>

//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

//           <div>

//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               Order #{order.id}
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Placed on{" "}
//               {new Date(order.order_date).toLocaleDateString("en-IN", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </p>

//           </div>

//           <div
//             className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getStatusColor(
//               order.order_status
//             )}`}
//           >
//             {getStatusIcon(order.order_status)}
//             {order.order_status || "Pending"}
//           </div>

//         </div>

//         {/* Summary Cards */}

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

//           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

//             <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
//               <Package size={18} />
//               Order Status
//             </div>

//             <div className="flex items-center gap-2 font-semibold text-gray-900">
//               {getStatusIcon(order.order_status)}
//               {order.order_status}
//             </div>

//           </div>

//           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

//             <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
//               <CreditCard size={18} />
//               Payment
//             </div>

//             <p className="font-semibold text-gray-900">
//               {order.payment_method || "N/A"}
//             </p>

//             <p className="text-sm text-gray-500 mt-1">
//               {order.payment_status || "Pending"}
//             </p>

//           </div>

//           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

//             <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
//               <Truck size={18} />
//               Total
//             </div>

//             <p className="text-3xl font-bold text-red-600">
//               ₹{total.toFixed(2)}
//             </p>

//           </div>

//         </div>
//                 {/* Order Items */}

//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">

//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             Order Items
//           </h2>

//           <div className="space-y-5">

//             {order.items?.map((item) => {
//               let productName = item.product_name || "Product";
//               let sku = item.sku || "";
//               let unitPrice = parseFloat(item.unit_price) || 0;

//               if (item.product_data_snapshot) {
//                 try {
//                   const snapshot =
//                     typeof item.product_data_snapshot === "string"
//                       ? JSON.parse(item.product_data_snapshot)
//                       : item.product_data_snapshot;

//                   productName = snapshot.product_name || productName;
//                   sku = snapshot.sku || sku;
//                 } catch (e) {}
//               }

//               return (
//                 <div
//                   key={item.id}
//                   className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-b border-gray-200 last:border-0 pb-5 last:pb-0"
//                 >

//                   <div>

//                     <h3 className="font-semibold text-lg text-gray-900">
//                       {productName}
//                     </h3>

//                     {sku && (
//                       <p className="text-sm text-gray-500 mt-1">
//                         SKU : {sku}
//                       </p>
//                     )}

//                     <p className="text-sm text-gray-500 mt-1">
//                       Quantity : {item.quantity}
//                     </p>

//                   </div>

//                   <div className="text-left sm:text-right">

//                     <p className="text-xl font-bold text-red-600">
//                       ₹{(unitPrice * item.quantity).toFixed(2)}
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       ₹{unitPrice.toFixed(2)} each
//                     </p>

//                     {/* {
//                       order.order_status?.toLowerCase() === "delivered" && (
//                         <button
//                           onClick={() => handleOpenReview(item)}
//                           className="mt-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
//                         >
//                           Write a Review
//                         </button>
//                       )
//                     } */}

//                       {order.order_status?.toLowerCase() === "delivered" && (
//                            <button
//                              onClick={() => handleOpenReview(item)}
//                              className="mt-3 w-full sm:w-auto rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
//                              >
//                               Write Review
//                             </button>
//                           )}

//                   </div>

//                 </div>
//               );
//             })}

//           </div>

//           {/* Price Summary */}

//           <div className="mt-8 border-t border-gray-200 pt-6 space-y-3">

//             <div className="flex justify-between text-gray-600">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>

//             {shipping > 0 && (
//               <div className="flex justify-between text-gray-600">
//                 <span>Shipping</span>
//                 <span>₹{shipping.toFixed(2)}</span>
//               </div>
//             )}

//             {tax > 0 && (
//               <div className="flex justify-between text-gray-600">
//                 <span>Tax</span>
//                 <span>₹{tax.toFixed(2)}</span>
//               </div>
//             )}

//             {discount > 0 && (
//               <div className="flex justify-between text-green-600">
//                 <span>Discount</span>
//                 <span>-₹{discount.toFixed(2)}</span>
//               </div>
//             )}

//             <div className="flex justify-between pt-4 border-t border-gray-200">

//               <span className="text-xl font-bold text-gray-900">
//                 Total
//               </span>

//               <span className="text-2xl font-bold text-red-600">
//                 ₹{total.toFixed(2)}
//               </span>

//             </div>

//           </div>

//         </div>

//         {/* Shipping Address */}

//         {order.shipping_address && (
//           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">

//             <div className="flex items-center gap-3 mb-5">

//               <MapPin className="text-red-600" size={22} />

//               <h2 className="text-2xl font-bold text-gray-900">
//                 Shipping Address
//               </h2>

//             </div>

//             <div className="space-y-2 text-gray-700 leading-7">

//               <p className="font-semibold">
//                 {order.shipping_address.full_name}
//               </p>

//               <p>{order.shipping_address.line1}</p>

//               {order.shipping_address.line2 && (
//                 <p>{order.shipping_address.line2}</p>
//               )}

//               <p>
//                 {order.shipping_address.city},{" "}
//                 {order.shipping_address.state}{" "}
//                 {order.shipping_address.postal_code}
//               </p>

//               <p>{order.shipping_address.country}</p>

//               <p>
//                 Phone : {order.shipping_address.phone}
//               </p>

//             </div>

//           </div>
//         )}

//         {/* Customer Notes */}

//         {order.customer_notes && (
//           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

//             <h2 className="text-xl font-bold text-gray-900 mb-3">
//               Customer Notes
//             </h2>

//             <p className="text-gray-600 leading-7">
//               {order.customer_notes}
//             </p>

//           </div>
//         )}

//       </div>

//           <ReviewModal
//           open={showReviewModal}
//           onClose={handleCloseReview}
//           orderItem={selectedItem}
//           productId={selectedItem?.product_id}
//           // onSuccess={handleReviewSuccess}
//           />
//     </section>
//   );
// }














import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  CreditCard,
} from "lucide-react";

import { useOrderDetails } from "../hooks/useOrderDetails";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import ReviewModal from "../components/reviews/ReviewModal";
import { useReviews } from "../hooks/useReviews";

// ----- New component to handle the review button per item -----
function OrderItemReviewButton({ item, orderStatus, onOpenReview }) {
  // Fetch reviews for this product
  const { reviews, loading } = useReviews(item.product_id);
  
  // Check if a review already exists for this order item
  const existingReview = reviews?.find((r) => r.order_item_id === item.id);

  // Only show for delivered orders
  if (orderStatus?.toLowerCase() !== "delivered") return null;

  const handleClick = () => {
    // Pass the item (and optionally the existing review) to the parent
    onOpenReview(item);
  };

  // Show a simple loading state (optional)
  if (loading) {
    return (
      <button
        disabled
        className="mt-3 w-full sm:w-auto rounded-lg bg-gray-400 px-4 py-2 text-sm font-medium text-white"
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="mt-3 w-full sm:w-auto rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
    >
      {existingReview ? "Edit Review" : "Write Review"}
    </button>
  );
}
// -------------------------------------------------------------

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { order, loading, error } = useOrderDetails(id);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="text-yellow-600" size={22} />;
      case "confirmed":
      case "processing":
        return <Truck className="text-blue-600" size={22} />;
      case "shipped":
        return <Truck className="text-purple-600" size={22} />;
      case "delivered":
        return <CheckCircle className="text-green-600" size={22} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={22} />;
      default:
        return <Package className="text-gray-500" size={22} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleOpenReview = (item) => {
    setSelectedItem(item);
    setShowReviewModal(true);
  };

  const handleCloseReview = () => {
    setSelectedItem(null);
    setShowReviewModal(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-5">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"></div>
          <p className="text-lg font-medium text-gray-700">Loading Order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-center max-w-md w-full">
          <Package size={70} className="mx-auto mb-6 text-red-600 bg-red-100 rounded-full p-4" />
          <h2 className="text-2xl font-bold text-gray-900">Order Not Found</h2>
          <p className="text-gray-600 mt-3">
            {error || "The order you're looking for doesn't exist."}
          </p>
          <Link
            to="/orders"
            className="inline-flex mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = parseFloat(order.subtotal) || 0;
  const shipping = parseFloat(order.shipping_cost) || 0;
  const tax = parseFloat(order.tax_amount) || 0;
  const discount = parseFloat(order.discount_amount) || 0;
  const total = parseFloat(order.total_amount) || 0;

  return (
    <section className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Order #{order.id}
            </h1>
            <p className="text-gray-500 mt-2">
              Placed on{" "}
              {new Date(order.order_date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getStatusColor(
              order.order_status
            )}`}
          >
            {getStatusIcon(order.order_status)}
            {order.order_status || "Pending"}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
              <Package size={18} />
              Order Status
            </div>
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              {getStatusIcon(order.order_status)}
              {order.order_status}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
              <CreditCard size={18} />
              Payment
            </div>
            <p className="font-semibold text-gray-900">
              {order.payment_method || "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {order.payment_status || "Pending"}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
              <Truck size={18} />
              Total
            </div>
            <p className="text-3xl font-bold text-red-600">
              ₹{total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>
          <div className="space-y-5">
            {order.items?.map((item) => {
              let productName = item.product_name || "Product";
              let sku = item.sku || "";
              let unitPrice = parseFloat(item.unit_price) || 0;

            

              if (item.product_data_snapshot) {
                try {
                  const snapshot =
                    typeof item.product_data_snapshot === "string"
                      ? JSON.parse(item.product_data_snapshot)
                      : item.product_data_snapshot;
                  productName = snapshot.product_name || productName;
                  sku = snapshot.sku || sku;
                } catch (e) {}
              }

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-b border-gray-200 last:border-0 pb-5 last:pb-0"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {productName}
                    </h3>
                    {sku && <p className="text-sm text-gray-500 mt-1">SKU : {sku}</p>}
                    <p className="text-sm text-gray-500 mt-1">Quantity : {item.quantity}</p>
                    <p className="text-sm text-gray-500 mt-1">Tax : {item.tax_amount}</p>
                  
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xl font-bold text-red-600">
                      ₹{(unitPrice * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">₹{unitPrice.toFixed(2)} each</p>



                    

                    {/* --- Use the new component here --- */}
                    <OrderItemReviewButton
                      item={item}
                      orderStatus={order.order_status}
                      onOpenReview={handleOpenReview}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price Summary */}
          <div className="mt-8 border-t border-gray-200 pt-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {shipping > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
            )}
            {tax > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-red-600">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Shipments */}
{order.shipments?.length > 0 && (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">
      Shipments
    </h2>

    <div className="flex gap-5 overflow-x-auto pb-2">
      {order.shipments.map((shipment) => (
        <div
          key={shipment.id}
          className="min-w-[340px] flex-shrink-0 rounded-xl border border-gray-200 p-5 bg-gray-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">
              Shipment #{shipment.id}
            </h3>

            <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-medium capitalize">
              {shipment.current_status}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            {/* <div>
              <p className="text-gray-500">Carrier</p>
              <p className="font-medium">
                {shipment.carrier || "Not Assigned"}
              </p>
            </div> */}

            <div>
              <p className="text-gray-500">Delivery Address</p>
              <p>{shipment.recipient_address}</p>
            </div>

            {/* <div>
              <p className="text-gray-500">Created</p>
              <p>
                {new Date(shipment.created_at).toLocaleDateString("en-IN")}
              </p>
            </div> */}
          </div>

          {/* Tracking Timeline */}
          {shipment.tracking_history?.length > 0 && (
            <div className="mt-5 border-t pt-4">
              <p className="font-semibold mb-3">
                Tracking History
              </p>

              <div className="space-y-3">
                {shipment.tracking_history.flatMap((history) => {
                  try {
                    return JSON.parse(history);
                  } catch {
                    return [];
                  }
                }).map((track, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-red-600" />

                    <div>
                      <p className="font-medium">
                        {track.event}
                      </p>
                      <p className="text-xs text-gray-500">
                        {track.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}

        {/* Shipping Address */}
        {order.shipping_address && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-5">
              <MapPin className="text-red-600" size={22} />
              <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
            </div>
            <div className="space-y-2 text-gray-700 leading-7">
              <p className="font-semibold">{order.shipping_address.full_name}</p>
              <p>{order.shipping_address.line1}</p>
              {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
              <p>
                {order.shipping_address.city}, {order.shipping_address.state}{" "}
                {order.shipping_address.postal_code}
              </p>
              <p>{order.shipping_address.country}</p>
              <p>Phone : {order.shipping_address.phone}</p>
            </div>
          </div>
        )}

        {/* Customer Notes */}
        {order.customer_notes && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Customer Notes</h2>
            <p className="text-gray-600 leading-7">{order.customer_notes}</p>
          </div>
        )}
      </div>

      <ReviewModal
        open={showReviewModal}
        onClose={handleCloseReview}
        orderItem={selectedItem}
        productId={selectedItem?.product_id}
        // onSuccess can be added if you need to manually refresh the button
      />
    </section>
  );
}